'use client';
import React from 'react';
import ListForm from './ListForm';
import Image from 'next/image';
import { CiLink } from 'react-icons/ci';
import { TbChristmasBall } from 'react-icons/tb';
import { Card, CardBody } from '@nextui-org/react';
import Grinch from '../../../public/Grinch.gif';
import toast from 'react-hot-toast';
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
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { deleteItem } from '@/app/lib/functions';
import { useParams } from 'next/navigation';
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

const WishList: React.FC<MemberInfoProps> = ({ member }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const handleDelete = async (index: number) => {
  //   deleteWishItem(index);
  //   try {
  //     const response = await fetch('/api/deleteItem', {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ memberId: member.id, index }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Item deleted:', data.message);
  //     } else {
  //       const errorData = await response.json();
  //       console.error('Error deleting item:', errorData.message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  const { id } = useParams();

  const memberId = id as string;
  const queryClient = useQueryClient();
  const { mutateAsync: deleteItemMutation } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberData', memberId] });
    },
  });
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Button
          onPress={onOpen}
          className=" border-2 border-red-500 bg-transparent hover:bg-green-500"
        >
          Create
        </Button>

        <p className="m-2 text-4xl text-center">Create</p>
        <p className=" text-xl text-center">WishList</p>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex justify-center text-3xl gap-4 text-center">
              <TbChristmasBall className="text-green-500" />
              Christmas List
              <TbChristmasBall className="text-green-500" />
            </ModalHeader>
            <Divider className="text-black" />
            <ModalBody className="flex flex-col justify-center items-center gap-4">
              {member ? (
                <ListForm memberId={member.id} />
              ) : (
                <p>Loading member data...</p>
              )}

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
                              {item.description}
                            </li>
                            {item.link ? (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                <li className="p-1 marker:text-[#0077ff] text-xl">
                                  Link{' '}
                                  <CiLink className="inline-block mr-1 text-lg" />
                                </li>
                              </a>
                            ) : (
                              <span className="text-gray-500">
                                No link provided
                              </span>
                            )}
                          </ul>
                          <Button
                            className="text-black text-lg bg-red-500 ml-2"
                            variant="light"
                            size="sm"
                            onClick={async (e) => {
                              e.preventDefault();
                              if (!memberId || index === undefined) {
                                toast.error('Member ID and index are required');
                                return;
                              }

                              try {
                                deleteItemMutation({
                                  memberId: memberId,
                                  index: index,
                                });
                                toast.success('Item Deleted Successfully');
                              } catch (e) {
                                console.log('Error adding Item', e);
                                toast.error('Failed to add Item');
                              }
                            }}
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
              <Button className=" text-2xl" onPress={onOpenChange}>
                Close
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WishList;
