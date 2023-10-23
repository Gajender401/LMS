import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { chapterId: string, videoId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedVideo = await db.video.update({
      where: {
        id: params.chapterId,
        chapterId: params.videoId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedVideo);
  } catch (error) {
    console.log("[Quiz_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}