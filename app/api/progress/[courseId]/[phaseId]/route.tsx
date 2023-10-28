import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { phaseId: string } }
) {
  try {
    const { userId } = auth();
    const { phaseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch the phase from the database
    const phase = await db.phase.findUnique({
      where: { id: phaseId },
      include: {
        modules: {
          include: { chapters: true },
        },
      },
    });

    if (!phase) {
      return new NextResponse("Phase not found", { status: 404 });
    }

    const totalChapters = phase?.modules.reduce(
      (acc, module) => acc + module.chapters.length,
      0
    );

    // Fetch the number of completed chapters within the phase by the user
    const userProgress = await db.userProgress.findMany({
      where: {
        userId,
        chapter: {
          module: {
            phaseId,
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
    console.log("[PHASE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
