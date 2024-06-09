import React, {useEffect} from 'react'
import {Container, Box, Text, Center,Tabs,TabList,Tab,TabPanels,TabPanel} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import Login from '../components/Authentication/Login.jsx'
import Signup from '../components/Authentication/Signup.jsx'

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) navigate("/chats");
    }, [navigate]);

    return (
        <Container maxW="xl" centerContent>
            <Box
                d="flex"
                justifyContent="center"
                p={3}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Center>
                    <Text fontSize="4xl" fontFamily="Work sans">
                        ChatIn
                    </Text>
                </Center>
                
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius={"lg"} borderWidth={"1px"} color={'white'} height={"80vh"} overflowY="scroll"
                        sx={{
                            '&::-webkit-scrollbar': {
                            width: '16px',
                            borderRadius: '8px',
                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                            },
                            '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                            },
                        }}>
                {/* <Tabs variant='soft-rounded' colorScheme='#704491'> */}
                <Tabs variant='soft-rounded' colorScheme='brand'>
                    <TabList>
                        <Tab width={"50%"}>Login</Tab>
                        <Tab width={"50%"}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Home
