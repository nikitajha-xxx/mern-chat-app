import React from 'react'
import { Badge,Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'


const UserBadgeItem = ({user, handleFunction,basic,disabled=false}) => {
    return (
        <Badge
            px={2}
            py={0}
            borderRadius="xl"
            m={1}
            mb={2}
            fontSize={12}
            cursor={!disabled ? "pointer" : ""}
            onClick={!disabled && handleFunction}
            key={user._id}
            bg={basic ? "white" : "#7b1fa2"}
            color={basic ? "#7b1fa2" : "white"}
            style={{textTransform:"none"}}
        >
            <Text fontSize="sm" style={{fontWeight:"500"}} fontFamily="PT Sans">
                {user.name}
                {
                    !disabled && <CloseIcon pl={2}/>
                }
                
            </Text>
            
        </Badge>
    )
}

export default UserBadgeItem
