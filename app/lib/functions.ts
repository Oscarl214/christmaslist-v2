'use server';
import { prisma } from '@/lib/prisma';
import { error } from 'console';

export const getMembers = async () => {
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

    return allMembers;
  } catch (error) {
    console.error('Failed to Fetch Members:', error);
    throw new Error('Failed to fetch members');
  }
};

export const getMemberbyID = async ({ memberId }: { memberId: string }) => {
  if (!memberId) {
    console.error('Member ID is required');
    return null;
  }
  try {
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      select: {
        id: true,
        name: true,
        profilePic: true,
        list2023: true,
        list2024: true,
        info: true,
      },
    });

    if (!member) {
      return console.error('Member not Found', error);
    }

    return member;
  } catch (error) {
    return console.error('Error fetching member:', error);
  }
};

export const addItem = async ({
  memberId,
  description,
  link,
}: {
  memberId: string;
  description: string;
  link: string;
}) => {};
