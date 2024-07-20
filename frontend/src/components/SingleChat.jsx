import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import {Box, Text, Center,ScaleFade,Tooltip, HStack} from '@chakra-ui/react'
import ChatInLogo from '../assets/ChatInLogo.jpg'
import { getSender,getSenderUser } from '../config/ChatLogics'
import { ArrowLeftIcon,ViewIcon } from '@chakra-ui/icons'
import UpdateGroupChatModel from './miscellaneous/UpdateGroupChatModel'
import ProfileModal from './miscellaneous/ProfileModal'


const SingleChat = () => {
    const {fetchAgain, setFetchAgain,user,selectedChat,setSelectedChat} = ChatState()

    return (
        <>
            {selectedChat ?
                
                    <ScaleFade initialScale={0.9} in={true}>
                        <Box bg='#E1BEE7'  borderTopLeftRadius="25" borderTopRightRadius="25" pb={{base:selectedChat?"3%" : "", sm:selectedChat?"3%":"",md:"0%"}}>
                            
                        <HStack spacing={"6px"}>
                            {/* <Box mt={{base:selectedChat ? "6%" : "0%" , sm: selectedChat ? "6%" : "0%", md:"0%"}}  ml={{base:selectedChat ? "3%" : "0%" , sm: selectedChat ? "3%" : "0%", md:"0%"}} display={{base: selectedChat ? "block" : "none",sm: selectedChat ? "block" : "none", md:"none"}}> */}
                            <Box  ml={{base:selectedChat ? "6%" : "",sm:selectedChat ? "4%" : "", md:""}} mt={{base:selectedChat?"1%":"",sm:selectedChat? "2%" : "",md:""}} display={{base: selectedChat ? "block" : "none",sm: selectedChat ? "block" : "none", md:"none"}}>
                                
                                <Box cursor="pointer">
                                    
                                        <ArrowLeftIcon color="#8e24aa" cursor="pointer" style={{fontSize:"13px"}} onClick={()=>setSelectedChat(null)}/>
                                
                                </Box>
                                
                            </Box>
                            {/* <Box ml={{base:selectedChat ? "-7%" : "" , sm: selectedChat ? "-4%" : "", md:"1%"}} mt={{base:selectedChat ? "-2%" : "", sm: selectedChat ? "0%" : "", md:"0%"}}> */}
                            <Box w={"93%"}  mt={{base:selectedChat ? "-5%" : "", sm: selectedChat ? "-3%" : "", md:"2%"}} ml={{base:selectedChat ? "-4%" : "" , sm: selectedChat ? "-3%" : "", md:"0%"}}>
                                {/* <Text fontSize={{base:selectedChat ? "lg" : "" , sm: selectedChat ? "lg" : "", md:"3xl"}} mt={{md:"-4%"}} fontFamily="Work sans" color={"#7b1fa2"} pt={6} px={6} style={{fontWeight:"500"}}> */}
                                <Text fontSize={{base:selectedChat ? "lg" : "" , sm: selectedChat ? "lg" : "", md:"3xl"}} mt={{md:"-4%"}} fontFamily="Work sans" color={"#7b1fa2"} pt={6} px={6} style={{fontWeight:"500"}}>
                                    {selectedChat.isGroupChat ? selectedChat.chatName : getSender(user, selectedChat.users)}
                                </Text>
                            </Box>
                            <Box w={"8%"} ml={{base:selectedChat?"-16%":"",sm:(selectedChat ? "-10%" : ""),md:"-2%"}} mt={{base:selectedChat?"1%" : "",sm:"",md:"0%"}}>
                                    <Box  cursor="pointer">
                                        {
                                            selectedChat.isGroupChat ?
                                                <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}>
                                                    <ViewIcon color="#7b1fa2" mt={"15%"} ml={"-10%"} fontSize={{base:selectedChat? "21px" : "",sm:selectedChat ? "21px" : "",md:"25px"}} cursor="pointer" />
                                                </UpdateGroupChatModel>
                                            :
                                                <ProfileModal user={getSenderUser(user, selectedChat.users)} >
                                                    <ViewIcon color="#7b1fa2" mt={"15%"} ml={"-10%"} fontSize={{base:selectedChat? "21px" : "",sm:selectedChat ? "21px" : "",md:"25px"}} cursor="pointer" />
                                                </ProfileModal>
                                        }
                                        
                                    </Box>
                            </Box>
                        </HStack>
                        </Box>
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
