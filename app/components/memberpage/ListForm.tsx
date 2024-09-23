'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { SlPresent } from 'react-icons/sl';
interface ListFormProps {
  memberId: string;
  updateWishList: (newItem: string) => void;
}

const ListForm: React.FC<ListFormProps> = ({ memberId, updateWishList }) => {
  const [item, setItem] = useState('');

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) {
      toast.error('Please Input a Christmas Item');
    }

    try {
      const response = await fetch('/api/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item,
          memberId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Item added successfully', result);
        toast.success('Item added successfully');
        setItem('');
        updateWishList(item);
      } else {
        console.error('Failed to add item');
        toast.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error submitting Item:', error);
    }
  };

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
              value={item}
              required
              className="bg-gray-300 rounded-sm m-2 font-sans text-[16px] h-[35px] p-2"
              onChange={(e) => setItem(e.target.value)}
            />
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              className="bg-green-500  text-3xl"
              onClick={handleSubmission}
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
