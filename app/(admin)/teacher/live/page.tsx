'use client'
import { LayoutDashboard } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { LiveForm } from "./_components/live-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { CourseForm } from "./_components/course-form";
import { Course, Batch, Live } from "@prisma/client";
import { BatchForm } from "./_components/batch-form";

const LiveClassPage = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const [batch, setBatch] = useState<Batch[]>([])
    const [live, setLive] = useState<Live[]>([])
    const [batchId, setBatchId] = useState<string>()


    async function fetchCourses() {
        const res = await axios.get('/api/live')
        console.log(res.data);
        setCourses(res.data)
    }

    useEffect(() => {
        fetchCourses()
    }, [])


    return (
        <>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Course setup
                        </h1>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">
                                Customize your course
                            </h2>
                        </div>

                        <CourseForm
                            setBatch={setBatch}
                            options={Array.isArray(courses)
                                ? courses.map((course) => ({
                                    label: course.title,
                                    value: course.id,
                                }))
                                : []
                            }
                        />


                        {batch &&
                            <BatchForm
                                setLive={setLive}
                                setBatchId={setBatchId}
                                options={Array.isArray(batch)
                                    ? batch.map((batch) => ({
                                        label: batch.title,
                                        value: batch.id,
                                    }))
                                    : []
                                }
                            />
                        }


                    </div>
                    <div className="space-y-6">

                        <LiveForm
                            setLive={setLive}
                            initialData={live}
                            batchId={batchId}
                        />


                    </div>
                </div>
            </div>
        </>
    );
}

export default LiveClassPage;