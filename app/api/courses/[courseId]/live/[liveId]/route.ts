import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
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
        id: params.courseId,
      }
    });

    if (!live) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedLive = await db.live.delete({
      where: {
        id: params.liveId,
      },
    });

    return NextResponse.json(deletedLive);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { liveId: string } }
) {
  try {
    const { userId } = auth();
    const { liveId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const live = await db.live.update({
      where: {
        id: liveId,
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(live);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}