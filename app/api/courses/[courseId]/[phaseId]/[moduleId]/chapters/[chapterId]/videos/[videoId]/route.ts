import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { chapterId: string, videoId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const video = await db.video.findUnique({
      where: {
        id: params.videoId,
        chapterId: params.chapterId,
      }
    });

    if (!video) {
      return new NextResponse("Not Found", { status: 404 });
    }


    const deletedVideo = await db.quiz.delete({
      where: {
        id: params.videoId
      }
    });


    return NextResponse.json(deletedVideo);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { chapterId: string, videoId: string } }
) { 
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const video = await db.video.update({
      where: {
        id: params.videoId,
        chapterId: params.chapterId,
      },
      data: {
        ...values,
      }
    });


    return NextResponse.json(video);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
