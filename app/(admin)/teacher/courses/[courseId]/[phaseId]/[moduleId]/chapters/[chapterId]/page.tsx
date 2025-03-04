import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Video, FileQuestion } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterActions } from "./_components/chapter-actions";
import { QuizForm } from "./_components/quizzes-form";
import { VideoForm } from "./_components/video-form";

const ChapterIdPage = async ({
  params
}: {
  params: { moduleId: string; chapterId: string, courseId: string, phaseId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      moduleId: params.moduleId
    },
    include: {
      quizs: true,
      videos: true
    }
  });


  if (!chapter) {
    return redirect("/")
  }

  const requiredFields = [
    chapter.title,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/${params.phaseId}/${params.moduleId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to module setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Chapter Creation
                </h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                phaseId={params.phaseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your chapter
                </h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                phaseId={params.phaseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">
                Add a video
              </h2>
            </div>
            <VideoForm
              initialData={chapter}
              courseId={params.courseId}
              phaseId={params.phaseId}
              chapterId={params.chapterId}
              moduleId={params.moduleId}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={FileQuestion} />
              <h2 className="text-xl">
                Add Quizzes
              </h2>
            </div>
            <QuizForm
              initialData={chapter}
              courseId={params.courseId}
              phaseId={params.phaseId}
              chapterId={params.chapterId}
              moduleId={params.moduleId}
            />
          </div>
        </div>
      </div>
    </>
   );
}
 
export default ChapterIdPage;