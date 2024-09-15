'use client';
import { useState } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { redirect } from 'next/dist/server/api-utils';

function SignInPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const {data:session}=useSession()

if(session){
  router.push('/users')
}

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
    <div>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSignIn}>
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="HINT: Family"
            onChange={handlePasswordChange}
          />
          <Button type="submit" className="bg-red-500">
            Enter ChristMas List
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;


