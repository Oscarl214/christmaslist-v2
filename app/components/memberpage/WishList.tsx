'use client';
import React, { useState } from 'react';
import ListForm from './ListForm';
import Image from 'next/image';
import { CiLink } from 'react-icons/ci';
import { TbChristmasBall } from 'react-icons/tb';
import { Card, CardBody, Input, Spinner } from '@nextui-org/react';
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
import { deleteItem, updateItem } from '@/app/lib/functions';
import { useParams } from 'next/navigation';
import { TbXboxX } from 'react-icons/tb';

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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const memberId = id as string;

  console.log('Upon clicking create', memberId);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteItemMutation } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberData', memberId] });
    },
  });

  const { mutateAsync: updateItemMutation } = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberData', memberId] });
    },
  });

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setDescription(member?.list2024[index].description || '');
    setLink('');
  };

  const handleUpdateClick = async (index: number) => {
    if (!memberId || index === undefined) {
      toast.error('Member ID and index are required');
      return;
    }
    setLoading(true);
    try {
      await updateItemMutation({ index, memberId, description, link });
      setDescription('');
      setLink('');
      setEditingIndex(null);

      toast.success('Item Updated Successfully');
    } catch (e) {
      console.log('Error updating Item', e);
      toast.error('Failed to update Item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Button
          onPress={onOpen}
          
          className="border-2 font-mono border-red-500 bg-transparent hover:bg-green-500"
        >
          Create
        </Button>
        <p className="m-2 text-4xl text-center">Create</p>
        <p className="text-xl text-center">WishList</p>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={'top'}>
        <ModalContent>
          <ModalHeader className="flex justify-center text-3xl gap-4 text-center">
            <TbChristmasBall className="text-green-500" />
            Christmas List
            <TbChristmasBall className="text-green-500" />
          </ModalHeader>
          <Divider className="text-black" />
          <ModalBody className="flex flex-col justify-center items-center gap-4">
          {member ? (
    editingIndex === null ? (
      <ListForm />
    ) : (
      <p className="text-center text-lg">Editing an item. Please finish editing before adding a new one.</p>
    )
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
                      <CardBody className="flex justify-between items-center ">
                        {editingIndex === index ? (
                          <div className="flex flex-col gap-3 w-full font-mono ">
                            <textarea
                              value={description}
                              className="min-h-[150px] w-full overflow-y-auto p-2 border rounded-md"
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder={`Item to Update: ${item.description}`}
                            />

                            <Input
                              type="link"
                              value={link}
                              onChange={(e) => setLink(e.target.value)}
                              label="www.amazon/socks.com.."
                            />
                            <div>
                              {loading ? (
                                <div className="flex justify-center items-center">
                                  <Spinner size="sm" label="Updating.." />
                                </div>
                              ) : (
                                <div className="flex flex-row justify-around items-end">
                                  <Button
                                    className="text-black text-lg font-mono bg-green-500 mt-2"
                                    variant="light"
                                    size="sm"
                                    onClick={() =>
                                      handleUpdateClick(editingIndex!)
                                    }
                                  >
                                    Update Item
                                  </Button>
                                  <TbXboxX
                                    className="text-xl text-red-500 cursor-pointer"
                                    onClick={() => setEditingIndex(null)}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <>
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
                            <div className="flex flex-row gap-4 m-2">
                              <Button
                                className="text-black text-lg font-mono bg-blue-500 ml-2"
                                variant="light"
                                size="sm"
                                onClick={() => handleEditClick(index)}
                              >
                                Edit
                              </Button>
                              <Button
                                className="text-black text-lg font-mono bg-red-500 ml-2"
                                variant="light"
                                size="sm"
                                onClick={async () => {
                                  setLoading(true);
                                  try {
                                    await deleteItemMutation({
                                      memberId,
                                      index,
                                    });
                                    toast.success('Item Deleted Successfully');
                                  } catch (e) {
                                    console.log('Error deleting Item', e);
                                    toast.error('Failed to delete Item');
                                  } finally {
                                    setLoading(false);
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </>
                        )}
                      </CardBody>
                    </Card>
                  </div>
                ))
              ) : (
                <div className="flex justify-center flex-col items-center h-full">
                  <p className="text-3xl text-center">
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
            <Button
              className="text-2xl"
              onPress={onOpenChange}
              onClick={() => setEditingIndex(null)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default WishList;
