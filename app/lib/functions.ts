'use server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
export const getMembers = async () => {
  const session = await getServerSession();

  if (!session) {
    throw new Error('User not authenticated');
  }

  try {
    const allMembers = await prisma.member.findMany({
      select: {
        id: true,
        name: true,
        profilePic: true,
        list2023: true,
        list2024: true,
        info: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    console.log('fetched Members', allMembers);

    return allMembers;
  } catch (error) {
    console.error('Failed to Fetch Members', error);
    throw new Error('Failed to fetch members');
  }
};
