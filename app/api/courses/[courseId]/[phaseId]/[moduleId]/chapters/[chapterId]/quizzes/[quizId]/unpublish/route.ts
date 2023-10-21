import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { chapterId: string, quizId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedQuiz = await db.quiz.update({
      where: {
        id: params.chapterId,
        chapterId: params.quizId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedQuiz);
  } catch (error) {
    console.log("[Quiz_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}