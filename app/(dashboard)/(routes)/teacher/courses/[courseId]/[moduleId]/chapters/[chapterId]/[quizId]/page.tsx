import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { QuizActions } from "./_components/quiz-actions";
import { QuizTitleForm } from "./_components/quiz-title-form";
import { QuizQuestionForm } from "./_components/quiz-question-form";

const QuizIdPage = async ({
  params
}: {
  params: { moduleId: string; chapterId: string, courseId: string, quizId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const quiz = await db.quiz.findUnique({
    where: {
      id: params.quizId,
      chapterId: params.chapterId
    },
    include: {
      questions: true
    }
  });

  const questions = await db.question.findMany({
    where: {
      quizId: params.quizId
    }
  });


  if (!quiz) {
    return redirect("/")
  }

  const isComplete = questions.length === 0 ? false : true


  return (
    <>
      {!quiz.isPublished && (
        <Banner
          variant="warning"
          label="This Quiz is unpublished. It will not be visible in the chapter"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/${params.moduleId}/chapters/${params.chapterId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Chapter setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Quiz Creation
                </h1>
              </div>
              <QuizActions
                disabled={!isComplete}
                courseId={params.courseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                quizId={params.quizId}
                isPublished={quiz.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1  gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your Quiz
                </h2>
              </div>
              <QuizTitleForm
                initialData={quiz}
                courseId={params.courseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                quizId={params.quizId}
              />
            </div>
          </div>
          <div className="space-y-4">
            {questions.map(item=>(
              <div>
                {item.question}
              </div>
            ))}
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your Quiz
                </h2>
              </div>
              <QuizQuestionForm
                initialData={quiz}
                courseId={params.courseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                quizId={params.quizId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizIdPage;