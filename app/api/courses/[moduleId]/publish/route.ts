import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const module = await db.module.findUnique({
      where: {
        id: params.moduleId,
      },
      include: {
        chapters: true
      }
    });

    if (!module) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedChapter = module.chapters.some((module) => module.isPublished);

    if (!module.title ||  !hasPublishedChapter) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedModule = await db.course.update({
      where: {
        id: params.moduleId,
        userId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedModule);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}