'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { Spinner } from '@nextui-org/react';

import NavBar from '@/app/components/navbar';
import Info from '@/app/components/memberpage/Info';

import Image from 'next/image';
import WishList from '@/app/components/memberpage/WishList';

interface Member {
  id: string;
  name: string;
  profilePic: string;
  list2023: string[];
  list2024: string[];
  info: string[];
}

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

      const data: Member = await result.json();
      setMember(data);
      console.log('Member Data:', data);
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

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
      <div className="flex justify-center items-center  flex-col lf:flex-row  md:flex-row gap-3">
        <Image
          src={member.profilePic}
          alt="Santa Card"
          width={300}
          height={300}
          className="rounded-lg bg-green-500"
        />
        <h2 className="text-7xl m-2">{member.name}</h2>
        <div className="flex flex-row mt-[100px] gap-2">
          <WishList member={member} />
          <Info member={member} />
        </div>
      </div>
    </div>
  );
};

export default Member;
