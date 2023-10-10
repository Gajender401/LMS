import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { moduleId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        moduleId: params.moduleId,
      },
      data: {
        isPublished: false,
      }
    });

    const publishedChaptersInModule = await db.chapter.findMany({
      where: {
        moduleId: params.moduleId,
        isPublished: true,
      }
    });

    if (!publishedChaptersInModule.length) {
      await db.course.update({
        where: {
          id: params.moduleId,
        },
        data: {
          isPublished: false,
        }
      });
    }

    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}