import React, {useEffect, useState} from 'react'
import axios from 'axios'

const ChatPage = () => {
    const [chats, setChats] = useState([])

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const res = await axios.get('http://localhost:5555/api/chat')
                console.log(res)
                setChats(res.data.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    },[])

    return (
        <div>
            {chats.map(chat=>(
                <div key={chat._id}>{chat.chatName}</div>
            ))}
        </div>
    )
}

export default ChatPage
