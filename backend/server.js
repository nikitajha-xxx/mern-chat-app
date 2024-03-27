if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

var express     = require('express')
    app         = express()
    cors        = require('cors')
    mongoose    = require('mongoose')
    userRoutes  = require('./routes/userRoutes')
    chatRoutes  = require('./routes/chatRoutes')

const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT
const chats = require('./data/data')
const connectDB = require('./config/db')

connectDB();

app.use(express.json({limit: '20mb'})); //for parsing incoming requests with JSON Payload

//Middleware for handling cors policy
app.use(cors()) //Allows all origins with default of cors(*)

app.get('/',(req,res)=>{
    res.state(200).send("Working")
})

//ALL USER ROUTERS
app.use('/api/user', userRoutes)

//ALL CHAT ROUTES
app.use('/api/chat', chatRoutes)

app.use(notFound) //middleware to handle route not found
app.use(errorHandler) //middleware to handle to throw any kind of error for the requested url

//app.listen opens up a port
var listener = app.listen(PORT, function(){
    //callback function
    console.log("Listening On Port " + listener.address().port)
})