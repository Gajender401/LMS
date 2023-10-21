import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { quizId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const quiz = await db.quiz.findUnique({
      where: {
        id: params.quizId,
        chapterId: params.chapterId,
      }
    });


    if (!quiz || !quiz.title) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedQuiz = await db.quiz.update({
      where: {
        id: params.quizId,
        chapterId: params.chapterId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedQuiz);
  } catch (error) {
    console.log("[QUIZ_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}