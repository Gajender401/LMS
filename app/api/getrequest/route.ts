import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function POST(
  req: Request
) {
  try {
    const user = await currentUser();

    const { requestId } = await req.json()


    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const { userId } = auth();

    if (!userId || !user.firstName) {
      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }


    const applications = await db.applications.findMany({
      where: {
        id: requestId
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    if (applications[0].status == 'Pending') {
      await db.applications.update({
        where: {
          id: requestId
        },
        data: {
          status: 'Visited'
        }
      });
    }


    return NextResponse.json(applications);
  } catch (error) {
    console.log("[Request get]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}
