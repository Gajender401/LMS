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


    const application = await db.applications.findFirst({
      where: {
        userId,
        NOT:{
            status:'Approve'
        } 
      }
    });


    return NextResponse.json(application);
  } catch (error) {
    console.log("[Request get]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}
