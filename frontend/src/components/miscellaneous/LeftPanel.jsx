import React, { useState,useEffect } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerOverlay,Box, Center,Text,Stack, HStack, VStack, Tooltip, Container, Flex } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/hooks";
import { ChatState } from "../../Context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar"
import { BellIcon, SmallAddIcon, AddIcon } from "@chakra-ui/icons";
import ProfileModal from './ProfileModal'
import { useNavigate } from "react-router-dom";

const LeftPanel = () => {
    const navigate = useNavigate()
    const {user} = ChatState()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const logoutHandler = () => {
        localStorage.removeItem("userInfo")
        navigate("/")
    }

    useEffect(() => {
        console.log("width of inner height", window.innerHeight)
    },[])

    return (
        
            <Box w={{base:"19%",sm:"13%", md:"5%" }} p={4} style={{height:"100vh"}} color={'black'} bg="#E1BEE7" borderWidth={"0"}  borderTopRightRadius={"25"} borderBottomRightRadius={"25"} boxShadow='dark-lg'>
                <Box d="flex"  mt={70} >
                    <Center>
                        <ProfileModal user={user}>
                            <Avatar
                                size="md"
                                cursor="pointer"
                                name={user.name}
                                src={user.pic}
                            />
                        </ProfileModal>
                    </Center>
                    
                    {/* <Stack direction={['row', 'column']} spacing='24px'>
                        <Box> */}
                            <Center>
                                <Box d="flex"  mt={127} >
                                    <Tooltip hasArrow label='New Chat' bg='#E1BEE7' color="#7b1fa2">
                                        <AddIcon boxSize={4} style={{cursor:"pointer"}}  color='#8e24aa'/>
                                    </Tooltip>
                                </Box>
                            </Center>
                        {/* </Box>
                        <Box> */}
                            <Center>
                                <Box d="flex"  mt={23} >
                                    <Tooltip hasArrow label='My Chats' bg='#E1BEE7' color="#7b1fa2">
                                        <i className="fa-sharp fa-regular fa-comment" style={{fontSize:"20px", cursor:"pointer", color:'#8e24aa'}}></i>
                                    </Tooltip>
                                </Box>
                            </Center>
                        {/* </Box>
                        <Box> */}
                            <Center>
                                <Box d="flex"  mt={23}>
                                    <Tooltip hasArrow label='Notifications' bg='#E1BEE7' color="#7b1fa2">
                                        <BellIcon boxSize={5} color='#8e24aa' style={{cursor:"pointer"}}/>
                                    </Tooltip>
                                </Box>
                            </Center>
                        {/* </Box>
                        <Box> */}
                            <Center>
                                <Box d="flex"  mt={121}>
                                    <Tooltip hasArrow label='Logout' bg='#E1BEE7' color="#7b1fa2">
                                        <i className="fa-solid fa-power-off" style={{fontSize:"20px", cursor:"pointer", color:'#8e24aa'}} onClick={logoutHandler}></i>
                                    </Tooltip>
                                </Box>
                            </Center>
                        {/* </Box>
                    </Stack> */}
                    
                </Box>
            </Box>
            
            
        
            
               
                
            
            
            // {/* // <Drawer placement="left" onClose={onClose} onOpen={isOpen}>
            // //     <DrawerOverlay/>
            // //     <DrawerContent>
            // //         <DrawerHeader borderBottomWidth={"1px"}>Search People</DrawerHeader>
            // //     </DrawerContent>
            // // </Drawer> */}
        
    )
}

export default LeftPanel
