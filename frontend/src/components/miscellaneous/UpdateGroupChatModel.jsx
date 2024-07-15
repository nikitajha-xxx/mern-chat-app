import React,{useState} from 'react'
import { useDisclosure, useToast,Box, Center,HStack,Input,Spinner} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
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

const UpdateGroupChatModel = ({chat,fetchAgain,setFetchAgain,children}) => {

    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [editGroupName, setEditGroupName] = useState(false)
    // const [addGroup, setAddGroup] = useState(false)
    // const [groupPic, setGroupPic] = useState(GroupProfilePicture)
    // const [imageloading, setImageloading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)

    const {selectedChat, setSelectedChat, user} = ChatState()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()

    const handleRemove = ()=>{

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
        }catch(error){
            toast({
                title:"Failed to Create Chat",
                description:e.response.data,
				status:"error",
				duration:5000,
				isClosable:true,
				position:"top"
            })
        }
        
    }

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
                <CloseIcon onClick={onClose}  style={{cursor:"pointer",marginLeft:"92%", marginTop:"4%"}}/>
                <ModalBody mt={35} flexDir="column" alignItems="center" justifyContent="space-between" style={{display:"flex",paddingBottom:"18%"}}>
                    <Image borderRadius="full" boxSize="180px" src={chat.picture} alt={chat.chatName} style={{objectFit:"cover"}}/>
                    {
                        !editGroupName ?
                        <HStack>
                            <Box ml={"10%"}>
                                <Text pt={3} fontSize={{base:"28px", md:"30px"}} fontFamily="Work sans">{chat.chatName}</Text>
                            </Box>
                            <Box>
                                <i class="fa-solid fa-pen"  style={{cursor:"pointer",color:'#8e24aa'}} onClick={(e)=>setEditGroupName(true)}></i>
                            </Box>
                        
                        </HStack>
                        :
                        <Box w={"100%"}>
                            <HStack>
                                <Box w={"50%"} ml={"29%"} pt={5}>
                                    <Input
                                        focusBorderColor='#E1BEE7' 
                                        placeholder='Group Name'
                                        onChange={(e)=>setGroupChatName(e.target.value)}
                                        variant='flushed'
                                        borderColor="#E1BEE7"
                                        _placeholder={{ paddingLeft:"25%" }}
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
                                        <Spinner ml={"3%"} mt={"5%"} size='sm' color='#7b1fa2' />
                                }
                                
                            </HStack>
                        </Box>

                    }
                    
                    
                    <Text pt={editGroupName ? 3 : ''} ml={"3%"} fontSize={{base:"14px", md:"16px"}} fontFamily="Work sans">{`Group . ${chat.users.length} Members`}</Text>
                    <Box pt={5} pb={editGroupName ? 10 : ''}>
                        <Center>
                            {
                                chat?.users?.map((u)=>(
                                    <UserBadgeItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={()=>handleRemove(u)}
                                        basic={false}
                                    />
                                    
                                ))
                            }
                        </Center>
                    </Box>
                </ModalBody>

                <ModalFooter flexDir="column" alignItems="center" style={{display:"flex"}}>
                    
                    
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModel
