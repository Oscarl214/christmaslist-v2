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
  id,
  description,
  link,
}: {
  id: string;
  description: string;
  link: string;
}) => {
  try {
    if (!id || !description) {
      return {
        error: 'Member ID and description are required',
        status: 400,
      };
    }

    const famMember = await prisma.member.findUnique({
      where: { id: id },
      select: { id: true, list2024: true },
    });

    if (!famMember) {
      return {
        error: 'Member not found',
        status: 404,
      };
    }

    const newItem = {
      description,
      link: link || null,
    };

    const updatedList = [...(famMember.list2024 || []), newItem];

    await prisma.member.update({
      where: { id: famMember.id },
      data: {
        list2024: {
          set: updatedList,
        },
      },
    });

    return {
      message: 'Item added successfully',
      status: 200,
    };
  } catch (error) {
    console.error('Error updating wishlist:', error);
    return {
      error: 'An error occurred while updating the wishlist',
      status: 500,
    };
  }
};

export const deleteItem = async ({
  memberId,
  index,
}: {
  memberId: string;
  index: number;
}) => {
  try {
    const member = await prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      return { message: 'Member not found', status: 404 };
    }

    const updatedList2024 = [...member.list2024];
    updatedList2024.splice(index, 1);

    await prisma.member.update({
      where: { id: memberId },
      data: {
        list2024: updatedList2024,
      },
    });

    return { message: 'Item removed successfully' };
  } catch (error) {
    return;
    {
      message: 'Item removed successfully';
    }
  }
};

export const updateItem = async ({
  memberId,
  description,
  link,
  index,
}: {
  memberId: string;
  description: string;
  link: string;
  index: number;
}) => {
  try {
    if (!memberId || !description) {
      return {
        error: 'Member ID and description are required',
        status: 400,
      };
    }

    const famMember = await prisma.member.findUnique({
      where: { id: memberId },
      select: { id: true, list2024: true },
    });

    if (!famMember) {
      return {
        error: 'Member not found',
        status: 404,
      };
    }

    if (index < 0 || index >= famMember.list2024.length) {
      return {
        error: 'Invalid index',
        status: 400,
      };
    }

    const updatedList2024 = [...famMember.list2024];
    updatedList2024[index] = {
      ...updatedList2024[index],
      description: description,
      link: link || updatedList2024[index].link,
    };

    const updatedMember = await prisma.member.update({
      where: { id: memberId },
      data: {
        list2024: updatedList2024,
      },
    });

    return {
      message: 'Item updated successfully',
      status: 200,
      updatedMember,
    };
  } catch (error) {
    console.error('Error updating item:', error);
    return {
      error: 'Internal server error',
      status: 500,
    };
  }
};
