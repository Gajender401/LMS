import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ArrowLeft, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import Link from "next/link";

const CourseIdPage = async ({
  params
}: {
  params: { moduleId: string, courseId: string, phaseId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const _module = await db.module.findUnique({
    where: {
      id: params.moduleId,
      phaseId: params.phaseId
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!_module) {
    return redirect("/");
  }

  const requiredFields = [
    _module.title,
    _module.chapters.some(chapter => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!_module.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
        <Link
              href={`/teacher/courses/${params.courseId}/${params.phaseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to phase setup
            </Link>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Module setup
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions 
            disabled={!isComplete}
            moduleId={params.moduleId}
            isPublished={_module.isPublished}
            phaseId={params.phaseId}
            courseId={params.courseId}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your module
              </h2>
            </div>
            <TitleForm
              initialData={_module}
              moduleId={_module.id}
              phaseId={params.phaseId}
              courseId={params.courseId}
            />

          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  Module chapters
                </h2>
              </div>
              <ChaptersForm
                initialData={_module}
                moduleId={_module.id}
                phaseId={params.phaseId}
                courseId={params.courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default CourseIdPage;