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

import Image from 'next/image';
import Rudolph from '../../../public/Rudolph.gif';
interface Item {
  description: string;
  link: string | null;
}

interface Member {
  id: string;
  name: string;
  profilePic: string;
  list2023: string[];
  list2024: Item[];
  info: string[];
}

interface MemberInfoProps {
  member: Member | null;
}

const Info: React.FC<MemberInfoProps> = ({ member }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Button
          onPress={onOpen}
          className=" border-2 font-mono border-green-500 bg-transparent hover:bg-red-500"
        >
          Info
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col justify-center items-center">
              <p className="m-2">INFO</p>
              <Image
                src={Rudolph}
                alt="Animated GIF"
                width={500}
                height={500}
                unoptimized={true}
                className="rounded-sm"
              />
            </div>
          </ModalHeader>
          <Divider />
          <ModalBody className="h-auto">
            {member?.info && member.info.length > 0 ? (
              member.info.map((item, index) => (
                <ul key={index} className="font-sans list-disc list-inside">
                  <li className="p-1 marker:text-[#0077ff]">{item}</li>
                </ul>
              ))
            ) : (
              <p className="text-black">No Info available</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Info;
