import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { videoId: string; chapterId: string } }
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


    if (!video || !video.title) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedVideo = await db.video.update({
      where: {
        id: params.videoId,
        chapterId: params.chapterId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedVideo);
  } catch (error) {
    console.log("[QUIZ_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}