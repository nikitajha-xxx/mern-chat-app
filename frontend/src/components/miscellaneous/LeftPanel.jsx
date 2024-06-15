import React, { useState,useEffect } from "react"
import { Box, Center,Text,Stack, HStack, VStack, Tooltip, Container, Flex, Grid, GridItem } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/hooks";
import { ChatState } from "../../Context/ChatProvider";
import { Avatar } from "@chakra-ui/avatar"
import { BellIcon, SmallAddIcon, AddIcon } from "@chakra-ui/icons";
import ProfileModal from './ProfileModal'
import { useNavigate } from "react-router-dom";

const LeftPanel = () => {
    const navigate = useNavigate()
    const {user,tabOption,setTabOption} = ChatState()
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


                    <Grid templateRows='repeat(4, 1fr)' mt={50} gap={3} w={{base:"197%",sm:"206%", md:"213%" }} style={{marginLeft:"-57%"}}>
                        <Tooltip hasArrow label='New Chat' bg='#E1BEE7' color="#7b1fa2">
                            <GridItem w='100%' h='12' borderWidth={"0"} bg={tabOption == 0 ? "gray.500" : "" }  borderRadius="15" _hover={{ bg: "gray.500", transform: 'translateY(-5px)',
                                                transitionDuration: '0.4s',transitionTimingFunction: "ease-in-out"}} style={{cursor:"pointer"}} onClick={()=> setTabOption(0)}>
                                <Center>
                                    
                                        <AddIcon boxSize={4}   color='#8e24aa' mt={4}/>
                            
                                </Center>
                            </GridItem>
                        </Tooltip>
                        <Tooltip hasArrow label='My Chats' bg='#E1BEE7' color="#7b1fa2">
                            <GridItem w='100%' h='12' borderWidth={"0"} bg={tabOption == 1 ? "gray.500" : "" } borderRadius="15" style={{cursor:"pointer"}} _hover={{ bg: "gray.500", transform: 'translateY(-5px)',
                                                transitionDuration: '0.4s',transitionTimingFunction: "ease-in-out"}} onClick={()=> setTabOption(1)}> 
                                <Center>
                                    <i className="fa-sharp fa-regular fa-comment" style={{fontSize:"20px", color:'#8e24aa', marginTop:"22%"}}></i>
                                </Center>
                            </GridItem>
                        </Tooltip>
                        <Tooltip hasArrow label='New Group Chat' bg='#E1BEE7' color="#7b1fa2">
                            <GridItem w='100%' h='12' borderWidth={"0"} bg={tabOption == 2 ? "gray.500" : "" } borderRadius="15" style={{cursor:"pointer"}} _hover={{ bg: "gray.500", transform: 'translateY(-5px)',
                                                transitionDuration: '0.4s',transitionTimingFunction: "ease-in-out"}} onClick={()=> setTabOption(2)}> 
                                <Center>
                                    <i className="fa-solid fa-users-line" style={{fontSize:"20px", color:'#8e24aa', marginTop:"22%"}}></i>
                                </Center>
                            </GridItem>
                        </Tooltip>
                        <Tooltip hasArrow label='Notifications' bg='#E1BEE7' color="#7b1fa2">
                            <GridItem w='100%' h='12' borderWidth={"0"} bg={tabOption == 3 ? "gray.500" : "" } borderRadius="15" style={{cursor:"pointer"}} _hover={{ bg: "gray.500", transform: 'translateY(-5px)',
                                                transitionDuration: '0.4s',transitionTimingFunction: "ease-in-out"}} onClick={()=> setTabOption(3)}>
                                <Center>
                                    <BellIcon boxSize={5} color='#8e24aa'  mt={3}/>
                                </Center>
                            </GridItem>
                        </Tooltip>
                        {/* <GridItem w='100%' h='12'>
                            <Center>
                                <Tooltip hasArrow label='Logout' bg='#E1BEE7' color="#7b1fa2">
                                    <i className="fa-solid fa-power-off" style={{fontSize:"20px", cursor:"pointer", color:'#8e24aa'}} onClick={logoutHandler}></i>
                                </Tooltip>
                            </Center>
                        </GridItem> */}
                    </Grid>

                    <Center>
                        <Box d="flex"  mt={"190%"}>
                            <Tooltip hasArrow label='Logout' bg='#E1BEE7' color="#7b1fa2">
                                <i className="fa-solid fa-power-off" style={{fontSize:"20px", cursor:"pointer", color:'#8e24aa'}} onClick={logoutHandler}></i>
                            </Tooltip>
                        </Box>
                    </Center>
                    
                    
                            {/* <Center>
                                <Box d="flex"  mt={127} >
                                    <Tooltip hasArrow label='New Chat' bg='#E1BEE7' color="#7b1fa2">
                                        <AddIcon boxSize={4} style={{cursor:"pointer"}}  color='#8e24aa'/>
                                    </Tooltip>
                                </Box>
                            </Center>
                        
                            <Center>
                                <Box d="flex"  mt={23} >
                                    <Tooltip hasArrow label='My Chats' bg='#E1BEE7' color="#7b1fa2">
                                        <i className="fa-sharp fa-regular fa-comment" style={{fontSize:"20px", cursor:"pointer", color:'#8e24aa'}}></i>
                                    </Tooltip>
                                </Box>
                            </Center>
                      
                            <Center>
                                <Box d="flex"  mt={23}>
                                    <Tooltip hasArrow label='Notifications' bg='#E1BEE7' color="#7b1fa2">
                                        <BellIcon boxSize={5} color='#8e24aa' style={{cursor:"pointer"}}/>
                                    </Tooltip>
                                </Box>
                            </Center> */}
                      
                            {/* <Center>
                                <Box d="flex"  mt={"190%"}>
                                    <Tooltip hasArrow label='Logout' bg='#E1BEE7' color="#7b1fa2">
                                        <i className="fa-solid fa-power-off" style={{fontSize:"20px", cursor:"pointer", color:'#8e24aa'}} onClick={logoutHandler}></i>
                                    </Tooltip>
                                </Box>
                            </Center> */}
                        
                    
                {/* </Box> */}
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
