'use client';
import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getMembers } from '@/app/lib/functions';

interface Item {
  description: string;
  link: string | null;
}

interface Member {
  id: string;
  name: string;
  profilePic: string;
  list2023: string[];
  list2024: Item[];
  info: string[];
}

const MemberCard = () => {
  const {
    data: members,
    isLoading,
    error,
  } = useQuery({
    queryFn: getMembers,
    queryKey: ['membersData'],
  });

  if (isLoading) {
    return '...Loading';
  }

  if (error) {
    return 'Failed to fetch apps';
  }

  return (
    <div>
      <section className="py-3 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:gap-y-4 lg:gap-x-4">
            {members?.map((member: Member) => (
              <div
                className="group cursor-pointer w-full sm:w-1/2 lg:w-1/4 border border-black dark:border-green-500 rounded-2xl p-5 transition-all duration-300 hover:border-red-500"
                key={member.id}
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={member.profilePic}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-lg w-full object-cover"
                  />
                </div>
                <div className="block">
                  <h3 className="font-medium text-5xl text-center mb-9">
                    {member.name}
                  </h3>
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
