import React from 'react'
import {Container, Box, Text, Center,Tabs,TabList,Tab,TabPanels,TabPanel} from "@chakra-ui/react"
import Login from '../components/Authentication/Login.jsx'
import Signup from '../components/Authentication/Signup.jsx'
const Home = () => {
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
            <Box bg="white" w="100%" p={4} borderRadius={"lg"} borderWidth={"1px"} color={'white'}>
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
