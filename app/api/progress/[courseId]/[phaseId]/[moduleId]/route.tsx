import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { userId } = auth();
    const { moduleId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the module from the database
    const _module = await db.module.findUnique({
      where: { id: moduleId },
      include: { chapters: true },
    });

    if (!_module) {
      return new NextResponse("Module not found", { status: 404 });
    }

    const totalChapters = _module?.chapters.length;

    // Fetch the number of completed chapters within the module by the user
    const userProgress = await db.userProgress.findMany({
      where: {
        userId,
        chapter: {
          moduleId,
        },
        isCompleted: true,
      },
    });

    const completedChapters = userProgress.length;

    // Calculate the progress percentage
    const progressPercentage = (completedChapters / (totalChapters || 1)) * 100;

    return NextResponse.json(progressPercentage);
  } catch (error) {
    console.log("[MODULE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
