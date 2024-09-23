import { prisma } from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET() {
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
    });
    return NextResponse.json({
      message: 'MEmbers Data fetched',
      MembersData: allMembers,
    });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
