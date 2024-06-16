import React, { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [tabOption, setTabOption] = useState() //0:New Chat, 1:Chats, 2: Notifications
    const [fetchAgain, setFetchAgain] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        setTabOption(1) //be default show all chats
        if (!userInfo) navigate("/");
    }, [navigate]);

    return (
        <ChatContext.Provider
           value={{user,setUser,selectedChat,setSelectedChat,chats,setChats,tabOption,setTabOption, fetchAgain, setFetchAgain}}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;