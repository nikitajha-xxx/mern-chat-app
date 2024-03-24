if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

var express = require('express')
    app     = express()

const PORT = process.env.PORT
const chats = require('./data/data')
app.get('/',(req,res)=>{
    res.send("Working")
})

app.get('/api/chat',(req,res)=>{
    res.send(chats)
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