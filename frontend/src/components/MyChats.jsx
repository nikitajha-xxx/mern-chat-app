import React, { useState,useCallback,useEffect } from 'react'
import {Box,useToast, VStack,Avatar,Text,Grid,GridItem } from "@chakra-ui/react"
import {Input, InputGroup, InputLeftElement} from '@chakra-ui/input'
import { AddIcon } from '@chakra-ui/icons'
import {debounce} from 'lodash';
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "../ChatLoading.jsx"
import ProfileModal from './miscellaneous/ProfileModal.jsx';
import axios from 'axios'
import { getSender,getSenderUser } from '../config/ChatLogics.jsx';

const MyChats = ({}) => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()
    const [selectedChat, setSelectedChat] = useState(false)
    const [loggedUser, setLoggedUser] = useState()

    const {user, chats, setChats} = ChatState()

    const toast = useToast();
    const timeout = 500

    const fetchChats = async ()=>{
        try {
            setLoadingChat(true)
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data} = await axios.get(`http://localhost:5555/api/chat`,config)
            setChats(data)
            setLoadingChat(false)
            console.log("chats", data)
        }catch{
            toast({
                title:"Error Occured",
                description:"Failed to Load the Chats",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"top"
            })
            setLoadingChat(false)
        }
    }

    const handleSearch = async (query) =>{
        // fetch search results from API or database
        console.log("handle search gets called",query)
        if(query){
            try{
                setLoading(true)
                const config = {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
                const {data} = await axios.get(`http://localhost:5555/api/user?search=${search}`,config)
                setLoading(false)
                setSearchResult(data)
            }catch(err){
                toast({
                    title:"Error Occured",
                    description:"Failed to Load the Search Results",
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"top"
                })
                setLoading(false)
            }
        }
    }

    const debouncedHandledSearch = useCallback(debounce(handleSearch, timeout),[])

    useEffect(()=>{
        console.log("use effect of mychats",loggedUser, chats)
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
        fetchChats()
    },[])

    return (
        <Box bg="white" w={{base: selectedChat ? "0%" : "70%",sm:"60%", md:"30%" }} style={{height:"95vh"}} m="20px 0px 11px 20px"   borderWidth={"0"} color={'black'} borderRadius="25">
        
    
            <InputGroup padding={5}>
                <InputLeftElement width={'4.5rem'} m={"22px 2px 2px 0px"}>
                    <i className='fas fa-search' style={{ cursor:"pointer", color:'#8e24aa'}}></i>
                </InputLeftElement>
                <Input 
                    focusBorderColor='purple'
                    placeholder='Search'
                    onChange={(e)=>debouncedHandledSearch(e.target.value)}
                    variant='flushed'
                />
                
            </InputGroup>
            {
                loadingChat ? (
                    <ChatLoading />
                )
                :
                (
                    <Box
                    overflowY="scroll"
                    sx={{
                        '&::-webkit-scrollbar': {
                          width: '16px',
                          borderRadius: '8px',
                          backgroundColor: `rgba(0, 0, 0, 0.05)`,
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: `rgba(0, 0, 0, 0.05)`,
                        },
                      }}
                    >
                    
                        {
                            loggedUser && chats ? (

                               
                                <VStack spacing={6} align="flex-start" style={{height:"80vh"}}>
                                    {
                                    chats.map((chat)=>(
                                    <Box
                                        onClick={()=>setSelectedChat(chat)}
                                        cursor={"pointer"}
                                        bg={selectedChat=== chat ? "#E1BEE7" : "white"}
                                        color={selectedChat === chat ? "#7b1fa2" : "black"}
                                        w={"90%"}
                                        m="20px 0px 11px 20px"
                                        borderRadius={"lg"}
                                        key={chat._id}
                                        h={"60px"}
                                        _hover={{ bg: "#E1BEE7",color:"#7b1fa2"}}
                                    >
                                        {
                                            !chat.isGroupChat ?
                                                <Grid
                                                    h='80px'
                                                    templateAreas={`"nav main"
                                                        "nav footer"`}
                                                        gridTemplateRows={'30px 1fr 20px'}
                                                        gridTemplateColumns={'60px 1fr'}
                                                        gap='0'
                                                        color='blackAlpha.700'
                                                        fontWeight='bold'
                                                >

                                                    <GridItem pl='2' area={'nav'}>
                                                        <ProfileModal user={getSenderUser(loggedUser, chat.users)}>
                                                            <Avatar
                                                                ml={"2%"}
                                                                mt={"12%"}
                                                                size="md"
                                                                cursor="pointer"
                                                                name={getSender(loggedUser, chat.users)}
                                                                src={getSenderUser(loggedUser, chat.users).picture}
                                                            />
                                                        </ProfileModal>
                                                    </GridItem>
                                                    <GridItem pt="2" pl="2"  area={'main'}>
                                                        
                                                    <Text fontSize="lg" style={{fontWeight:"500"}} color={selectedChat === chat ? "#7b1fa2" : "black"} fontFamily="PT Sans">{getSender(loggedUser, chat.users)}</Text>
                                                    </GridItem>
                                                    <GridItem pt="0" pl='2'  area={'footer'}>
                                                        <Text fontSize="sm" style={{fontWeight:"500"}} color={selectedChat === chat ? "#7b1fa2" : "gray"} fontFamily="PT Sans">This is a testing chat</Text>
                                                    </GridItem>
                                                    {/* <GridItem rowSpan={1} colSpan={1} bg={"red"}>
                                                        <ProfileModal user={getSenderUser(loggedUser,chat.users)}>
                                                            <Avatar
                                                                ml={"2%"}
                                                                mt={"2%"}
                                                                size="md"
                                                                cursor="pointer"
                                                                name={getSender(loggedUser, chat.users)}
                                                                src={getSenderUser(loggedUser,chat.users).picture}
                                                            />
                                                        </ProfileModal>
                                                    </GridItem>
                                                    <GridItem colSpan={4} bg={"blue"}>
                                                        <Text>{getSender(loggedUser,chat.users)}</Text>
                                                    </GridItem>
                                                    <GridItem colSpan={4} bg={"orange"}>
                                                        <Text>This is a testing chat</Text>
                                                    </GridItem> */}
                                                </Grid>
                                            :
                                                chat.chatName
                                        }
                                        
                                    </Box>
                                    ))
                                    }
                                   
                                </VStack>
                            ):(
                                <ChatLoading />
                            )
                        }
                        
                    </Box>
                )
            }
        </Box>
    
    )
}

export default MyChats
