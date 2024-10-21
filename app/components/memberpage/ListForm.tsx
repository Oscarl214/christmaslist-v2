'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { SlPresent } from 'react-icons/sl';
import { Spinner } from '@nextui-org/react';
import { IoIosLink } from 'react-icons/io';
interface ListFormProps {
  memberId: string;
}

const ListForm: React.FC<ListFormProps> = ({ memberId }) => {
  // const [item, setItem] = useState('');
  // const [link, setLink] = useState('');
  // const [loading, setLoading] = useState(false);
  // const handleSubmission = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!item) {
  //     toast.error('Please Input a Christmas Item');
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await fetch('/api/addItem', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         item,
  //         link,
  //         memberId,
  //       }),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log('Item added successfully', result);
  //       toast.success('Item added successfully');
  //       setItem('');
  //       setLink('');
  //       updateWishList(item);
  //     } else {
  //       console.error('Failed to add item');
  //       toast.error('Failed to add item');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting Item:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
              // value={item}
              required
              className="bg-gray-300 rounded-sm m-2 font-sans text-[16px] h-[35px] p-2"
              // onChange={(e) => setItem(e.target.value)}
            />
            <div className="flex justify-center flex-row items-center gap-4 m-2">
              <IoIosLink className="text-2xl text-blue-500" />
              <label className="text-3xl">Enter Link to Item</label>
            </div>
            <input
              type="text"
              placeholder="https://www.amazon.com/Kyosho-Halloween-Christmas-Waterproof-Multicolo..."
              // value={link}
              className="bg-gray-300 rounded-sm m-2 font-sans text-[16px] h-[35px] p-2"
              // onChange={(e) => setLink(e.target.value)}
            />
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              className="bg-green-500  text-3xl"
              // onClick={handleSubmission}
              // disabled={loading}
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
