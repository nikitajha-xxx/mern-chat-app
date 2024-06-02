import React, { useState,useCallback,useEffect } from 'react'
import {Box, Button, Tooltip,Drawer, DrawerContent, DrawerHeader, DrawerOverlay,useDisclosure,Text,useToast, Stack} from "@chakra-ui/react"
import {Input, InputGroup, InputLeftElement} from '@chakra-ui/input'
import { AddIcon } from '@chakra-ui/icons'
import {debounce} from 'lodash';
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "../ChatLoading.jsx"
import axios from 'axios'

const MyChats = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()
    const [selectedChat, setSelectedChat] = useState(false)
    const [loggedUser, setLoggedUser] = useState()

    const {user, chats, setChats} = ChatState()

    const { isOpen, onOpen, onClose } = useDisclosure()
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
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
        fetchChats()
    },[])

    return (
        <Box bg="white" w={{base: selectedChat ? "0%" : "70%",sm:"60%", md:"30%" }} m="20px 0px 11px 20px"   borderWidth={"0"} color={'black'} borderRadius="25">
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
                        d="flex"
                        flexDir="column"
                        p={3}
                        w="100%"
                        h="100%"
                        overflowY={"hidden"}
                    >
                        {
                            chats ? (
                                <Stack overflowY="scroll">  
                                    {
                                        chats.map((chat)=>(
                                            <Box
                                                onClick={()=>setSelectedChat(chat)}
                                                cursor={"pointer"}
                                                bg={selectedChat=== chat ? "#38B2AC" : "white"}
                                                color={selectedChat === chat ? "white" : "black"}
                                                px={3}
                                                py={2}
                                                borderRadius={"lg"}
                                                key={chat._id}
                                            >

                                            </Box>
                                        ))
                                    }
                                </Stack>
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
