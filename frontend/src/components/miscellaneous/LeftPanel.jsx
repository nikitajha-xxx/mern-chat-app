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

                    <Center>
                        <Box bg={tabOption == 3 ? "gray.500" : "" } cursor={"pointer"} p={15} borderRadius="15" _hover={{ bg: "gray.500", transform: 'translateY(-5px)',
                                    transitionDuration: '0.4s',transitionTimingFunction: "ease-in-out"}} onClick={()=> setTabOption(3)}>
                            <Tooltip hasArrow label='Notifications' bg='#E1BEE7' color="#7b1fa2" placement='right-start'>
                                <BellIcon boxSize={5} color='#8e24aa'/>
                            </Tooltip>
                        </Box>
                    </Center>

                </VStack>

                {/* <Grid templateRows='repeat(4, 1fr)' mt={50} gap={3}  style={{marginLeft:"-57%"}}>
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
                </Grid> */}

                <Center>
                    <Box d="flex"  mt={{base:12,sm:12, md:10, lg:12}}>
                        <Tooltip hasArrow label='Logout' bg='#E1BEE7' color="#7b1fa2" placement='right-start'>
                            <i className="fa-solid fa-power-off" style={{fontSize:"20px", cursor:"pointer", color:'#8e24aa'}} onClick={logoutHandler}></i>
                        </Tooltip>
                    </Box>
                </Center>

            </Box>        
    )
}

export default LeftPanel
