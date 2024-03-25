var express = require('express')
var router = express.Router()
var User = require('../models/userModel')
var {registerUser,authUser}  = require('../controllers/userControllers')

//sign up user
router.route('/').post(registerUser) //can chain multiple type of requests

//login user
router.post('/login', authUser)

module.exports = router