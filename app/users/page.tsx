'use server';

import React from 'react';
import { getServerSession } from 'next-auth';
import { Spinner } from '@nextui-org/react';
import NavBar from '../components/navbar';
import MemberCard from '../components/userspage/MemberCard';
import Footer from '../components/Footer';

const Users = async () => {
  const session = await getServerSession();

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
