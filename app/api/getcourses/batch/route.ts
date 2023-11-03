import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
) {
  try {
    const { courseId } = await req.json();


    const batch = await db.batch.findFirst({
        where:{
            courseId
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 1
    });
    
    return NextResponse.json(batch);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}