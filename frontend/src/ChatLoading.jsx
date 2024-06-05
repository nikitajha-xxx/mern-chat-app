import React from 'react'
import { Stack,Skeleton,VStack } from '@chakra-ui/react'


const ChatLoading = () => {
  return (
    <Stack mt={"5%"}  style={{height:"80vh"}}>
        <Skeleton height='60px'  borderRadius={"lg"} w={"90%"} mx="20px"/>
        <Skeleton height='60px' borderRadius={"lg"}  w={"90%"} mx="20px"/>
        <Skeleton height='60px' borderRadius={"lg"}  w={"90%"} mx="20px"/>
        <Skeleton height='60px' borderRadius={"lg"}  w={"90%"} mx="20px"/>
        <Skeleton height='60px' borderRadius={"lg"}  w={"90%"} mx="20px"/>
        <Skeleton height='60px' borderRadius={"lg"}  w={"90%"} mx="20px"/>
        <Skeleton height='60px' borderRadius={"lg"}  w={"90%"} mx="20px"/>
        
        
    </Stack>
  )
}

export default ChatLoading
