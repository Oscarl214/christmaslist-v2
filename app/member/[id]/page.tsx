'use client'
import React, {useEffect,useState} from 'react'
import { useParams } from 'next/navigation'

import {Spinner} from '@nextui-org/react'
import LastYear from '@/app/components/memberpage/LastYear';
import NavBar from '@/app/components/navbar';
import Info from '@/app/components/memberpage/Info';

import Image from 'next/image';

interface Member {
    id: string;
    name: string;
    profilePic: string;
    list2023: string[]
    list2024: string[]
    info: string[]
}


const Member = () => {

    const {id}= useParams();

    console.log('params', id)

    const [member,setMember]=useState<Member | null>(null)

    
    useEffect(()=>{
        const fetchMember= async ()=>{

            const result= await fetch(`/api/callUser/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            })

            const data: Member= await result.json();
            setMember(data)
            console.log('Member Data:', data)
        }

        if(id){
            fetchMember()
        }
    }, [id])

    if(!member){
        return (<div className='flex justify-center items-center h-screen'><Spinner/></div>)
    }
  return (
    <div>
        <NavBar/>
        <div className='flex justify-center items-center h-screen flex-col lf:flex-row  md:flex-row gap-3'>
   
        <Image
                      src={member.profilePic}
                      alt="Santa Card"
                      width={500}
                      height={500}
                      className="rounded-lg "
                      />
<div className='flex flex-row justify-evenly'>

        <LastYear member={member}/>
        <Info member={member}/>
</div>
        </div>
    </div>
  )
}

export default Member