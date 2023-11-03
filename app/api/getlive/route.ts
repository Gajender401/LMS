import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function GET() {

  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const currentDateTime = new Date().toISOString();

    const batch = await db.batch.findFirst({
      where: {
        application: {
          some: {
            userId,
            status: 'Approved',
          },
        },
      }
    });    

    const live = await db.live.findMany({
      where: {
        batchId: batch?.id,
        timing: {
          gt: currentDateTime,
        },
        isPublished: true
      },
    });


    return NextResponse.json(live);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}