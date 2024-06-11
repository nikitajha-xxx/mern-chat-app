const asyncHandler = require("express-async-handler")

var Chat = require('../models/chatModel')
var User = require('../models/userModel')


//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async(req,res)=>{
    const {userId} = req.body //USER WITH WHOM THE CURRENT LOGGED IN USER IS CHATTING
    if(!userId){
        console.log("UserId params not sent with request");
        return res.sendStatus(400);
    }

    //Below query finds the one to one chats between the two users
    var isChat = await Chat.find({
        isGroupChat:false,
        $and: [ //$and performs a logical AND operation on an array of one or more expressions (<expression1>, <expression2>, and so on) and selects the documents that satisfy all the expressions.
            {users:{$elemMatch: {$eq: req.user._id}}},   //The $elemMatch operator matches documents that contain an array field with at least one element that matches all the specified query criteria.
            {users:{$elemMatch: {$eq: userId}}}
        ]
    }).populate("users", "-password") // Population is the process of replacing the specified path in the document of one collection with the actual document from the other collection, Here users is reference to the User model
    .populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender", //The path to the field that contains the foreign key reference.
        select:"name pic email" //A space-separated list of fields to select from the populated documents.
    })

    if(isChat.length > 0){
        res.send(isChat[0])
    }else{
        //if chat doesn't exist between these two users then we create
        var chatData = {
            chatName: "sender",
            isGroupChat:false,
            users:[req.user._id, userId]
        }
        try{
            const createdChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({_id:createdChat._id}).populate("users", "-password")
            res.status(200).send(FullChat);
        }catch(err){    
            res.status(400)
            throw new Error(err.message)
        }
    }

})

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async(req,res)=>{
    try{
        if(req.query.search) {
            let chats = Chat.aggregate([
                { "$match" : {"users":{"$elemMatch": {"$eq": req.user._id}}}},
                {
                     "$lookup":{
                         "from":"users",
                         "localField":"users",
                         "foreignField":"_id",
                         "pipeline":[
                            {
                                 "$match":
                 { "$expr":
                    { "$and":
                       [
                          { "$regexMatch": {
        "input": "$name",
        "regex": req.query.search, 
        "options": "i",
      }
    }
                       ]
                    }
                 }
                },
               
                           
                        
                         ],
                         "as":"user_details"
                     }
                 },
                 {
                    
                        "$match":
        { "$expr":
           { "$and":
              [
                {
                    "$in":[req.user._id, "$users"]
                },
                 {
                    "$gt":[{ "$size": "$user_details" }, 0 ]
                 }
              ]
           }
        }
       
                 },
                 {
                    
                     $unset: "user_details" 
                 }
                
            ])

            
            
            // db.chats.aggregate([
            //     {"$match" : {"users":{"$elemMatch":{"$eq":user._id}}}},
            //     {"$unwind":"$users"},
            //     {
            //         "$lookup":{
            //             "from":"users",
            //             "localField":"users",
            //             "foreignField":"_id",
            //             "as":"user"
            //         }
            //     },
            //     {
            //         "$match" : { "user.name": { "$regex":"pam", "$options": "i" } },
            //     },{
            //         "$project" : {"user_id":user._id}
            //     }
                
            // ])
            //Explore project and addFields
        }else{
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({updatedAt:-1}) //sort the output from new to old
            .then(async(results)=>{
                results = await  User.populate(results,{
                    path:"latestMessage.sender", 
                    select:"name pic email"
                })
                res.status(200).send(results);
            })
        }
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
const createGroupChat = asyncHandler(async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"Please fill in all the fields"})
    }
    var users = JSON.parse(req.body.users)

    if(users.length < 2){
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat")
    }

    users.push(req.user)

    try{
        const groupChat = await Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user
        })
        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
        
        return res.status(200).json(fullGroupChat)
    }catch(err){
        res.status(400)
        throw new Error(err.message)

    }
})

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async(req,res)=>{
    const {chatId, chatName} = req.body
    
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName:chatName
        },{
            new:true //this will return the updated value of the chat name
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")

    if(!updatedChat){
        res.status(404);
        throw new Error("Chat Not Found")
    }else{
        res.json(updatedChat)
    }
})

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async(req,res)=>{
    const {chatId, userId} = req.body
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: {users:userId} //The $push operator appends a specified value to an array.
        },
        {new:true}
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password")

    if(!added){
        res.status(400)
        throw new Error("Chat Not Found")
    }else{
        res.json(added)
    }
})

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protecte
const removeFromGroup = asyncHandler(async(req,res)=>{
    const {chatId, userId} = req.body
    
    var chat = await Chat.findById({_id:chatId})

    //check if the requester is the admin
    if(!req.user._id.equals(chat.groupAdmin)){
        return res.status(400).send("Only Group Admin Can Remove a User.")
    }

    const removed = await Chat.updateOne(
        {_id:chat._id},
        {
            $pull: {users:userId} //The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
        }
    )
    // const removed = await Chat.findByIdAndUpdate(
    //     chatId,
    //     {
    //       $pull: { users: userId },
    //     },
    //     {
    //       new: true,
    //     }
    //   )
    //     .populate("users", "-password")
    //     .populate("groupAdmin", "-password");

    console.log("what is removed", removed)
    if(!removed){
        res.status(400)
        throw new Error("Chat Not Found")
    }else{
        res.json(removed)
    }
})

module.exports = {accessChat, fetchChats,createGroupChat,renameGroup, addToGroup, removeFromGroup}