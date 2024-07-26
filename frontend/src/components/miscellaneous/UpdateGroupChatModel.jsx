import React,{useState,useCallback} from 'react'
import { useDisclosure,useTab, useToast,Box,Tooltip, Center,useMultiStyleConfig,VStack,HStack,Input,Spinner,InputGroup,InputLeftElement, Tabs,TabList,Tab,TabPanels,TabPanel} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import UserListItem from '../UserAvatar/UserListItem'
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

import { CheckIcon, CloseIcon,SmallCloseIcon,ArrowRightIcon } from '@chakra-ui/icons'
import axios from 'axios'

const UpdateGroupChatModel = ({fetchAgain,setFetchAgain,fetchMessages,children}) => {

    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [editGroupName, setEditGroupName] = useState(false)
    // const [groupPic, setGroupPic] = useState(GroupProfilePicture)
    // const [imageloading, setImageloading] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)
    const [removeUserLoading, setRemoveUserLoading] = useState(false)
    const {selectedChat, setSelectedChat, user} = ChatState()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()

    const timeout = 500

    const handleRemove = async(user1)=>{
        if(!removeUserLoading && selectedChat.groupAdmin._id == user._id || user1._id == user._id){  
            try{
                setRemoveUserLoading(true)
                const config = {
                    headers:{
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const {data} = await axios.put('http://localhost:5555/api/chat/groupremove',{
                    chatId: selectedChat._id,
                    userId: user1._id
                    },
                    config
                )
                user1._id == user._id ? setSelectedChat() : setSelectedChat(data)
                setFetchAgain(!fetchAgain)
                fetchMessages()
                setRemoveUserLoading(false)
            }catch(error){
                toast({
                    title:"Error Occured!",
                    description:error.response.data.message,
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"top"
                })
                setRemoveUserLoading(false)
            }
        }
    }

    const handleAddUser = async()=>{
        if(selectedUsers.length > 0){
            let chat_users_ids = selectedChat.users.map(a=>a._id)
            let any_existing_user = selectedUsers.find(a=> chat_users_ids.includes(a._id))
            if(any_existing_user){
                toast({
                    title:`User ${any_existing_user.name} already present in the group!`,
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"bottom"
                });
                return
            }
            if(selectedChat.groupAdmin._id !== user._id){
                toast({
                    title:`Only Admin can add a Member!`,
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"bottom"
                });
                return
            }
            try{
                setLoading(true)
                const config = {
                    headers:{
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const {data} = await axios.put('http://localhost:5555/api/chat/groupadd',{
                    chatId: selectedChat._id,
                    userIds: selectedUsers
                    },
                    config
                )
                setSelectedChat(data)
                setSelectedUsers([])
                setFetchAgain(!fetchAgain)
                setLoading(false)
            }catch(error){
                toast({
                    title:"Error Occured!",
                    description:e.response.data.message,
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"top"
                })
                setLoading(false)
            }
        }
    }

    

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
            setFetchAgain(!fetchAgain)
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

    const addSelectedUsers = (user)=>{
        if(!loading){
            let chat_user = selectedChat.users.find(a=>a._id == user._id)
            if(!chat_user){
                let user_selected = selectedUsers.find(a=>a._id == user._id)
                if(user_selected){
                    console.log(selectedUsers.filter(a=>a._id != user._id))
                    setSelectedUsers(selectedUsers.filter(a=>a._id != user._id))
                }else{
                    setSelectedUsers([...selectedUsers, user])
                }
            }
        }
        
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
                let selectedUsersIds = selectedChat.users.map(a=>a._id)
                let filteredData = selectedUsersIds.length > 0 ? data.filter(a=> !selectedUsersIds.includes(a._id)) : data
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
                <ModalOverlay/>
                <ModalContent h="520px" className={"someNClass"}>
                {/* <ModalHeader fontSize="40px" fontFamily="Work sans" justifyContent="center" style={{display:"flex"}}>{user.name}</ModalHeader> */}
                <CloseIcon onClick={onClose}  style={{cursor:"pointer",marginLeft:"92%", marginTop:"2%"}}/>
                <ModalBody>
                    <Tabs colorScheme='brand'>
                            <TabList>
                               
                                <Tab isDisabled={loading ? true : false} width={selectedChat?.groupAdmin?._id == user._id ? "50%" : "100%"}>Group Info</Tab>
                                {
                                    selectedChat?.groupAdmin?._id == user._id &&
                                    <Tab isDisabled={removeUserLoading ? true : false} width={"50%"}>Add Member</Tab>
                                }
                                
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Box mt={0} flexDir="column" alignItems="center" justifyContent="space-between" style={{display:"flex",paddingBottom:"18%"}}>
                                        <Image borderRadius="full" boxSize="150px" src={selectedChat?.picture} alt={selectedChat?.chatName} style={{objectFit:"cover"}}/>
                                        {
                                            !editGroupName ?
                                            // <HStack mt={"-2%"}>
                                            <>
                                                <Box ml={"4%"}>
                                                    <Text style={{float:"left"}} pt={3} fontSize={{base:"23px", md:"25px"}} fontFamily="Work sans">{selectedChat?.chatName}
                                                    {/* <i class="fa-solid fa-pen" ml={"1%"}  style={{cursor:"pointer",color:'#8e24aa',fontSize:"16px"}} onClick={(e)=>setEditGroupName(true)}></i> */}
                                                    </Text>
                                                    <i class="fa-solid fa-pen"  style={{cursor:"pointer",color:'#8e24aa',position:"relative", top:"17%", left:'4%'}} onClick={(e)=>{!removeUserLoading && setEditGroupName(true)}}></i>
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
                                                            readOnly={renameLoading || removeUserLoading ? true : false}
                                                        />
                                                    </Box>
                                                    {
                                                        !renameLoading ?
                                                        <>
                                                            <Box mt={"6%"} ml={"3%"}>
                                                                <CheckIcon  color='#8e24aa' cursor="pointer" onClick={(e)=>{!removeUserLoading && handleRename()}}/>
                                                            </Box>
                                                            <Box mt={"6%"}  ml={"2%"}>
                                                                <SmallCloseIcon  color='#8e24aa' cursor="pointer" fontSize={"21px"} onClick={(e)=>{!removeUserLoading && setEditGroupName(false),!removeUserLoading && setGroupChatName('')}}/>
                                                            </Box>
                                                        </>
                                                        :
                                                            <Spinner ml={"3%"} mt={"2%"} size='sm' color='#7b1fa2' />
                                                    }
                                                    
                                                </HStack>
                                            </Box>

                                        }
                                        <Text mt={renameLoading ? "1%" : "-1%"} ml={"4%"} fontSize={{base:"14px", md:"15px"}} fontFamily="Work sans">{`Group . ${selectedChat?.users?.length} Members`}</Text>
                                        <Box w="87%" mt={5} overflowY="scroll" ml={"31%"} mr={"13%"}
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
                                            }} style={{height:"22vh"}}>
                                            {/* <Center> */}
                                                {
                                                    selectedChat?.users?.map((u)=>(
                                                        <UserBadgeItem
                                                            key={u._id}
                                                            user={u}
                                                            handleFunction={()=>handleRemove(u)}
                                                            basic={false}
                                                            disabled={removeUserLoading || selectedChat?.groupAdmin?._id != user._id}
                                                        />
                                                        
                                                    ))
                                                }
                                            {/* </Center> */}
                                        </Box>
                                        {
                                            selectedChat?.groupAdmin?._id != user._id && <Button
                                                colorScheme='red'
                                                width={"25%"}
                                                variant='outline'
                                                borderRadius="full"
                                                style={{marginTop:15, marginLeft:"80%"}}
                                                onClick={()=>handleRemove(user)}
                                                isLoading={removeUserLoading}
                                                disabled={removeUserLoading}
                                            >
                                                Exit Group
                                            </Button>
                                        }
                                        
                                    </Box>
                                </TabPanel>
                                {
                                    selectedChat?.groupAdmin?._id == user._id &&
                                    <TabPanel>
                                        <Box w="100%">
                                            <InputGroup >
                                                <InputLeftElement pointerEvents='none'>
                                                    <i className='fas fa-search' style={{ cursor:"pointer", color:'#8e24aa'}}></i>
                                                </InputLeftElement>
                                                <Input borderRadius="25"  placeholder='Search People...'  onChange={(e)=>debouncedHandledSearch(e.target.value)} focusBorderColor='#8e24aa' borderColor='#8e24aa' />
                                            </InputGroup>
                                            {selectedUsers.length > 0 && !loading ?
                                                <Box bg="#8e24aa" style={{marginLeft:"84%", marginTop:"3%"}} color="white" className='circle' onClick={()=>handleAddUser()}>
                                                    <Tooltip hasArrow label='Add' bg='#E1BEE7' color="#7b1fa2">
                                                        <ArrowRightIcon cursor="pointer" style={{marginLeft:"30%", marginTop:"15%"}}/>
                                                    </Tooltip>
                                                </Box>
                                                :
                                                loading &&
                                                <Spinner ml={"88%"} mt={"5%"} size='md' color='#7b1fa2' />
                                            }
                                            {
                                                selectedUsers.length > 0 && <Box w="100%" overflowY="scroll" mt={4}
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
                                                            selectedUsers.map((u)=>(
                                                                <UserBadgeItem
                                                                    key={u._id}
                                                                    user={u}
                                                                    handleFunction={()=>{!loading && setSelectedUsers(selectedUsers.filter(a=>a._id != u._id))}}
                                                                    basic={false}
                                                                    disabled={loading ? true : false}
                                                                />
                                                                
                                                            ))
                                                        }
                                                    {/* </Center> */}
                                                </Box>
                                            }
                                            <Box
                                                mt={5}
                                                overflowY="scroll"
                                                mb={5}
                                                sx={{
                                                    '&::-webkit-scrollbar': {
                                                    width: '16px',
                                                    borderRadius: '8px',
                                                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                                    },
                                                    '&::-webkit-scrollbar-thumb': {
                                                    borderRadius: '8px',
                                                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                                    },
                                                }}
                                            >
                                            
                                                {
                                                    searchResult.length > 0 ? (

                                                
                                                        <VStack spacing={1} align="flex-start" style={{height:selectedUsers.length > 0 ? "39vh" : "63vh"}}>
                                                            {
                                                                searchResult?.map((user)=>(
                                                                    <UserListItem 
                                                                        key={user._id}
                                                                        user={user}
                                                                        handleFunction={()=>addSelectedUsers(user)}
                                                                        selected={selectedUsers.find(a=>a._id == user._id) ? true : false}
                                                                        in_group={selectedChat?.users?.find(a=>a._id == user._id) ? true : false}
                                                                        showCheckbox={true}
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
                                    </TabPanel>
                                }
                                
                            </TabPanels>
                    </Tabs>
                    
                </ModalBody>

                <ModalFooter flexDir="column" alignItems="center" style={{display:"flex"}}>
                    
                    
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModel
