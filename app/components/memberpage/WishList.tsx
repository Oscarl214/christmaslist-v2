'use client';
import React from 'react';
import ListForm from './ListForm';
import Image from 'next/image';
import Elf from '../../../public/Elf.png';
import { TbChristmasBall } from 'react-icons/tb';
import { Card, CardBody } from '@nextui-org/react';
import Grinch from '../../../public/Grinch.gif';
import Link from 'next/link';
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
  updateWishList: (newItem: string) => void;
  deleteWishItem: (index: number) => void;
}

const WishList: React.FC<MemberInfoProps> = ({
  member,
  deleteWishItem,
  updateWishList,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = async (index: number) => {
    deleteWishItem(index);
    try {
      const response = await fetch('/api/deleteItem', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memberId: member.id, index }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Item deleted:', data.message);
      } else {
        const errorData = await response.json();
        console.error('Error deleting item:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Button onPress={onOpen} className="border-red-500" variant="ghost">
          Create
        </Button>

        <p className="m-2 text-4xl">Create Wish List</p>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center text-3xl gap-4 text-center">
                <TbChristmasBall className="text-green-500" />
                Christmas List
                <TbChristmasBall className="text-green-500" />
              </ModalHeader>
              <Divider className="text-black" />
              <ModalBody className="flex flex-col justify-center items-center gap-4">
                <ListForm
                  memberId={member.id}
                  updateWishList={updateWishList}
                />

                <div className="w-full h-64 overflow-auto border rounded-lg p-2">
                  {member?.list2024 && member.list2024.length > 0 ? (
                    member.list2024.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-2"
                      >
                        <Card className="w-full">
                          <CardBody className="flex justify-between items-center">
                            <ul className="font-sans list-disc list-inside w-full">
                              <li className="p-1 marker:text-[#0077ff] text-xl">
                                {item}
                              </li>
                            </ul>
                            <Button
                              className="text-black text-lg bg-red-500 ml-2"
                              variant="light"
                              size="sm"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </Button>
                          </CardBody>
                        </Card>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center flex-col items-center h-full">
                      <p className="text-3xl text-center ">
                        Please add your first Wish Item!
                      </p>
                      <Image
                        src={Grinch}
                        alt="Animated GIF"
                        width={200}
                        height={200}
                        unoptimized={true}
                        className="rounded-sm"
                      />
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className=" text-2xl" onPress={onClose}>
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
