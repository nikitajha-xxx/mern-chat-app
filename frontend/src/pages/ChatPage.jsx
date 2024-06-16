import {Flex} from "@chakra-ui/react"
import { ChatState } from '../Context/ChatProvider'
import LeftPanel from '../components/miscellaneous/LeftPanel.jsx'
import MyChats from '../components/MyChats.jsx'
import ChatBox from '../components/ChatBox.jsx'
import NewChat from "../components/NewChat.jsx"
import AddGroupChat from "../components/AddGroupChat.jsx"

const ChatPage = () => {
    const {user,tabOption} = ChatState()
    return (
        // <Container maxW="xxl" centerContent>
        <div style={{width:"100%"}}>
            <Flex>
                {user && <LeftPanel />}
                {user && tabOption == 1 && <MyChats />}
                {user && tabOption == 0 && <NewChat/>}
                {user && tabOption == 2 && <AddGroupChat/>}
                {user && <ChatBox />}
            </Flex>
        </div>
    )
}

export default ChatPage
