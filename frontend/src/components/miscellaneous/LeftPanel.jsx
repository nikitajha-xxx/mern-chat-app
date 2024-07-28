import React, { useState,useEffect } from "react"
import { Box, Center,VStack, Tooltip,Menu, MenuButton,MenuList,MenuItem,IconButton,Text,ScaleFade} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/hooks";
import { ChatState } from "../../Context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar"
import { BellIcon, SmallAddIcon, AddIcon } from "@chakra-ui/icons";
import ProfileModal from './ProfileModal'
import { useNavigate } from "react-router-dom";
import { getSender } from "../../config/ChatLogics";
import { Badge } from '@chakra-ui/react'


const LeftPanel = () => {
    const navigate = useNavigate()
    const {user,tabOption,setTabOption,notifications,setNotifications,setSelectedChat} = ChatState()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const logoutHandler = () => {
        localStorage.removeItem("userInfo")
        navigate("/")
    }

    useEffect(() => {
        console.log("width of inner height", window.innerHeight)
    },[])

    const getUniqueChats = ()=>{
        let chat_ids = notifications.map(n => n.chat._id);
        return chat_ids.filter((c, idx) => chat_ids.indexOf(c) === idx)
    }
    return (
        
            <Box w={{base:"19%",sm:"13%", md:"7%", lg:"5%"}} p={4} style={{height:"100vh"}} color={'black'} bg="#E1BEE7" borderWidth={"0"}  borderTopRightRadius={"25"} borderBottomRightRadius={"25"} boxShadow='dark-lg'>
                <Box d="flex"  mt={93} >
                    <Center>
                        <ProfileModal user={user}>
                            <Avatar
                                size="md"
                                cursor="pointer"
                                name={user.name}
                                src={user.picture}
                            />
                        </ProfileModal>
                    </Center>
                </Box>

                <VStack spacing={'10px'} mt={12}>
                    <Center>
                        <Box bg={tabOption == 0 ? "gray.500" : "" } cursor={"pointer"} p={15} borderRadius="15" _hover={{ bg: "gray.500", transform: 'translateY(-5px)',
                                    transitionDuration: '0.4s',transitionTimingFunction: "ease-in-out"}} onClick={()=> setTabOption(0)} >
                            <Tooltip hasArrow label='New Chat' bg='#E1BEE7' color="#7b1fa2" placement='right-start'>
                                <AddIcon color='#8e24aa'/>
                            </Tooltip>
                        </Box>
                    </Center>
                    
                    <Center>
                        <Box bg={tabOption == 1 ? "gray.500" : "" } cursor={"pointer"} p={15} borderRadius="15" _hover={{ bg: "gray.500", transform: 'translateY(-5px)',
                                    transitionDuration: '0.4s',transitionTimingFunction: "ease-in-out"}} onClick={()=> setTabOption(1)}>
                            <Tooltip hasArrow label='My Chats' bg='#E1BEE7' color="#7b1fa2" placement='right-start'>
                                <i className="fa-sharp fa-regular fa-comment" style={{fontSize:"20px", color:'#8e24aa'}}></i>
                            </Tooltip>
                        </Box>
                    </Center>

                    <Center>
                        <Box bg={tabOption == 2 ? "gray.500" : "" } cursor={"pointer"} p={15} borderRadius="15" _hover={{ bg: "gray.500", transform: 'translateY(-5px)',
                                    transitionDuration: '0.4s',transitionTimingFunction: "ease-in-out"}} onClick={()=> setTabOption(2)}>
                            <Tooltip hasArrow label='New Group Chat' bg='#E1BEE7' color="#7b1fa2" placement='right-start'>
                                <i className="fa-solid fa-users-line" style={{fontSize:"20px", color:'#8e24aa'}}></i>
                            </Tooltip>
                        </Box>
                    </Center>

                    

                </VStack>

                <Center>
                    <Box cursor={"pointer"} p={15} borderRadius="15" mt={{base:31,sm:25, md:7, lg:8}}>
                        {/* <Tooltip hasArrow label='Notifications' bg='#E1BEE7' color="#7b1fa2" placement='right-start'>
                            <BellIcon boxSize={5} color='#8e24aa'/>
                        </Tooltip> */}
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={
                                    <>
                                        <BellIcon boxSize={5} color='#8e24aa'/>
                                        {
                                            notifications.length > 0 &&
                                            <ScaleFade initialScale={0.9} in={true}>
                                                <Badge mt={"-172%"}borderRadius={25} backgroundColor={'red'}>
                                                    {notifications.length}
                                                </Badge>
                                            </ScaleFade>
                                        }
                                        
                                    </>
                                }
                                backgroundColor={"#E1BEE7"}
                                _hover={{ bg: "gray.500", transform: 'translateY(-5px)',
                                    transitionDuration: '0.4s',transitionTimingFunction: "ease-in-out"}}
                                _expanded={{ bg: 'gray.500' }}
                                px={"12px"}
                                py={"16px"}
                            />
                            <MenuList ml={"14%"} width='20vw'  borderRadius={25} height="31vh" overflowY={"scroll"} 
                            >
                                {!notifications.length && 
                                    <MenuItem style={{whiteSpace:"nowrap", overflowX:"hidden"}}>
                                        <Text fontSize="sm" style={{fontWeight:"500",textOverflow:"ellipsis",overflowX:"hidden"}} color={"#7b1fa2"}  fontFamily="PT Sans">
                                            No New Messages
                                        </Text>
                                    </MenuItem >
                                }
                                {   
                                    (getUniqueChats()).map((notif,idx)=>(
                                        <MenuItem key={idx} style={{whiteSpace:"nowrap", overflowX:"hidden"}}
                                            onClick={()=>{
                                                setSelectedChat(notifications.find(a=>a.chat._id == notif)?.chat);
                                                setNotifications(notifications.filter((n)=>n.chat._id != notif))
                                            }}>
                                            <Text fontSize="sm" style={{fontWeight:"500",textOverflow:"ellipsis",overflowX:"hidden"}} color={"#7b1fa2"}  fontFamily="PT Sans">
                                                {notifications.find(a=>a.chat._id == notif)?.chat.isGroupChat && notifications.filter(a=>a.chat._id == notif).length > 1
                                                 && `${notifications.filter(a=>a.chat._id == notif).length} New Messages in ${notifications.find(a=>a.chat._id == notif)?.chat.chatName}`
                                                }
                                                {notifications.find(a=>a.chat._id == notif)?.chat.isGroupChat && notifications.filter(a=>a.chat._id == notif).length == 1
                                                && `New Message in ${notifications.find(a=>a.chat._id == notif)?.chat.chatName}`
                                                }
                                                {
                                                    !notifications.find(a=>a.chat._id == notif)?.chat.isGroupChat && notifications.filter(a=>a.chat._id == notif).length > 1
                                                    && `${notifications.filter(a=>a.chat._id == notif).length} New Messages from ${getSender(user,notifications.find(a=>a.chat._id == notif)?.chat.users)}`
                                                }
                                                {
                                                    !notifications.find(a=>a.chat._id == notif)?.chat.isGroupChat && notifications.filter(a=>a.chat._id == notif).length == 1
                                                    && `New Message from ${getSender(user,notifications.find(a=>a.chat._id == notif)?.chat.users)}`
                                                }
                                            </Text>
                                        </MenuItem >
                                    ))
                                }
                            </MenuList>
                        </Menu>
                    </Box>
                </Center>
                <Center>
                    <Box d="flex"  mt={{base:4,sm:4, md:3, lg:3}}>
                        <Tooltip hasArrow label='Logout' bg='#E1BEE7' color="#7b1fa2" placement='right-start'>
                            <i className="fa-solid fa-power-off" style={{fontSize:"20px", cursor:"pointer", color:'#8e24aa'}} onClick={logoutHandler}></i>
                        </Tooltip>
                    </Box>
                </Center>

            </Box>        
    )
}

export default LeftPanel
