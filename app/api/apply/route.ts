import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function POST(
  req: Request
) {
  try {
    const user = await currentUser();

    const { heard, curr_role, career, profession, public_profile, questions, courseId, email} = await req.json();

    if (!user || !user.id ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId
        }
      }
    });

    if (purchase) {
      return new NextResponse("Already Enrolled", { status: 400 });
    }


    const { userId } = auth();

    if (!userId || !user.firstName) {
      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }
    

    await db.applications.create({
      data : {
        userId: userId,
        name: user.firstName + " " + user.lastName,
        email: email,
        phone: String(user.phoneNumbers[0].phoneNumber),
        heard: heard,
        curr_role: curr_role,
        career: career,
        public_profile: public_profile,
        profession: profession,
        questions: questions,
        courseId: courseId,
        status: 'Pending'
      }
    });


    return new NextResponse("working", { status: 200 });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}