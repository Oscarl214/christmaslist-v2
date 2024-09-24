'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Member {
  id: string;
  name: string;
  profilePic: string;
  list2023: string[];
  list2024: string[];
  info: string[];
}

const MemberCard = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const router = useRouter();

  useEffect(() => {
    const callMembers = async () => {
      try {
        const result = await fetch('/api/callMembers', {
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }

        const data = await result.json();

        console.log('All Data', data);

        setMembers(data.MembersData);
      } catch (error) {
        console.error('Error fetching Member data', error);
      } finally {
      }
    };
    callMembers();
  }, []);

  const handleClick = (id: string) => {
    router.push(`/member/${id}`);
  };

  return (
    <div className="">
      <section className="py-3 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:gap-y-4 lg:gap-x-4">
            {members.map((member) => (
              <div
                className="group cursor-pointer w-full sm:w-1/2 lg:w-1/4 border border-black dark:border-green-500 rounded-2xl p-5 transition-all duration-300 hover:border-red-500 "
                key={member.id}
                onClick={() => handleClick(member.id)}
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={member.profilePic}
                    alt="Santa Card"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(https://christmaslist21.s3.us-east-2.amazonaws.com/Snow.gif)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    width={200}
                    height={200}
                    className="rounded-lg w-full object-cover"
                  />
                </div>
                <div className="block">
                  <h3 className='font-medium text-5xl text-center  mb-9"'>
                    {member.name}
                  </h3>

                  <div className="flex items-center justify-between font-medium mt-4">
                    <h6 className="text-sm"></h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MemberCard;
