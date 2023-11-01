import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { batchId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const batch = await db.batch.findUnique({
      where: {
        id: params.batchId,
      }
    });

    if (!batch) {
      return new NextResponse("Not found", { status: 404 });
    }


    if (!batch.title || !batch.courseId || !batch.status) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedBatch = await db.batch.update({
      where: {
        id: params.batchId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedBatch);
  } catch (error) {
    console.log("[BATCH_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}