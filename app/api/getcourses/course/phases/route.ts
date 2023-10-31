import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { differenceInDays } from 'date-fns';

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
    });

    const batch = await db.batch.findFirst({
      where: {
        courseId:course?.id,
        application:{
          some: {
            userId,
            status: 'Approved',
          },
        }
      },
    });


    if (!course) {
      return NextResponse.json({ lockedPhases:[], unlockedPhases:[] });
    }

    const userProgressCount = await db.userProgress.count({
      where: {
        userId
      },
    });

    const today = new Date(); 

    const phases = await db.phase.findMany({
      where: {
        isPublished: true,
        courseId: course.id
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

    const lockedPhases = [];
    const unlockedPhases = [];

    let cumulativeChapterCount = 0;
    for (const phase of phases) {
      const chapterCount = await db.chapter.count({
        where: {
          module: {
            phaseId: phase.id
          }
        }
      });

      const application = await db.applications.findFirst({
        where: {
          userId,
          batchId: batch?.id
        },
        select: {
          createdAt: true
        }
      });

      if (!application) {
        return new NextResponse("Application not found", { status: 404 });
      }

      const daysSinceApplication = differenceInDays(today, application.createdAt);

      if (userProgressCount >= cumulativeChapterCount + chapterCount || daysSinceApplication >= phase.timeLimit) {
        unlockedPhases.push(phase);
      } else {
        lockedPhases.push(phase);
      }

      cumulativeChapterCount += chapterCount;
    }

    return NextResponse.json({ lockedPhases, unlockedPhases });
  } catch (error) {
    console.log("[PHASE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
