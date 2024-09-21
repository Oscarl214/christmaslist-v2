'use client';
import React from 'react';

import Image from 'next/image';
import Stocking from '../../../public/stocking.png';
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
const WishList: React.FC<MemberInfoProps> = ({ member }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

        <p className="m-2 text-4xl">Wish List</p>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Christmas List
              </ModalHeader>
              <Divider />
              <ModalBody className="">
                {member?.list2023 && member.list2023.length > 0 ? (
                  member.list2023.map((item, index) => (
                    <ul className="font-sans list-disc list-inside" key={index}>
                      <li className="p-1 marker:text-[#0077ff]">{item}</li>
                    </ul>
                  ))
                ) : (
                  <p>No data available for 2023 list.</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WishList;
