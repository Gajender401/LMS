import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const live = await db.live.create({
      data: {
        title,
        courseId: params.courseId,
        timing: '',
        url:''
      }
    });

    return NextResponse.json(live);
  } catch (error) {
    console.log("[LIVE_CLASS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}