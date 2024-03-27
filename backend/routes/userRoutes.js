var express = require('express')
var router = express.Router()
var {registerUser,authUser,allUsers}  = require('../controllers/userControllers')
const {protect} = require('../middleware/authMiddleware') //protect is a middleware that will basically verify the user with JWT token sent from the frontend for any api call coming to the backend


//sign up user
router.route('/').post(registerUser).get(protect,allUsers) //can chain multiple type of requests. //any backend call that comes to allUsers will first have to pass the protect middleware

//login user
router.post('/login', authUser)

module.exports = router