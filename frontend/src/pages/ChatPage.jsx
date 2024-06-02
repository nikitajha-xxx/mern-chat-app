import {Container, Box} from "@chakra-ui/react"
import { ChatState } from '../Context/ChatProvider'
import LeftPanel from '../components/miscellaneous/SideDrawer.jsx'
import MyChats from '../components/MyChats.jsx'
import ChatBox from '../components/ChatBox.jsx'

const ChatPage = () => {
    const {user} = ChatState()
    return (
        // <Container maxW="xxl" centerContent>
        <div style={{width:"100%"}}>
            {user && <LeftPanel />}
            {/* <Box w="84%" p={4}  color={'white'} marginTop={"5%"}>
                
                {user && <MyChats />}
                
            </Box> */}
        </div>
        // </Container>
        // <div style={{width:"100%"}}>
        //     {user && <LeftPanel />}
        //         <Box justifyContent='space-between' w='100%' h='91.5vh' p='10px' style={{display:"flex"}}>
        //         {user && <MyChats />}
        //         {user && <ChatBox />}
        //     </Box>
        // </div>
    )
}

export default ChatPage
