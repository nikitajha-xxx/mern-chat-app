import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import {Box, Text, Center,ScaleFade,Tooltip, HStack} from '@chakra-ui/react'
import ChatInLogo from '../assets/ChatInLogo.jpg'
import { getSender } from '../config/ChatLogics'
import { ArrowLeftIcon } from '@chakra-ui/icons'

const SingleChat = () => {
    const {fetchAgain, setFetchAgain,user,selectedChat,setSelectedChat} = ChatState()

    return (
        <>
            {selectedChat ?
                
                    <ScaleFade initialScale={0.9} in={true}>
                        <HStack spacing={"6px"}>
                            <Box mt={{base:selectedChat ? "6%" : "0%" , sm: selectedChat ? "6%" : "0%", md:"0%"}}  ml={{base:selectedChat ? "3%" : "0%" , sm: selectedChat ? "3%" : "0%", md:"0%"}} display={{base: selectedChat ? "block" : "none",sm: selectedChat ? "block" : "none", md:"none"}}>
                                <Box bg="#E1BEE7" color="#8e24aa" className='circle' >
                                    <Tooltip hasArrow label='Go Back' bg='white' color="#7b1fa2">
                                        <ArrowLeftIcon cursor="pointer" style={{marginLeft:"30%", marginTop:"15%"}}/>
                                    </Tooltip>
                                </Box>
                            </Box>
                            <Box ml={{base:selectedChat ? "-8%" : "" , sm: selectedChat ? "-4%" : "", md:"1%"}} mt={{base:selectedChat ? "-4%" : "", sm: selectedChat ? "-1%" : "", md:"0%"}}>
                                <Text fontSize={{base:selectedChat ? "lg" : "" , sm: selectedChat ? "lg" : "", md:"3xl"}} fontFamily="Work sans" color={"#7b1fa2"} pt={6} px={6} style={{fontWeight:"500"}}>
                                    {selectedChat.isGroupChat ? selectedChat.chatName : getSender(user, selectedChat.users)}
                                </Text>
                            </Box>
                        </HStack>
                    </ScaleFade>
                
                :
                    <Box
                        m={"100px 0px 0px 0px"}
                    >
                        <ScaleFade initialScale={0.9} in={true}>
                            <Center>
                                <Text fontSize="9xl" fontFamily="Work sans" color={"#7b1fa2"}>
                                    ChatIn.

                                </Text>
                            </Center>
                            <Center mt={0}>
                                <Text fontSize={{base:"0",md:"2xl"}} style={{fontWeight:"500"}} color={"gray"}  fontFamily="PT Sans">
                                    Connect With People.
                                </Text>
                            </Center>
                            <Center>
                                <Text fontSize="lg" style={{fontWeight:"500"}} color={"gray"}  fontFamily="PT Sans">
                                    Click On Any Chat.
                                </Text>
                            </Center>
                        </ScaleFade>
                    </Box>
            }
        </>
    )
}

export default SingleChat
