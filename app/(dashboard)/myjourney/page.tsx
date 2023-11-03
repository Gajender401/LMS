'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import '@/styles/myjourney.css'

type Phase = {
    courseId: string;
    createdAt: string;
    description: string;
    id: string;
    isPublished: boolean;
    timeLimit: number;
    modules: Array<any>;
    position: number;
    title: string;
    updatedAt: string;
};

type Module = {
    chapters: Array<any>;
    createdAt: string;
    id: string;
    isPublished: boolean;
    phaseId: string;
    position: number;
    title: string;
    updatedAt: string;
};

type Chapter = {
    createdAt: string;
    description: string;
    id: string;
    isFree: boolean;
    isPublished: boolean;
    moduleId: string;
    position: number;
    title: string;
    updatedAt: string;
    videoUrl: string;
};

const MyJourney = () => {
    const [activeItem, setactiveItem] = useState('')
    const [lockedPhases, setLockedPhases] = useState<Phase[]>([])
    const [unlockedLockedPhases, setUnlockedLockedPhases] = useState<Phase[]>([])

    const router = useRouter()

    async function fetchCourse() {
        const phase = await axios.get('/api/getcourses/course/phases')
        console.log(phase.data);
        setUnlockedLockedPhases(phase.data['unlockedPhases'])
        setLockedPhases(phase.data['lockedPhases'])

    }

    useEffect(() => {
        fetchCourse()
    }, [])


    return (
        <div className="course-track-details pt-8 pl-2 pr-2 md:pl-4 md:pr-4 lg:pl-10 lg:pr-10 pb-8">
            <h1 className="text-2xl pl-6 lg:pl-0 md:text-2xl lg:text-3xl font-bold">
                My Journey
            </h1>

            <div className="course-track mt-8">

                {unlockedLockedPhases.map(phase => (
                    <div key={phase.id} style={activeItem?{backgroundColor:'#9360E3',color:'white',boxShadow:'7px 7px 1px #555555'}:{}} onClick={()=>setactiveItem(phase.id)} className='course-first-sect m-2 mb-6 flex flex-col justify-center pt-4'>
                        <input type="checkbox" id="courseSect1" name='course-first-sect' className="course-sect-1" />
                        <label htmlFor="courseSect1" className="pl-8 pb-4 pr-6 text-lg md:text-xl items-center">{phase.title}</label>
                        <div className="course-sect-show text-black p-2 md:p-0 flex flex-col justify-center">
                            <ul className="accordion w-full flex flex-col items-center">
                                {phase?.modules.map((_module: Module, index) => (
                                    <li key={_module.id} className="mb-6">
                                        <input
                                            type="checkbox"
                                            id="option1"
                                            name="accordion"
                                            className="radio"
                                        />
                                        <label htmlFor="option1" className="text-normal md:text-lg">
                                            <span>
                                                Module-{index}
                                                <strong className="ml-2 md:ml-4">
                                                    {_module.title}
                                                </strong>
                                            </span>
                                        </label>
                                        {_module?.chapters.map((chapter: Chapter) => (
                                            <div key={chapter.id} className="answer">
                                                <div className="module-content flex flex-col pl-2 pr-1 md:pl-4 pt-4 pb-4">
                                                    <a
                                                        onClick={() => router.replace(`chapter/${chapter.id}`)}
                                                        className="text-sm md:text-normal cursor-pointer flex flex-row items-center p-1"
                                                    >
                                                        <svg
                                                            width="20px"
                                                            height="20px"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M6 12H18M18 12L13 7M18 12L13 17"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                        </svg>
                                                        {chapter.title}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

                {lockedPhases.map(phase => (
                    <div key={phase.id} className="course-first-sect m-2 mb-6 flex flex-col justify-center pt-4">
                        <input type="checkbox" id="courseSect4" name='course-first-sect' className="course-sect-1" />
                        <label htmlFor="courseSect4" className="pl-8 pb-4 pr-6 text-lg md:text-xl items-center locked-course">{phase.title}</label>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default MyJourney;