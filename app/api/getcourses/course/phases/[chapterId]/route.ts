import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { chapterId: string } }
) {

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {

    const _module = await db.module.findMany({
        where: {
          chapters:{
            some:{
              id:params.chapterId
            }
          }
        },
        include: {
          chapters: {
            where: {
              isPublished: true,
            },
            include:{
              videos: true,
              quizs: true
            }
          },
        },
        orderBy: {
          position:"asc"
        }
      });
    
    return NextResponse.json(_module);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}