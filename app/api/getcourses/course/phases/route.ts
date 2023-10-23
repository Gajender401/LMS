import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function GET() {

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const course = await db.course.findMany({
      where: {
        applications: {
          some: {
            userId,
            status: 'Approved',
          },
        },
      }
    });

    const phase = await db.phase.findMany({
        where: {
          isPublished: true,
          courseId:course[0].id
        },
        include: {
          modules: {
            where: {
              isPublished: true,
            },
            include:{
              chapters: true
            }
          },
        },
        orderBy: {
          position:"asc"
        }
      });
    
    return NextResponse.json(phase);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}