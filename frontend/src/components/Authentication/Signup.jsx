import React, { useState } from 'react'
import {VStack} from '@chakra-ui/layout'
import {FormControl, FormLabel} from '@chakra-ui/form-control'
import {Input, InputGroup, InputRightElement} from '@chakra-ui/input'
import {Button} from '@chakra-ui/button'
import {useToast, Spinner} from '@chakra-ui/react'
import axios, { Axios } from 'axios'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [confirmpassword, setConfirmpassword] = useState()
	const [password, setPassword] = useState('')
	const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(false)
	const [imageloading, setImageloading] = useState(false)
	const toast = useToast();
	const navigate = useNavigate();

	const handleClick = () => setShow(!show)
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
				setPic(data.url.toString());
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
	const submitHandler = async()=>{
		setLoading(true)
		if(!name || !email || !password || !confirmpassword){
			toast({
				title:"Please fill all the fields",
				status:"warning",
				duration:5000,
				isClosable:true,
				position:"top"
			});
			setLoading(false)
			return
		}
		if(password !== confirmpassword){
			toast({
				title:"Passwords Do Not Match",
				status:"warning",
				duration:5000,
				isClosable:true,
				position:"top"
			})
			setLoading(false)
			return
		}
		try{
			const config = {
				headers:{
					"Content-type" : "application/json"
				}
			}
			const {data} = await axios.post(
				'http://localhost:5555/api/user',
				{name, email,password,pic}, 
				config
			)
			toast({
				title:"Sign Up Successful",
				status:"success",
				duration:5000,
				isClosable:true,
				position:"top"
			})
			localStorage.setItem('userInfo', JSON.stringify(data))
			setLoading(false)
			navigate("/chats") //take user into the inside page
		}catch(err){
			toast({
				title:"Error Occured",
				description:err.response.data.message,
				status:"error",
				duration:5000,
				isClosable:true,
				position:"top"
			})
			setLoading(false)
		}
	}

	return (
		<VStack spacing={'5px'} color={'black'}>
			<div className="personal-image">
				<label className="label">
					<input type="file" onChange={(e)=>postDetails(e.target.files[0])}/>
					<figure className="personal-figure">
					<img src={pic} className="personal-avatar" alt="avatar" />
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
			
			<FormControl id='first-name' >
				<FormLabel>Name</FormLabel>
				<Input 
					placeholder='Enter Your Name'
					onChange={(e)=>setName(e.target.value)}
				/>
			</FormControl>
			<FormControl id='email' >
				<FormLabel>Email</FormLabel>
				<Input 
					placeholder='Enter Your Email'
					onChange={(e)=>setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl id='password' >
				<FormLabel>Password</FormLabel>
					<InputGroup>
						<Input 
							type={show ? "text" : "password"}
							placeholder='Password'
							onChange={(e)=>setPassword(e.target.value)}
						/>
						<InputRightElement width={'4.5rem'}>
							<Button h="1.75rem" size="sm" onClick={handleClick}>
								{show ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>
			</FormControl>
			<FormControl id='confirm_password' >
				<FormLabel>Confirm Password</FormLabel>
					<InputGroup>
						<Input 
							type={show ? "text" : "password"}
							placeholder='Confirm Password'
							onChange={(e)=>setConfirmpassword(e.target.value)}
						/>
						<InputRightElement width={'4.5rem'}>
							<Button h="1.75rem" size="sm" onClick={handleClick}>
								{show ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>
			</FormControl>
			<Button
				colorScheme='brand'
				width={"100%"}
				borderRadius="full"
				style={{marginTop:15}}
				onClick={submitHandler}
				isLoading={loading}
			>
				Sign Up
			</Button>
		</VStack>
	)
}

export default Signup
