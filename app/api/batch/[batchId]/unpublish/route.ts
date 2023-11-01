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

    const unpublishedBatch = await db.batch.update({
      where: {
        id: params.batchId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedBatch);
  } catch (error) {
    console.log("[BATCH_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}