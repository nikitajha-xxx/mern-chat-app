import React from 'react'
import { Badge,Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'


const UserBadgeItem = ({user, handleFunction}) => {
    return (
        <Badge
            px={2}
            py={0}
            borderRadius="xl"
            m={1}
            mb={2}
            fontSize={12}
            cursor="pointer"
            onClick={handleFunction}
            key={user._id}
            bg="white"
            color="#7b1fa2"
            style={{textTransform:"none"}}

        >
            <Text fontSize="sm" style={{fontWeight:"500"}} fontFamily="PT Sans">
                {user.name}
                <CloseIcon pl={2}/>
            </Text>
            
        </Badge>
    )
}

export default UserBadgeItem
