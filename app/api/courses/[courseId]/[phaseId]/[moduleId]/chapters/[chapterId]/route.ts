import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { moduleId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const ownCourse = await db.course.findUnique({
    //   where: {
    //     id: params.courseId,
    //     userId,
    //   }
    // });

    // if (!ownCourse) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        moduleId: params.moduleId,
      }
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }


    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId
      }
    });

    const publishedChaptersInModule = await db.chapter.findMany({
      where: {
        moduleId: params.moduleId,
        isPublished: true,
      }
    });

    if (!publishedChaptersInModule.length) {
      await db.module.update({
        where: {
          id: params.moduleId,
        },
        data: {
          isPublished: false,
        }
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { moduleId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        moduleId: params.moduleId,
      },
      data: {
        ...values,
      }
    });


    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}