import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ArrowLeft, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { Actions } from "./_components/actions";
import Link from "next/link";
import { DateForm } from "./_components/date-form";
import { UrlForm } from "./_components/url-form";

const CourseIdPage = async ({
    params
}: {
    params: { batchId: string, liveId: string }
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const live = await db.live.findUnique({
        where: {
            id: params.liveId,
        },
        include: {
        },
    });


    if (!live) {
        return redirect("/");
    }


    const requiredFields = [
        live.title,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            {!live.isPublished && (
                <Banner
                    label="This course is unpublished. It will not be visible to the students."
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <Link
                        href={`/teacher/live`}
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
                        batchId={params.batchId}
                        liveId={params.liveId}
                        isPublished={live.isPublished}
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
                            initialData={live}
                            batchId={params.batchId}
                            liveId={params.liveId}
                        />
                        <UrlForm
                            initialData={live}
                            batchId={params.batchId}
                            liveId={params.liveId}
                        />
                        <DateForm
                            initialData={live}
                            batchId={params.batchId}
                            liveId={params.liveId}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseIdPage;