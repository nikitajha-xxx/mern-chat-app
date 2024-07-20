import React from 'react'
import {Box,Grid,GridItem,Avatar,Text,Checkbox} from '@chakra-ui/react'
import ProfileModal from '../miscellaneous/ProfileModal'
import { ChatState } from '../../Context/ChatProvider'

const UserListItem = ({user, handleFunction,selected, in_group,hover,showCheckbox,groupHover}) => {
    console.log("selected",selected,hover)
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
            _hover={hover}
            bg={selected || in_group ? "#E1BEE7" : ""}
            color={in_group || selected ? '#7b1fa2' : ""}
        >
            <Grid
                h='80px'
                templateAreas={`"nav main"
                    "nav footer"`}
                    gridTemplateRows={'30px 1fr 20px'}
                    gridTemplateColumns={showCheckbox ? '80px 1fr' : '60px 1fr'}
                    gap='0'
                    
            >
                <GridItem pl='2' area={'nav'} onClick={(event)=>{event.stopPropagation()}}>
                    {
                        showCheckbox ?
                            <Checkbox isChecked={selected || in_group} isDisabled={in_group} colorScheme='brand' onChange={handleFunction}>
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
                            </Checkbox>
                        :
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
                    }
                    
                </GridItem>
                <GridItem pt="2" pl="2"  area={'main'} style={{whiteSpace:"nowrap", overflowX:"hidden",overflowY:"hidden"}}>
                    <Text fontSize="lg" style={{fontWeight:"500",textOverflow:"ellipsis",overflowX:"hidden",overflowY:"hidden",float:showCheckbox?"left":""}}  fontFamily="PT Sans">{user.name}</Text>
                    {
                        in_group && <Text fontSize="sm" fontStyle={"italic"} mt={"0.5%"} color={"gray"}>{in_group ? `(Already In Group)`: ''}</Text>
                    }
                </GridItem>
                <GridItem pt="0" pl='2'  area={'footer'} style={{whiteSpace:"nowrap", overflowX:"hidden"}}>
                    <Text fontSize="sm" style={{fontWeight:"500",textOverflow:"ellipsis",overflowX:"hidden"}} color={selected || in_group ? '#7b1fa2' : "gray"} _groupHover={groupHover} fontFamily="PT Sans">{user.email}</Text>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default UserListItem
