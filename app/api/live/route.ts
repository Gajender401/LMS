import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function GET(
  req: Request
) {
  try {

    const { userId } = auth();

    if (!userId) {
      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }


    const courses = await db.course.findMany({
      where: {
        isPublished: true
      }
    });


    return NextResponse.json(courses);
  } catch (error) {
    console.log("[Request get]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}
