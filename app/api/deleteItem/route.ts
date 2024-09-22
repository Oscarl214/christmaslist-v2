import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { memberId, index } = await request.json();

    const member = await prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 }
      );
    }

    const updatedList2024 = [...member.list2024];
    updatedList2024.splice(index, 1);

    await prisma.member.update({
      where: { id: memberId },
      data: {
        list2024: updatedList2024,
      },
    });

    return NextResponse.json({ message: 'Item removed successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting item', error },
      { status: 500 }
    );
  }
}
