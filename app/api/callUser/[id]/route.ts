import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: any } }
) {
  const { id } = params;

  console.log('Received ID:', id);  

  if (!id) {
    return NextResponse.json({ error: "ID is undefined" }, { status: 400 });
  }

  try {
    const member = await prisma.member.findUnique({
      where: { id }, 
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
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error("Error fetching member:", error); 
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
