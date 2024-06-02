import React, { useState } from 'react'
import {VStack} from '@chakra-ui/layout'
import {FormControl, FormLabel} from '@chakra-ui/form-control'
import {Input, InputGroup, InputRightElement} from '@chakra-ui/input'
import {Button} from '@chakra-ui/button'
import {ArrowForwardIcon} from '@chakra-ui/icons'
import {useToast, Spinner} from '@chakra-ui/react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const login = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(false)

	const toast = useToast();
	const navigate = useNavigate();

	const handleClick = () => setShow(!show)
	const submitHandler = async()=>{
		setLoading(true)
		if(!email || !password){
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
		try{
			const config = {
				headers:{
					"Content-type" : "application/json"
				}
			}
			const {data} = await axios.post(
				'http://localhost:5555/api/user/login',
				{email,password}, 
				config
			)
			toast({
				title:"Login Successful",
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
			<FormControl id='email'>
				<FormLabel>Email</FormLabel>
				<Input 
					placeholder='Enter Your Email'
					onChange={(e)=>setEmail(e.target.value)}
					value={email}
				/>
			</FormControl>
			<FormControl id='password'>
				<FormLabel>Password</FormLabel>
					<InputGroup>
						<Input 
							type={show ? "text" : "password"}
							placeholder='Password'
							onChange={(e)=>setPassword(e.target.value)}
							value={password}
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
				Log In
			</Button>
			<Button
				rightIcon={<ArrowForwardIcon />}
				colorScheme='brand'
				variant='outline'
				width={"100%"}
				borderRadius="full"
				style={{marginTop:15}}
				onClick={()=>{
					setEmail("guest@example.com")
					setPassword("123456")
				}}
			>
				Get Guest User Credentials
			</Button>
		</VStack>
	)
}

export default login
