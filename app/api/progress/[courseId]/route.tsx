import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
        where: { id: courseId },
        include: {
          phase: {
            include: {
              modules: {
                include: { chapters: true },
              },
            },
          },
        },
      });

      const totalChapters = course?.phase.reduce(
        (acc, phase) => acc + phase.modules.reduce((acc, module) => acc + module.chapters.length, 0),
        0
      );

      // Fetch the number of completed chapters by the user
      const userProgress = await db.userProgress.findMany({
        where: {
          userId,
          chapter: {
            module: {
              phase: {
                courseId,
              },
            },
          },
          isCompleted: true,
        },
      });

      const completedChapters = userProgress.length;

      // Calculate the progress percentage
      const progressPercentage = (completedChapters / (totalChapters || 1)) * 100;


    return NextResponse.json(progressPercentage);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}