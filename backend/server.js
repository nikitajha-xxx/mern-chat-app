if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

var express       = require('express')
    app           = express()
    cors          = require('cors')
    mongoose      = require('mongoose')
    userRoutes    = require('./routes/userRoutes')
    chatRoutes    = require('./routes/chatRoutes')
    messageRoutes = require('./routes/messageRoutes')
    path          = require('path')

const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT
const chats = require('./data/data')
const connectDB = require('./config/db')

connectDB();

app.use(express.json({limit: '20mb'})); //for parsing incoming requests with JSON Payload

//Middleware for handling cors policy
app.use(cors()) //Allows all origins with default of cors(*)



//ALL USER ROUTERS
app.use('/api/user', userRoutes)

//ALL CHAT ROUTES
app.use('/api/chat', chatRoutes)

//MESSAGE ROUTES
app.use('/api/message', messageRoutes)

//deployment
const __dirname1 = path.resolve()
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname1,"/frontend/dist")))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","dist", "index.html"))
    })
}else{
    app.get('/',(req,res)=>{
        res.state(200).send("Working")
    })
}
//deployment

app.use(notFound) //middleware to handle route not found
app.use(errorHandler) //middleware to handle to throw any kind of error for the requested url

//app.listen opens up a port
var listener = app.listen(PORT, function(){
    //callback function
    console.log("Listening On Port " + listener.address().port)
})

const io = require('socket.io')(listener,{
    pingTimeout:60000, //amount of time socket will wait while being inactive
    cors:{
        origin: "http://localhost:5173",
    }
})

io.on("connection",(socket)=>{
    console.log("connected to socket.io")

    socket.on("setup", (userData)=>{ //creates a seperate socket room for the current user
        socket.join(userData._id)
        console.log(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat", (room)=>{ //this socket will create seperate rooms for the current user and the selected chat
        socket.join(room); 
        console.log("User Joined Room: " + room)
    })

    socket.on("typing",(room)=>socket.in(room).emit("typing"))
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))

    //the below socket will be called from frontend when a new message is created
    //this socket will in turn send the message to all users other than the sender of the chat
    //who are a part of the chat, this will be received by a socket in the frontend 'message recieved'
    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
})