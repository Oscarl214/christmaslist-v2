'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { SlPresent } from 'react-icons/sl';
import { Spinner } from '@nextui-org/react';
import { IoIosLink } from 'react-icons/io';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { addItem } from '@/app/lib/functions';

import { useParams } from 'next/navigation';

const ListForm = () => {
  const { id } = useParams();

  const memberId = id as string;

  const queryClient = useQueryClient();

  const [description, setDesciption] = useState('');
  const [link, setLink] = useState('');

  const { mutateAsync: addItemMutation } = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberData', memberId] });
    },
  });
  return (
    <div className="flex flex-col justify-center items-center ">
      <form className="h-auto w-[300px]">
        <Card className="bg-white text-black">
          <CardBody>
            <div className="flex justify-center flex-row items-center gap-4">
              <SlPresent className="text-2xl text-yellow-500" />
              <label className="text-3xl">Enter wishlist item</label>
            </div>
            <input
              type="text"
              placeholder="Socks"
              value={description}
              required
              onChange={(e) => setDesciption(e.target.value)}
              className="bg-gray-300 rounded-sm m-2 font-sans text-[16px] h-[35px] p-2"
            />
            <div className="flex justify-center flex-row items-center gap-4 m-2">
              <IoIosLink className="text-2xl text-blue-500" />
              <label className="text-3xl">Enter Link For Item</label>
            </div>
            <input
              type="text"
              placeholder="https://www.amazon.com/Kyosho-Halloween-Christmas-Waterproof-Multicolo..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="bg-gray-300 rounded-sm m-2 font-sans text-[16px] h-[35px] p-2"
            />
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              className="bg-green-500  text-3xl"
              onClick={async (e) => {
                e.preventDefault();
                if (!id || !description) {
                  toast.error('Member ID and description are required');
                  return;
                }
                try {
                  await addItemMutation({
                    id: memberId,
                    description,
                    link,
                  });
                  setLink('');
                  setDesciption('');
                } catch (e) {
                  console.log('Error adding Item', e);
                  toast.error('Failed to add Item');
                }
              }}
            >
              Add Item
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ListForm;
