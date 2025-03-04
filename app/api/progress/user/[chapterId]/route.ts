import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { chapterId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProgress = await db.userProgress.create({
        data: {
          userId,
          chapterId,
          isCompleted:true
        }
      });


    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[MODULE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
