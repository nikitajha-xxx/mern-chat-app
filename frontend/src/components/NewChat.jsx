import React, { useState,useCallback } from 'react'
import {Box,useDisclosure,ScaleFade,InputGroup,InputLeftElement,Input,VStack,Text,useToast} from '@chakra-ui/react'
import {debounce} from 'lodash';
import {ChatState} from '../Context/ChatProvider';
import ChatLoading from '../ChatLoading';
import UserListItem from './UserAvatar/UserListItem';
import axios from 'axios'


const NewChat = () => {
    const [searchResult, setSearchResult] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [loadingChats, setLoadingChats] = useState(false)

    const {user,setSelectedChat,setTabOption} = ChatState()
    const {isOpen} = useDisclosure()
    const timeout = 500
    const toast = useToast()

    const handleSearch = async (query)=>{
        //something
        if(query){
            try{
                setLoadingUsers(true)
                const config = {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
                const {data} = await axios.get(`http://localhost:5555/api/user?search=${query}`,config)
                setLoadingUsers(false)
                setSearchResult(data)
            }catch(err){
                toast({
                    title:"Error Occured",
                    description:err.message,
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"top"
                })
                setLoadingUsers(false)
            }
        }
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChats(true)
            const config = {
                headers:{
                    "Content-type":"application/json",
                    Authorization : `Bearer ${user.token}`
                }
            }

            const {data} = await axios.post(`http://localhost:5555/api/chat`,{userId}, config)
            setSelectedChat(data)
            setLoadingChats(false)
            setTabOption(1)

        }catch(error){
            toast({
                title:"Error Fetching the Chat",
                description:error.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left"
            })
            setLoadingChats(false)
        }
    }

    const debouncedHandledSearch = useCallback(debounce(handleSearch, timeout),[])
    return (
        
        <Box bg="white" w={{base: "70%",sm:"60%", md:"30%" }} style={{height:"95vh"}} m="20px 0px 11px 20px"   borderWidth={"0"} color={'black'} borderRadius="25">
            <ScaleFade initialScale={0.9} in={true}>
                <Box w={{base: "100%",sm:"100%", md:"100%" }} style={{height:"95vh"}} bg='#ce8fd9' borderWidth={"0"} color={'black'} borderRadius="25">
                    <Box pt={6} pl={5} pr={5} >
                        <InputGroup >
                            <InputLeftElement pointerEvents='none'>
                                <i className='fas fa-search' style={{ cursor:"pointer", color:'#8e24aa'}}></i>
                            </InputLeftElement>
                            <Input bg={"white"} borderRadius="25"  placeholder='Search People...'  onChange={(e)=>debouncedHandledSearch(e.target.value)} focusBorderColor='#ce8fd9'/>
                        </InputGroup>  
                    </Box>
                    <Box
                        mt={5}
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
                            loadingUsers ?
                                <ChatLoading />
                            :
                                searchResult.length > 0 ? (

                            
                                <VStack spacing={6} align="flex-start" style={{height:"80vh"}}>
                                    {
                                        searchResult?.map((user)=>(
                                            <UserListItem 
                                                key={user._id}
                                                user={user}
                                                handleFunction={()=>accessChat(user._id)}
                                            />
                                        ))
                                    }
                                
                                </VStack>
                            ):(
                                <Text></Text>
                            )
                        }
                        
                    </Box>
                </Box>
            </ScaleFade>
        </Box>
        
    )
}

export default NewChat
