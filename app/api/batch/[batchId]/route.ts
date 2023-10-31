import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
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

    const deletedBatch = await db.batch.delete({
      where: {
        id: params.batchId,
      },
    });

    return NextResponse.json(deletedBatch);
  } catch (error) {
    console.log("[BATCH_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { batchId: string } }
) {
  try {
    const { userId } = auth();
    const { batchId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const batch = await db.batch.update({
      where: {
        id: batchId,
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(batch);
  } catch (error) {
    console.log("[BATCH_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}