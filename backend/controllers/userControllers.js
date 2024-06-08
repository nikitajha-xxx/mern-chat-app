var asyncHandler = require("express-async-handler") //handler error for async functions
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')

//sign up user
const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password,pic} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please Enter all Fields")
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password,
        picture:pic
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.picture,
            token:generateToken(user._id) //generate a JWT Token and send it to the front
        })
    }else{
        res.status(400);
        throw new Error("Failed to create User")
    }
})

//login
const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            picture:user.picture,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})

//get all users
///api/user?search=nikita
const allUsers = asyncHandler(async(req,res)=>{
    const keyword = req.query.search ? {
        $or: [ // The $or operator performs a logical OR operation on an array of one or more <expressions> and selects the documents that satisfy at least one of the <expressions>.
            {name:{$regex:req.query.search, $options:"i"}}, // $regex Provides regular expression capabilities for pattern matching strings in queries
            {email:{$regex:req.query.search, $options:"i"}} //here the option i means case insensitive
        ]
    } : {}
    console.log(keyword)
    const users = await User.find(keyword).find({_id:{$ne:req.user._id}}) //search the users without including the current user
    res.send(users)
})

module.exports = {registerUser, authUser, allUsers}