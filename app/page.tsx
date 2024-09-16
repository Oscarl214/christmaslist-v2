'use client';
import { useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { redirect } from 'next/dist/server/api-utils';

import BG from '../public/SIGNINBG.jpeg'
import Image from 'next/image';
function SignInPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const {data:session}=useSession()

// if(session){
//   router.push('/users')
// }

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!password) {
      toast.error('Please Input the Password to Access Application');
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        password,
      });

      console.log('SignIn Result:', result);

      if (result?.error) {
        toast.error('Incorrect Password: HINT: FAMILY');
      } else if (result?.ok) {
        router.push('/users');
      } else {
        toast.error('An Unexpected error occurred. Please try Again');
      }
    } catch (error) {
      console.error('Error', error);
      toast.error('An Unexpected error occurred. Please try Again');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
<div className="relative h-screen w-full">
  <Image
    src={BG}
    alt="Christmas Gifts"
    layout="fill"
    objectFit="cover" 
  />
  <div className="absolute inset-0 flex justify-center items-center z-10">
    <form onSubmit={handleSignIn} className="bg-white bg-opacity-75 p-8 rounded-md shadow-lg flex justify-center items-center  flex-col">
      <label htmlFor="password"></label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="HINT: Family"
        onChange={handlePasswordChange}
        className="p-2 border rounded mb-4"
      />
      <Button type="submit" className="bg-red-500 text-white text-center px-4 py-2 rounded lg:ml-2 ">
        Enter App
      </Button>
    </form>
  </div>
</div>

  );
}

export default SignInPage;


