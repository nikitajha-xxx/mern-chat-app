import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,Image, Text
  } from '@chakra-ui/react'

import { CloseIcon } from '@chakra-ui/icons'

const ProfileModal = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {
            children ? 
                (
                    <span onClick={onOpen}>{children}</span>
                )
                :
                (
                    ''
                )
            }
            <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
                <ModalOverlay />
                <ModalContent h="410px">
                {/* <ModalHeader fontSize="40px" fontFamily="Work sans" justifyContent="center" style={{display:"flex"}}>{user.name}</ModalHeader> */}
                <CloseIcon onClick={onClose}  style={{cursor:"pointer",marginLeft:"92%", marginTop:"4%"}}/>
                <ModalBody mt={35} flexDir="column" alignItems="center" justifyContent="space-between" style={{display:"flex",paddingBottom:"18%"}}>
                    <Image borderRadius="full" boxSize="150px" src={user.pic} alt={user.name}/>
                    <Text pt={3} fontSize={{base:"28px", md:"30px"}} fontFamily="Work sans">{user.name}</Text>
                </ModalBody>

                <ModalFooter flexDir="column" alignItems="center" style={{display:"flex"}}>
                    
                    
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal
