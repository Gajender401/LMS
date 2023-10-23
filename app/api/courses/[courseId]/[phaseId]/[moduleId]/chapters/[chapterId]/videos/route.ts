import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { title, url, description } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const lastVideo = await db.video.findFirst({
      where: {
        chapterId: params.chapterId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastVideo ? lastVideo.position + 1 : 1;

     const video = await db.video.create({
      data: {
        title,
        url,
        description,
        chapterId: params.chapterId,
        position: newPosition,
      }
    });

    return NextResponse.json(video);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}