import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string, liveId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const live = await db.live.findUnique({
      where: {
        id: params.liveId,
      }
    });

    if (!live) {
      return new NextResponse("Not found", { status: 404 });
    }


    if (!live.title || live.timing==='') {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedlive = await db.live.update({
      where: {
        id: params.liveId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedlive);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}