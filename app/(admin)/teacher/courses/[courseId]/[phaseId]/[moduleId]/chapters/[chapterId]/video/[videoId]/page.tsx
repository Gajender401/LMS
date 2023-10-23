import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { VideoActions } from "./_components/video-actions";
import { VideoTitleForm } from "./_components/video-title-form";
import { ChapterVideoForm } from "./_components/video-form";
import { VideoDescriptionForm } from "./_components/video-description-form";

const VideoIdPage = async ({
  params
}: {
  params: { moduleId: string; chapterId: string, courseId: string, quizId: string, phaseId: string, videoId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const video = await db.video.findUnique({
    where: {
      id: params.quizId,
      chapterId: params.chapterId
    }
  });


  if (!video) {
    return redirect("/")
  }

  const isComplete = video.url ? false : true


  return (
    <>
      {!video.isPublished && (
        <Banner
          variant="warning"
          label="This Quiz is unpublished. It will not be visible in the chapter"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/${params.phaseId}/${params.moduleId}/chapters/${params.chapterId}`}
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
              <VideoActions
                disabled={!isComplete}
                courseId={params.courseId}
                phaseId={params.phaseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                videoId={params.videoId}
                isPublished={video.isPublished}
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
                  Customize your video
                </h2>
              </div>
              <VideoTitleForm
                initialData={video}
                courseId={params.courseId}
                phaseId={params.phaseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                videoId={params.videoId}
              />
              <VideoDescriptionForm
                initialData={video}
                courseId={params.courseId}
                phaseId={params.phaseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                videoId={params.videoId}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your video
                </h2>
              </div>
              <ChapterVideoForm
                initialData={video}
                courseId={params.courseId}
                phaseId={params.phaseId}
                moduleId={params.moduleId}
                chapterId={params.chapterId}
                videoId={params.videoId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoIdPage;