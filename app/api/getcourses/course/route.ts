import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function GET() {

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {

    const course = await db.course.findFirst({
      where: {
        batch: {
          some: {
            application:{
              some: {
                userId,
                status: 'Approved',
              },
            }
          },
        },
      },
      include: {
        category: true,
        phase: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
      },
    });
    
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}