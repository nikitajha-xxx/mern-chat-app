import React,{useState,useCallback} from 'react'
import { useDisclosure, useToast,Box, Center,HStack,Input,Spinner,InputGroup,InputLeftElement} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import {debounce} from 'lodash';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,Image, Text
  } from '@chakra-ui/react'

import { CheckIcon, CloseIcon,SmallCloseIcon } from '@chakra-ui/icons'
import axios from 'axios'

const UpdateGroupChatModel = ({fetchAgain,setFetchAgain,children}) => {

    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [editGroupName, setEditGroupName] = useState(false)
    // const [addGroup, setAddGroup] = useState(false)
    // const [groupPic, setGroupPic] = useState(GroupProfilePicture)
    // const [imageloading, setImageloading] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)

    const {selectedChat, setSelectedChat, user} = ChatState()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()

    const handleRemove = ()=>{

    }

    const timeout = 500

    const handleRename = async()=>{
        if(!groupChatName) return

        try{
            setRenameLoading(true)
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            }
            const {data} = await axios.put('http://localhost:5555/api/chat/rename',{
                chatId: selectedChat._id,
                chatName: groupChatName
                },
                config
            )

            setSelectedChat(data)
        }catch(error){
            toast({
                title:"Error Occured!",
                description:e.response.data.message,
				status:"error",
				duration:5000,
				isClosable:true,
				position:"top"
            })
        }
        setGroupChatName('')
        setEditGroupName(false)
        setRenameLoading(false)
        
    }

    const handleSearch = async (query)=>{
        if(query){
            try{
                setLoadingUsers(true)
                const config = {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
                const {data} = await axios.get(`http://localhost:5555/api/user?search=${query}`,config)
                let selectedUsersIds = selectedUsers.map(a=>a._id)
                let filteredData = selectedUsersIds.length > 0 ? data.filter(a=> !selectedUsersIds.includes(a._id)) : data
                setLoadingUsers(false)
                setSearchResult(filteredData)
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
        }else{
            setSearchResult([])
        }
    }

    const debouncedHandledSearch = useCallback(debounce(handleSearch, timeout),[])

    return (
        <>
            {
            children ? 
                (
                    <span onClick={onOpen}>{children}</span>
                )
                :
                (
                    ''
                )
            }
            <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered >
                <ModalOverlay />
                <ModalContent h="410px">
                {/* <ModalHeader fontSize="40px" fontFamily="Work sans" justifyContent="center" style={{display:"flex"}}>{user.name}</ModalHeader> */}
                <CloseIcon onClick={onClose}  style={{cursor:"pointer",marginLeft:"92%", marginTop:"2%"}}/>
                <ModalBody mt={0} flexDir="column" alignItems="center" justifyContent="space-between" style={{display:"flex",paddingBottom:"18%"}}>
                    <Image borderRadius="full" boxSize="150px" src={selectedChat.picture} alt={selectedChat.chatName} style={{objectFit:"cover"}}/>
                    {
                        !editGroupName ?
                        // <HStack mt={"-2%"}>
                        <>
                            <Box ml={"4%"}>
                                <Text style={{float:"left"}} pt={3} fontSize={{base:"23px", md:"25px"}} fontFamily="Work sans">{selectedChat.chatName}
                                {/* <i class="fa-solid fa-pen" ml={"1%"}  style={{cursor:"pointer",color:'#8e24aa',fontSize:"16px"}} onClick={(e)=>setEditGroupName(true)}></i> */}
                                </Text>
                                <i class="fa-solid fa-pen"  style={{cursor:"pointer",color:'#8e24aa',position:"relative", top:"17%", left:'4%'}} onClick={(e)=>setEditGroupName(true)}></i>
                            </Box>
                            {/* <Box>
                                <i class="fa-solid fa-pen"  style={{cursor:"pointer",color:'#8e24aa'}} onClick={(e)=>setEditGroupName(true)}></i>
                            </Box> */}
                        </>
                        // </HStack>
                        :
                        <Box w={"100%"}>
                            <HStack>
                                <Box w={"50%"} ml={"29%"}>
                                    <Input
                                        focusBorderColor='#E1BEE7' 
                                        placeholder='Group Name'
                                        onChange={(e)=>setGroupChatName(e.target.value)}
                                        variant='flushed'
                                        borderColor="#E1BEE7"
                                        _placeholder={{ paddingLeft:"25%" }}
                                        readOnly={renameLoading ? true : false}
                                    />
                                </Box>
                                {
                                    !renameLoading ?
                                    <>
                                        <Box mt={"6%"} ml={"3%"}>
                                            <CheckIcon color='#8e24aa' cursor="pointer" onClick={(e)=>handleRename()}/>
                                        </Box>
                                        <Box mt={"6%"}  ml={"2%"}>
                                            <SmallCloseIcon color='#8e24aa' cursor="pointer" fontSize={"21px"} onClick={(e)=>{setEditGroupName(false),setGroupChatName('')}}/>
                                        </Box>
                                    </>
                                    :
                                        <Spinner ml={"3%"} mt={"2%"} size='sm' color='#7b1fa2' />
                                }
                                
                            </HStack>
                        </Box>

                    }
                    
                    
                    <Text mt={renameLoading ? "1%" : "-1%"} ml={"4%"} fontSize={{base:"14px", md:"15px"}} fontFamily="Work sans">{`Group . ${selectedChat.users.length} Members`}</Text>
                    <Box w="100%" mt={5} pb={3} overflowY="scroll"
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
                        }} style={{height:"12vh"}}>
                        {/* <Center> */}
                            {
                                selectedChat?.users?.map((u)=>(
                                    <UserBadgeItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={()=>handleRemove(u)}
                                        basic={false}
                                    />
                                    
                                ))
                            }
                        {/* </Center> */}
                    </Box>
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
                </ModalBody>

                <ModalFooter flexDir="column" alignItems="center" style={{display:"flex"}}>
                    
                    
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModel
