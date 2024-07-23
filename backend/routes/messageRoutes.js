var express = require('express')
var {protect} = require('../middleware/authMiddleware')
var {sendMessage,allMessages} = require('../controllers/messageControllers')
var router = express.Router()

//send message
router.route('/').post(protect, sendMessage)

//fetch all message for a chat
router.route('/:chatId').get(protect, allMessages)

module.exports = router