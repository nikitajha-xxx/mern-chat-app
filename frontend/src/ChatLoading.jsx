import React from 'react'
import { Stack,Skeleton } from '@chakra-ui/react'


const ChatLoading = () => {
  return (
    <Stack overflowY="scroll">
        <Skeleton height='40px' />    
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
    </Stack>
  )
}

export default ChatLoading
