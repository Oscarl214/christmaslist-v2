'use server';
import { prisma } from '@/lib/prisma';

interface Item {
  description: string;
  link?: string;
}

interface Member {
  id: string;
  name: string;
  profilePic: string;
  list2023: string[];
  list2024: Item[];
  info: string[];
}

export const getMembers = async (): Promise<Member[]> => {
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

    console.log("fetched Members", allMembers);
    return allMembers; // Ensure this is always Member[]
  } catch (error) {
    console.error('Failed to Fetch Members', error);
    throw new Error('Failed to fetch members'); // Throw error for consistent type
  }
};

