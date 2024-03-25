import React, { useState } from 'react'
import {VStack} from '@chakra-ui/layout'
import {FormControl, FormLabel} from '@chakra-ui/form-control'
import {Input, InputGroup, InputRightElement} from '@chakra-ui/input'
import {Button} from '@chakra-ui/button'

const Signup = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [confirmpassword, setConfirmpassword] = useState()
	const [password, setPassword] = useState('')
	const [pic, setPic] = useState()
	const [show, setShow] = useState(false)

	const handleClick = () => setShow(!show)
	const postDetails = (pics) => {

	}
	const submitHandler = ()=>{}

	return (
		<VStack spacing={'5px'} color={'black'}>
			<div className="personal-image">
				<label className="label">
					<input type="file" onChange={(e)=>postDetails(e.target.files[0])}/>
					<figure className="personal-figure">
					<img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" className="personal-avatar" alt="avatar" />
					<figcaption className="personal-figcaption">
						<img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
					</figcaption>
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
			>
				Sign Up
			</Button>
		</VStack>
	)
}

export default Signup
