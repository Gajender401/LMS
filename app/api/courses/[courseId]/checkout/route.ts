import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log(params);
    

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      }
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId
        }
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }


    const { userId } = auth();

    if (!userId || !params.courseId || !user.firstName) {
      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }

    await db.requests.create({
      data : {
        userId: userId,
        name: user.firstName,
        courseId: params.courseId,
        status: 'Pending'
      }
    });


    return new NextResponse("working", { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}