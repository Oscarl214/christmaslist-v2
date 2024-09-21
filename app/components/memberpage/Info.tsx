'use client';
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
} from '@nextui-org/react';
import Stocking from '../../../public/stocking.png';
import Image from 'next/image';
interface Member {
  id: string;
  name: string;
  profilePic: string;
  list2023: string[];
  list2024: string[];
  info: string[];
}

interface MemberInfoProps {
  member: Member;
}

const Info: React.FC<MemberInfoProps> = ({ member }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Image
          src={Stocking}
          height={100}
          width={100}
          alt="Stocking"
          onClick={onOpen}
          className="cursor-pointer"
        />

        <p className="m-2 text-4xl text-center">Info</p>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>INFO</ModalHeader>
          <Divider />
          <ModalBody className="h-auto">
            {member?.info && member.info.length > 0 ? (
              member.info.map((item, index) => (
                <ul key={index} className="font-sans list-disc list-inside">
                  <li className="p-1 marker:text-[#0077ff]">{item}</li>
                </ul>
              ))
            ) : (
              <p className="text-black"> No Info available</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Info;