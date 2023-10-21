import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string, phaseId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastModule = await db.module.findFirst({
      where: {
        phaseId: params.phaseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastModule ? lastModule.position + 1 : 1;

    const _module = await db.module.create({
      data: {
        title,
        phaseId: params.phaseId,
        position: newPosition,
      }
    });

    return NextResponse.json(_module);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}