'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { Spinner } from '@nextui-org/react';

import NavBar from '@/app/components/navbar';
import Info from '@/app/components/memberpage/Info';

import Image from 'next/image';
import WishList from '@/app/components/memberpage/WishList';
import FullList from '@/app/components/memberpage/FullList';
import Footer from '@/app/components/Footer';

interface Member {
  id: string;
  name: string;
  profilePic: string;
  list2023: string[];
  list2024: string[];
  info: string[];
}
//
const Member = () => {
  const { id } = useParams();

  console.log('params', id);

  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      const result = await fetch(`/api/callUser/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      //
      const data: Member = await result.json();
      setMember(data);

      console.log('Member Data:', data);
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

  const updatedWishList = (newItem: string) => {
    if (member) {
      setMember({
        ...member,
        list2024: [...member.list2024, newItem],
      });
    }
  };

  const deleteWishItem = (index: number) => {
    if (member) {
      const updatedList = member.list2024.filter((_, i) => i !== index);
      setMember({
        ...member,
        list2024: updatedList,
      });
    }
  };

  if (!member) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center  flex-col  gap-3">
        <div
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(https://christmaslist21.s3.us-east-2.amazonaws.com/Lights.gif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '300px',
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={member.profilePic}
            alt="Santa Card"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <h1 className="text-5xl">{member.name}&apos;s Wish List</h1>
        <div>
          <FullList member={member} />
        </div>
        <div className="flex flex-row justify-around gap-2 m-4 p-4">
          <WishList
            member={member}
            updateWishList={updatedWishList}
            deleteWishItem={deleteWishItem}
          />
          <Info member={member} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Member;
