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
      include: {
        modules: true
      }
    });

    if (!phase) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedModule = phase.modules.some((phase) => phase.isPublished);

    if (!phase.title || !phase.description|| !hasPublishedModule) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedPhase = await db.phase.update({
      where: {
        id: params.phaseId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedPhase);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}