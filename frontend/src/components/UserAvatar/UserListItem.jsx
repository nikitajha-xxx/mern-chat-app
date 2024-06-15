import React from 'react'
import {Box,Grid,GridItem,Avatar,Text} from '@chakra-ui/react'
import ProfileModal from '../miscellaneous/ProfileModal'
import { ChatState } from '../../Context/ChatProvider'

const UserListItem = ({user, handleFunction}) => {
    console.log("userListItem gets rendered")
    return (
        <Box
            onClick={handleFunction}
            cursor={"pointer"}
            key={user._id}
            w={"90%"}
            m="3px 0px 3px 20px"
            borderRadius={"lg"}
            h={"60px"}
            role="group"
            _hover={{ bg: "#E1BEE7",color:"#7b1fa2", transform: 'translateY(-5px)',
                transitionDuration: '0.4s',transitionTimingFunction: "ease-in-out"}}
        >
            <Grid
                h='80px'
                templateAreas={`"nav main"
                    "nav footer"`}
                    gridTemplateRows={'30px 1fr 20px'}
                    gridTemplateColumns={'60px 1fr'}
                    gap='0'
                    
            >

                <GridItem pl='2' area={'nav'} onClick={(event)=>{event.stopPropagation()}}>
                    <ProfileModal user={user}>
                        <Avatar
                            ml={"2%"}
                            mt={"12%"}
                            size="md"
                            cursor="pointer"
                            name={user.name}
                            src={user.picture}
                        />
                    </ProfileModal>
                </GridItem>
                <GridItem pt="2" pl="2"  area={'main'}>
                    <Text fontSize="lg" style={{fontWeight:"500"}}  fontFamily="PT Sans">{user.name}</Text>
                </GridItem>
                <GridItem pt="0" pl='2'  area={'footer'} style={{whiteSpace:"nowrap", overflowX:"hidden"}}>
                    <Text fontSize="sm" style={{fontWeight:"500",textOverflow:"ellipsis",overflowX:"hidden"}} color={"gray"} _groupHover={{color: '#7b1fa2' }} fontFamily="PT Sans">{user.email}</Text>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default UserListItem
