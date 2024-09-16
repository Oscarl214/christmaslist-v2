'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { Spinner } from '@nextui-org/react';
import NavBar from '../components/navbar';
import UBG from '../../public/usersBG.webp'
import MemberCard from '../components/userspage/MemberCard';
import Image from 'next/image';
const Users = () => {

    const {data:session}=useSession();

    if(!session){
        return (<div className='flex justify-center items-center h-screen'><Spinner size="lg"/></div>)
    }
  return (
<div className="">

      <NavBar/>
      <div className="">
       <MemberCard/>
        </div></div>
  )
}

export default Users