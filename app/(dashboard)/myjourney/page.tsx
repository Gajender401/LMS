'use client'
import InfoCard from "./_components/Info-card";
import { Progress } from "@/components/ui/progress";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AiFillLock } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

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

    const [phases, setPhases] = useState<Phase[]>([])
    const [module, setModule] = useState<Module>()
    const [lockedPhases, setLockedPhases] = useState<Phase[]>([])
    const [unlockedLockedPhases, setUnlockedLockedPhases] = useState<Phase[]>([])

    const router = useRouter()

    async function fetchCourse() {
        const phase = await axios.get('/api/getcourses/course/phases')
        console.log(phase.data);
        setPhases(phase.data)
    } 

    useEffect(() => {
        fetchCourse()
    }, [])


    return (

        <div className="flex bg-white p-8 w-full rounded-[35px] h-full flex-col ">
            <Sheet >
                <div className="overflow-y-scroll container_1" >
                    <h1 className="text-3xl font-semibold text-slate-800" >My Journey</h1>

                    <div className="p-5 my-5 bg-purple-100 space-y-5 rounded-[35px] h-[60%] overflow-y-auto " >
                        <div className="flex flex-row items-center text-slate-600  justify-between" >
                            <h2 className="text-xl  my-2 font-medium " >{phases[0]?.title}</h2>
                            <div className="flex flex-row items-center gap-5 " >
                                <Progress variant="custom2" className="w-56" value={48} />
                                <span>48%</span>
                            </div>
                        </div>

                        {phases[0]?.modules.map((item:Module)=> (
                            <SheetTrigger key={item.id} asChild >
                                <div onClick={()=> setModule(item)} >
                                    <InfoCard text={`Module ${item?.title}`} />
                                </div>
                            </SheetTrigger>
                        ))}
                    </div>

                    {['Growth Cycle', 'Job Cycle'].map(item => (
                        <div className="p-5 my-5 bg-gray-200 flex flex-row justify-between text-slate-600 items-center rounded-[35px] h-[20%] overflow-y-hidden " >
                            <h2 className="text-2xl font-medium " >{item}</h2>
                            <AiFillLock size={50} className="pb-2" />
                        </div>
                    ))}

                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                <h2>{module?.title}</h2>
                            </SheetTitle>
                            <SheetDescription className="p-2 space-y-2 " >
                                {module?.chapters.map((item: Chapter) => (
                                    <div key={item.id} onClick={() => router.replace(`chapter/${item.id}`)}
                                        className="border cursor-pointer text-slate-600 p-2 rounded-lg border-pink-200 bg-pink-50" >
                                        {item.title}
                                    </div>
                                ))}
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </div>


            </Sheet>
        </div>
    );
}

export default MyJourney;