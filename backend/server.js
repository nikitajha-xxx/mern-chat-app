if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

var express = require('express')
    app     = express()
    cors    = require('cors')

const PORT = process.env.PORT
const chats = require('./data/data')

app.use(express.json({limit: '20mb'})); //for parsing incoming requests with JSON Payload

//Middleware for handling cors policy
app.use(cors()) //Allows all origins with default of cors(*)

app.get('/',(req,res)=>{
    res.state(200).send("Working")
})

app.get('/api/chat',(req,res)=>{
    res.status(200).json({data: chats});
})

app.get('/api/chat/:id',(req,res)=>{
    console.log(req.params.id)
    const singleChat = chats.find((chat)=> chat._id === req.params.id)
    res.send(singleChat)
})

//app.listen opens up a port
var listener = app.listen(PORT, function(){
    //callback function
    console.log("Listening On Port " + listener.address().port)
})