'use client';
import React from 'react';
import ListForm from './ListForm';
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
              <ModalHeader className="text-3xl text-center">
                Christmas List
              </ModalHeader>
              <Divider />
              <ModalBody className="">
                <ListForm
                  memberId={member.id}
                  updateWishList={updateWishList}
                />
                {member?.list2024 && member.list2024.length > 0 ? (
                  member.list2024.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <ul
                        className="font-sans list-disc list-inside"
                        key={index}
                      >
                        <li
                          className="p-1 marker:text-[#0077ff] text-xl"
                          key={index}
                        >
                          {item}
                        </li>
                      </ul>
                      <Button
                        color="danger"
                        variant="light"
                        size="sm"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-md">Please add your first Wish Item!</p>
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
