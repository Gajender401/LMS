import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string, phaseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const phase = await db.phase.findUnique({
      where: {
        id: params.phaseId,
      },
    });

    if (!phase) {
      return new NextResponse("Not found", { status: 404 });
    }

    const unpublishedPhase = await db.phase.update({
      where: {
        id: params.phaseId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedPhase);
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}