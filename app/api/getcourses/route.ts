import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
) {
  try {

    const courses = await db.course.findMany({
        orderBy: {
            createdAt: "desc",
        }
    });
    console.log(courses);
    
    return NextResponse.json(courses);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}