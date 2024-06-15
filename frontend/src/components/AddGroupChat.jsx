import React, {useState,useCallback} from 'react'
import {Box,ScaleFade,InputGroup,InputLeftElement,Input,Text,VStack,useToast,Tooltip,Spinner, Center,Button} from '@chakra-ui/react'
import {ArrowRightIcon, ArrowLeftIcon} from "@chakra-ui/icons"
import {FormControl, FormLabel} from '@chakra-ui/form-control'
import {debounce} from 'lodash';
import UserListItem from './UserAvatar/UserListItem';
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios'
import ChatLoading from '../ChatLoading';
import UserBadgeItem from './UserAvatar/UserBadgeItem';
import GroupProfilePicture from '../assets/GroupProfilePicture.jpg'


const AddGroupChat = () => {
    const [searchResult, setSearchResult] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [addGroup, setAddGroup] = useState(false)
    const [groupPic, setGroupPic] = useState(GroupProfilePicture)
    const [imageloading, setImageloading] = useState(false)

    const toast = useToast();
    const timeout = 500
    const {user,chats,setChats,setTabOption} = ChatState()

    const handleSearch = async (query)=>{
        //something
        if(query){
            try{
                setLoadingUsers(true)
                const config = {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
                const {data} = await axios.get(`http://localhost:5555/api/user?search=${query}`,config)
                let selectedUsersIds = selectedUsers.map(a=>a._id)
                let filteredData = selectedUsersIds.length > 0 ? data.filter(a=> !selectedUsersIds.includes(a._id)) : data
                setLoadingUsers(false)
                setSearchResult(filteredData)
            }catch(err){
                toast({
                    title:"Error Occured",
                    description:err.message,
                    status:"error",
                    duration:5000,
                    isClosable:true,
                    position:"top"
                })
                setLoadingUsers(false)
            }
        }else{
            setSearchResult([])
        }
    }

    const handleGroup = (userToAdd) => {
        if(!selectedUsers.map(a=>a._id).includes(userToAdd._id)){
            setSelectedUsers([...selectedUsers, userToAdd])
            setSearchResult(searchResult.filter(a=>a._id != userToAdd._id))
            
        }
    }

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter(sel=> sel._id != delUser._id))
    }

    const debouncedHandledSearch = useCallback(debounce(handleSearch, timeout),[selectedUsers])

    const postDetails = (pics) => {
		console.log("checkkkkk if func getting called", pics)
		setImageloading(true)
		if(pics === undefined){
			toast({
				title:"Please Select an Image!",
				status:"warning",
				duration:5000,
				isClosable:true,
				position:"top"
			})
			setImageloading(false)
			return
		}
		if(pics.type === "image/jpeg"|| pics.type === "image/png"){
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "chatin-app")
			data.append("cloud_name", "djwhia6w6")
			fetch("https://api.cloudinary.com/v1_1/djwhia6w6/image/upload",{
				method:"post",
				body:data
			}).then((res)=>res.json()).then((data)=>{
				setGroupPic(data.url.toString());
				setImageloading(false)
			}).catch((err)=>{
				console.log(err)
				setImageloading(false)
			})
		}else{
			toast({
				title:"Please Select an Image!",
				status:"warning",
				duration:5000,
				isClosable:true,
				position:"top"
			})
			setImageloading(false)
			return
		}
	}

    const handleSubmit = async ()=>{
        if(!groupChatName || !selectedUsers){
            toast({
                title:"Please Give a Group Name",
				status:"warning",
				duration:5000,
				isClosable:true,
				position:"top"
            })
            return
        }

        try{
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data} = await axios.post(`http://localhost:5555/api/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u)=>u.id)),
                    groupPic: groupPic
                },
                config
            )
            setChats([data,...chats])
            setTabOption(1)
            toast({
                title:"Successfully Added New Group Chat",
				status:"success",
				duration:5000,
				isClosable:true,
				position:"top"
            })
            return

        }catch(e){
            toast({
                title:"Failed to Create Chat",
                description:e.response.data,
				status:"error",
				duration:5000,
				isClosable:true,
				position:"top"
            })
            return
        }
    }
    return (
        <Box bg="white" w={{base: "70%",sm:"60%", md:"30%" }} style={{height:"95vh"}} m="20px 0px 11px 20px"   borderWidth={"0"} color={'black'} borderRadius="25">
            <ScaleFade initialScale={0.9} in={true}>
                {!addGroup && <Box w={{base: "100%",sm:"100%", md:"100%" }} style={{height:"95vh"}} bg='#ce8fd9' borderWidth={"0"} color={'black'} borderRadius="25">
                    <Box pt={6} pl={5} pr={5} >
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <i className='fas fa-search' style={{ cursor:"pointer", color:'#8e24aa'}}></i>
                            </InputLeftElement>
                            <Input bg={"white"} borderRadius="25"  placeholder='Search People...'  onChange={(e)=>debouncedHandledSearch(e.target.value)} focusBorderColor='#ce8fd9'/>
                        </InputGroup>  
                    </Box>
                    <Box mt={8} ml={6} mr={2}>
                        {
                            selectedUsers?.map((u)=>(
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={()=>handleDelete(u)}
                                />
                                
                            ))
                        }
                        {selectedUsers.length > 1 && <Box bg="white" style={{marginLeft:"84%", marginTop:"1%"}} color="#8e24aa" className='circle' onClick={()=>setAddGroup(true)}>
                            <Tooltip hasArrow label='Add' bg='#E1BEE7' color="#7b1fa2">
                                <ArrowRightIcon cursor="pointer" style={{marginLeft:"30%", marginTop:"15%"}}/>
                            </Tooltip>
                        </Box>
                        }
                    </Box>
                    <Box
                        mt={5}
                        overflowY="scroll"
                        
                        sx={{
                            '&::-webkit-scrollbar': {
                            width: '16px',
                            borderRadius: '8px',
                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                            },
                            '&::-webkit-scrollbar-thumb': {
                            borderRadius: '8px',
                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                            },
                        }}
                    >
                    
                        {
                            loadingUsers ?
                                <ChatLoading />
                            :
                                searchResult.length > 0 ? (

                            
                                <VStack spacing={1} align="flex-start" style={{height:"80vh"}}>
                                    {
                                        searchResult?.map((user)=>(
                                            <UserListItem 
                                                key={user._id}
                                                user={user}
                                                handleFunction={()=>handleGroup(user)}
                                            />
                                        ))
                                    }
                                
                                </VStack>
                            ):(
                                <Text></Text>
                            )
                        }
                        
                    </Box>
                </Box>}
                {
                    addGroup && <ScaleFade initialScale={0.9} in={true}>
                        <Box pt={6} pl={5} pr={5}  w={{base: "100%",sm:"100%", md:"100%" }} style={{height:"95vh"}} bg='#ce8fd9' borderWidth={"0"} color={'black'} borderRadius="25">
                            <Box   pt={4}  style={{height:"60vh"}} bg="white" borderRadius="25">
                                <Box bg="#E1BEE7" style={{ marginTop:"1%", marginLeft:"3%"}} color="#8e24aa" className='circle' onClick={()=>setAddGroup(false)}>
                                    <Tooltip hasArrow label='Go Back' bg='white' color="#7b1fa2">
                                        <ArrowLeftIcon cursor="pointer" style={{marginLeft:"30%", marginTop:"15%"}}/>
                                    </Tooltip>
                                </Box>
                                <VStack spacing={'6px'} color={'black'}>
                                    <div className="personal-image">
                                        <label className="label">
                                            <input type="file" onChange={(e)=>postDetails(e.target.files[0])}/>
                                            <figure className="personal-figure">
                                            <img src={groupPic} className="personal-avatar" alt="avatar" />
                                            {
                                                imageloading &&
                                                <figcaption className='loader-figcaption'>
                                                    <Spinner size='md' mt={"29%"}/>
                                                </figcaption>
                                            }
                                            {
                                                !imageloading && 
                                                <figcaption className="personal-figcaption">
                                                    <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                                                </figcaption>
                                            }
                                            
                                            </figure>
                                        </label>
                                    </div>
                
                                    <Center>
                                        <Input
                                            focusBorderColor='#E1BEE7' 
                                            placeholder='Group Name'
                                            onChange={(e)=>setGroupChatName(e.target.value)}
                                            variant='flushed'
                                            borderColor="#E1BEE7"
                                            _placeholder={{ paddingLeft:"25%" }}
                                        />
                                    </Center>
                                    <Button
                                        colorScheme='brand'
                                        width={"50%"}
                                        borderRadius="full"
                                        style={{marginTop:40,fontWeight:"500"}}
                                        onClick={handleSubmit}
                                        fontSize="md"
                                        fontFamily="PT Sans"
                                    >
                                        Add Group
                                    </Button>
                                </VStack>
                            </Box> 
                        </Box>
                    </ScaleFade>
                }
            </ScaleFade>
        </Box>
    )
}

export default AddGroupChat
