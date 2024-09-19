'use client'
import React from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    Button,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Divider
  } from '@nextui-org/react';

interface Member {
    id: string;
    name: string;
    profilePic: string;
    list2023: string[]
    list2024: string[]
    info: string[]
}

interface MemberInfoProps{
    member:Member
}
const LastYear:React.FC<MemberInfoProps> = ({member}) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>      <Button onPress={onOpen} className="bg-blue-500 hover:bg-orange-500">
    2023 List
  </Button>
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            Vehicle Specs
          </ModalHeader>
          <Divider />
          <ModalBody className="">
              {member.list2023.map((item,index)=>(

                  <ul className="font-sans list-disc list-inside" >
              <li className="p-1 marker:text-[#0077ff]" key={index}>
                {item}
              </li>

            </ul>
                ))}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal></div>
  )
}

export default LastYear


//Using Model System here to place last years info based on button click