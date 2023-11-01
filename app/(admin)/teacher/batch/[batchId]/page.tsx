import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ArrowLeft, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { Actions } from "./_components/actions";
import Link from "next/link";
import { StatusForm } from "./_components/status-form";
import { DateForm } from "./_components/date-form";
import { CourseForm } from "./_components/course-form";

const BatchIdPage = async ({
    params
}: {
    params: { batchId: string }
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const batch = await db.batch.findUnique({
        where: {
            id: params.batchId,
        }
    });

    const courses = await db.course.findMany({
        where: {
            isPublished: true
        }
    });



    if (!batch) {
        return redirect("/");
    }


    const requiredFields = [
        batch.title,
        batch.courseId,
        batch.status,
        batch.enrollmentDate
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!batch.isPublished && (
                <Banner
                    label="This batch is unpublished. It will not be visible to the students."
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <Link
                        href={`/teacher/batch`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to batch setup
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
                        batchId={params.batchId}
                        isPublished={batch.isPublished}
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
                            initialData={batch}
                            batchId={params.batchId}
                        />
                        <StatusForm
                            initialData={batch}
                            batchId={batch.id}
                            options={[
                                {
                                    label: 'active',
                                    value: 'active',
                                },
                                {
                                    label: 'closed',
                                    value: 'closed',
                                },
                            ]}
                        />

                        <CourseForm
                            initialData={batch}
                            batchId={batch.id}
                            options={courses.map((course) => ({
                                label: course.title,
                                value: course.id,
                            }))}
                        />

                    </div>
                    <div className="space-y-6">

                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks} />
                                <h2 className="text-xl">
                                Enrollment Date {`(Till)`}
                                </h2>
                            </div>
                            <DateForm
                                initialData={batch}
                                batchId={params.batchId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BatchIdPage;