import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { batchId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    await db.live.create({
      data: {
        title,
        batchId: params.batchId,
        timing: '',
        url:''
      }
    });

    const liveClases = await db.live.findMany({
      where:{
        batchId: params.batchId
      }
    });

    return NextResponse.json(liveClases);
  } catch (error) {
    console.log("[LIVE_CLASS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}