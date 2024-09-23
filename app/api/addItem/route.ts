import { prisma } from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { item, memberId } = await request.json();

    if (!item || !memberId) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    const famMember = await prisma.member.findUnique({
      where: { id: memberId },
      select: { id: true, list2024: true },
    });

    if (!famMember) {
      return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    }

    const updatedList = [...famMember.list2024, item];

    await prisma.member.update({
      where: { id: famMember.id },
      data: {
        list2024: {
          set: updatedList,
        },
      },
    });

    return NextResponse.json(
      { message: 'Item added successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating wishlist:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while updating the wishlist',
      },
      { status: 500 }
    );
  }
}
