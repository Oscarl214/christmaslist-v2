'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Spinner } from '@nextui-org/react';
import Info from '@/app/components/memberpage/Info';
import NavBar from '@/app/components/navbar';
import WishList from '@/app/components/memberpage/WishList';
import Image from 'next/image';
import FullList from '@/app/components/memberpage/FullList';
import Footer from '@/app/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { getMemberbyID } from '@/app/lib/functions';
import Link from 'next/link';
const Member = () => {
  const { id } = useParams();

  console.log('params', id);

  const {
    data: member = null,
    isPending,
    error,
  } = useQuery({
    queryKey: ['memberData', id],
    queryFn: () =>
      getMemberbyID({ memberId: typeof id === 'string' ? id : id[0] }),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error loading Member data</p>;
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
            src={member?.profilePic ?? '@/public/Elf.png'}
            alt="Santa Card"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <h1 className="text-5xl">{member?.name}&apos;s Wish List</h1>
        <div>
          <FullList member={member} />
        </div>
        <div className="flex flex-row justify-around gap-2 m-4 p-4">
          <WishList member={member} />
          <Info member={member} />
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          className="btn border-2 font-mono border-yellow-500 bg-transparent hover:bg-green-500"
          href={'/users'}
        >
          Back to Fam
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Member;
