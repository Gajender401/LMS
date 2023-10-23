import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ArrowLeft, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { Actions } from "./_components/actions";
import { ModulesForm } from "./_components/modules-form";
import Link from "next/link";
import { LimitForm } from "./_components/limit-form";

const CourseIdPage = async ({
    params
}: {
    params: { courseId: string, phaseId: string }
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const phase = await db.phase.findUnique({
        where: {
            id: params.phaseId,
        },
        include: {
            modules: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    });


    if (!phase) {
        return redirect("/");
    }


    const requiredFields = [
        phase.title,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!phase.isPublished && (
                <Banner
                    label="This course is unpublished. It will not be visible to the students."
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <Link
                        href={`/teacher/courses/${params.courseId}`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to course setup
                    </Link>
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Phase setup
                        </h1>
                        <span className="text-sm text-slate-700">
                            Complete all fields {completionText}
                        </span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        courseId={params.courseId}
                        phaseId={params.phaseId}
                        isPublished={phase.isPublished}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">
                                Customize your phase
                            </h2>
                        </div>
                        <TitleForm
                            initialData={phase}
                            courseId={params.courseId}
                            phaseId={params.phaseId}
                        />
                        <DescriptionForm
                            initialData={phase}
                            courseId={params.courseId}
                            phaseId={params.phaseId}
                        />
                        <LimitForm
                            initialData={phase}
                            courseId={params.courseId}
                            phaseId={params.phaseId}
                        />
                    </div>
                    <div className="space-y-6">

                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks} />
                                <h2 className="text-xl">
                                    Phase modules
                                </h2>
                            </div>
                            <ModulesForm
                                initialData={phase}
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