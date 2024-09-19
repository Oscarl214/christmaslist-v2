'use client'
import React, {useEffect,useState} from 'react'
import { useParams } from 'next/navigation'

import {Spinner} from '@nextui-org/react'
import LastYear from '@/app/components/memberpage/LastYear';
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
        <LastYear member={member}/>
    </div>
  )
}

export default Member