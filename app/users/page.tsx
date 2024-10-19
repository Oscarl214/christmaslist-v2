'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Spinner } from '@nextui-org/react';
import NavBar from '../components/navbar';

import MemberCard from '../components/userspage/MemberCard';
import Footer from '../components/Footer';
import Test from '../components/test';

const Users = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div>
        <MemberCard />
      
      </div>
      <Footer />
    </div>
  );
};

export default Users;
