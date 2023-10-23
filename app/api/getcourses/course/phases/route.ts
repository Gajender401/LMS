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


    const phases = await db.phase.findMany({
      where: {
        isPublished: true,
        courseId: course[0].id
      },
      include: {
        modules: {
          where: {
            isPublished: true,
          },
          include: {
            chapters: true
          }
        },
      },
      orderBy: {
        position: "asc"
      }
    });

    for (const phase of phases) {
      const chapterCount = await db.chapter.count({
        where: {
          module: {
            phaseId: phase.id,
          },
        },
      });

      const phaseData = [phase,chapterCount]
    }

    const userProgressCount = await db.userProgress.count({
      where: {
        userId
      },
    });

    return NextResponse.json(phases);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT() {

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const applications = await db.applications.findMany({
      where: {
        userId,
        status: 'Approved',
      }
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}