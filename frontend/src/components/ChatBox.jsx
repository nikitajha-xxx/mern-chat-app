import React from 'react'
import {Box} from "@chakra-ui/react"
import { ChatState } from '../Context/ChatProvider'
import SingleChat from './SingleChat'
const ChatBox = () => {
    const {selectedChat,tabOption} = ChatState()

    return (
        <Box bg="white"  w={{base: selectedChat && tabOption==1 ? "70%" : "0%",sm: selectedChat && tabOption==1 ? "60%" : "0%", md:"60%" }} display={{base: selectedChat ? "block" : "none",sm: selectedChat ? "block" : "none", md:"block"}}  m="20px 0px 11px 20px"   borderWidth={"0"} color={'black'} borderRadius="25">
            <SingleChat />
        </Box>
    )
}

export default ChatBox
