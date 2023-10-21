import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { chapterId: string, quizId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const ownCourse = await db.course.findUnique({
    //   where: {
    //     id: params.courseId,
    //     userId,
    //   }
    // });

    // if (!ownCourse) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const quiz = await db.quiz.findUnique({
      where: {
        id: params.quizId,
        chapterId: params.chapterId,
      }
    });

    if (!quiz) {
      return new NextResponse("Not Found", { status: 404 });
    }


    const deletedQuiz = await db.quiz.delete({
      where: {
        id: params.quizId
      }
    });


    return NextResponse.json(deletedQuiz);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { chapterId: string, quizId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const quiz = await db.quiz.update({
      where: {
        id: params.quizId,
        chapterId: params.chapterId,
      },
      data: {
        ...values,
      }
    });


    return NextResponse.json(quiz);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


// For questions

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const { ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const questions = await db.question.create({
      data: {
        ...values,
      }
    });


    return NextResponse.json(questions);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { questionId: string, quizId: string } }
) {
  try {
    const { userId } = auth();
    const { ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const questions = await db.question.update({
      where: {
        id: params.questionId,
        quizId: params.quizId,
      },
      data: {
        ...values,
      }
    });


    return NextResponse.json(questions);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}