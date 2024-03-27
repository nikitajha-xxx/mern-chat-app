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

module.exports = {accessChat}