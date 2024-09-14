'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { Spinner } from '@nextui-org/react';
const Users = () => {

    const {data:session}=useSession();

    if(!session){
        return (<div className='flex justify-center items-center h-screen'><Spinner size="lg"/></div>)
    }
  return (
    <div>Users Page</div>
  )
}

export default Users