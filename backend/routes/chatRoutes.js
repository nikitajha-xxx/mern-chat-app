var express = require('express')
var router = express.Router()
const {protect} = require('../middleware/authMiddleware')
var {accessChat, fetchChats,createGroupChat, renameGroup, addToGroup,removeFromGroup} = require('../controllers/chatControllers')

//ROUTE TO Create or fetch One to One Chat
router.route('/').post(protect,accessChat)


//ROUTE TO FETCH ALL CHATS FOR THE CURRENT LOGGED IN USER
router.route('/').get(protect,fetchChats) //can chain multiple type of requests. //any backend call that comes to fetchChats will first have to pass the protect middleware

//ROUTE FOR CREATION OF A GROUP
router.route('/group').post(protect,createGroupChat);

// ROUTE FOR RENAMING A GROUP
router.route('/rename').put(protect, renameGroup);

//ROUTE FOR REMOVING A USER FROM A GROUP OR LEAVING A GROUP
router.route('/groupremove').put(protect,removeFromGroup);

// ROUTE FOR ADDING A NEW USER IN A GROUP
router.route('/groupadd').put(protect,addToGroup);

module.exports = router
