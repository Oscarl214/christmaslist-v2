'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Button } from '@nextui-org/react';
import toast from 'react-hot-toast';

import { useParams } from 'next/navigation';
const ListForm = () => {
  const [item, setItem] = useState('');
  const { id } = useParams();

  console.log('form params', id);

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
          id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Item added successfully', result);
        toast.success('Item added successfully');
        setItem('');
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
      <form className="h-auto w-[300px]" onSubmit={handleSubmission}>
        <Card className="bg-white text-black">
          <CardBody>
            <label className="text-3xl">Enter wishlist item</label>
            <input
              type="text"
              placeholder="Socks"
              value={item}
              required
              className="bg-gray-500 rounded-sm m-2 font-sans text-[16px] h-[25px]"
              onChange={(e) => setItem(e.target.value)}
            />
          </CardBody>
          <CardFooter>
            <Button type="submit">Add to Wishlist</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ListForm;
