import React,{useEffect, useState} from 'react'
import { ChatState } from '../Context/ChatProvider'
import {Box, Text, Center,ScaleFade,Tooltip, HStack,Spinner, FormControl,Input,useToast} from '@chakra-ui/react'
import ChatInLogo from '../assets/ChatInLogo.jpg'
import { getSender,getSenderUser } from '../config/ChatLogics'
import { ArrowLeftIcon,ViewIcon } from '@chakra-ui/icons'
import UpdateGroupChatModel from './miscellaneous/UpdateGroupChatModel'
import ProfileModal from './miscellaneous/ProfileModal'
import ScrollableChat from './ScrollableChat'
import axios from 'axios'



const SingleChat = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()
    const {fetchAgain, setFetchAgain,user,selectedChat,setSelectedChat} = ChatState()

    const toast = useToast();
    
    const fetchMessages = async()=>{
        if(!selectedChat) return
        try{
            setLoading(true)
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${user.token}`,
                }
            }
            const {data} = await axios.get(`http://localhost:5555/api/message/${selectedChat._id}`, config)
            setMessages(data)
            setLoading(false)
        }catch(error){
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }

    useEffect(()=>{
        fetchMessages();
    }, [selectedChat])

    const typingHandler = (e)=>{
        setNewMessage(e.target.value)
    }

    const sendMessage = async(e) => {
        if(e.key == "Enter" && newMessage){
            try{
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${user.token}`,
                    }
                }
                const {data} = await axios.post(`http://localhost:5555/api/message`,{
                    content:newMessage,
                    chatId:selectedChat._id
                },config)
                setNewMessage('')
                setMessages([...messages, data])
            }catch(error){
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                  });
            }
        }
    }

    
    return (
        <>
            {selectedChat ?
                
                    <ScaleFade initialScale={0.9} in={true}>
                    
                        <Box m={"-3px 0px 0px 0px"} >
                            <Box bg='white'  borderTopLeftRadius="25" borderTopRightRadius="25" pb={{base:selectedChat?"3%" : "", sm:selectedChat?"3%":"",md:"0%"}}>
                                
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
                                                        <UpdateGroupChatModel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}>
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
                            <Box
                                style={{display:"flex"}}
                                flexDir="column"
                                justifyContent="flex-end"
                                p={3}
                                w="100%"
                                height={{base:"88vh",sm:"87vh",md:"85vh"}}
                                overflowY="hidden"
                                borderBottomRightRadius = {"25"}
                                borderBottomLeftRadius = {"25"}
                            >
                                {
                                    loading ? 
                                        <Spinner color='#7b1fa2' size={"xl"} w={20} h={20} alignSelf={"center"} margin={"auto"}/>
                                    :
                                        <Box style={{display:"flex",flexDirection:"column"}} overflowY="scroll"
                                        sx={{
                                            '&::-webkit-scrollbar': {
                                            width: '16px',
                                            borderRadius: '30px 30px 25px 30px',
                                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                            borderRadius: '30px 30px 35px 30px',
                                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                            },
                                        }}>
                                            <ScrollableChat messages={messages} />
                                        </Box>
                                }
                                <FormControl onKeyDown={sendMessage} isRequired>
                                    <Input focusBorderColor="#8e24aa" borderRadius={"25"} bg="#E0E0E0" variant="filled" placeholder='Enter a message..' onChange={typingHandler} value={newMessage}/>   
                                </FormControl>
                            </Box>
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
