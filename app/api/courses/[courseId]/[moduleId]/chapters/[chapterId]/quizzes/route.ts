import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const lastQuiz = await db.quiz.findFirst({
      where: {
        chapterId: params.chapterId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastQuiz ? lastQuiz.position + 1 : 1;

    const quiz = await db.quiz.create({
      data: {
        title,
        chapterId: params.chapterId,
        position: newPosition,
      }
    });

    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}