import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: {params: {id:string}}){
   
   const {id}=params
   
//      if (!ObjectId.isValid(id)) {
//     return NextResponse.json(
//       { error: 'Invalid blog ID format' },
//       { status: 400 }
//     );
//   }

  try {
      const member= await prisma.member.findUnique({
          where: {id}, 
          select: {
            id:true,
            name:true,
            profilePic:true,
            list2023:true,
            list2024:true,
            info:true,
          }
      })
      if (!member) {
              return NextResponse.json({ error: 'Member not found' }, { status: 404 });
            }
            return NextResponse.json(member);
          } catch (error) {
            return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
          }
        }
        


// import { prisma } from '@/lib/prisma';
// import { NextResponse } from 'next/server';
// import { ObjectId } from 'mongodb';
// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;

//   if (!ObjectId.isValid(id)) {
//     return NextResponse.json(
//       { error: 'Invalid blog ID format' },
//       { status: 400 }
//     );
//   }

//   try {
//     const blog = await prisma.blogPost.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         title: true,
//         content: true,
//         tags: true,
//         status: true,
//         images: true,
//         author: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     if (!blog) {
//       return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
//     }
//     return NextResponse.json(blog);
//   } catch (error) {
//     return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
//   }
// }
