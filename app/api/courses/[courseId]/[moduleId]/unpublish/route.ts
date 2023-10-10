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
    });

    if (!module) {
      return new NextResponse("Not found", { status: 404 });
    }

    const unpublishedModule = await db.module.update({
      where: {
        id: params.moduleId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedModule);
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}