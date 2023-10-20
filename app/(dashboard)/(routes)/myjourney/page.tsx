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
import { useState } from "react";


const MyJourney = () => {

    const [phases, setPhases] = useState()

    const router = useRouter()

    return (

        <div className="flex bg-white p-8 w-full rounded-[35px] h-full flex-col ">
            <Sheet >
                <div className="overflow-y-scroll container_1" >
                    <h1 className="text-3xl font-semibold text-slate-800" >My Journey</h1>

                    <div className="p-5 my-5 bg-purple-100 space-y-5 rounded-[35px] h-[60%] overflow-y-auto " >
                        <div className="flex flex-row items-center text-slate-600  justify-between" >
                            <h2 className="text-xl  my-2 font-medium " >Fundamental Cycle</h2>
                            <div className="flex flex-row items-center gap-5 " >
                                <Progress variant="custom2" className="w-56" value={48} />
                                <span>48%</span>
                            </div>
                        </div>

                        {[1, 2, 3, 4, 5, 6].map(item => (
                            <SheetTrigger asChild >
                                <div>
                                    <InfoCard text={`Module ${item}`} />
                                </div>
                            </SheetTrigger>
                        ))}
                    </div>

                    {['Growth Cycle','Job Cycle'].map(item=>(
                    <div className="p-5 my-5 bg-gray-200 flex flex-row justify-between text-slate-600 items-center rounded-[35px] h-[20%] overflow-y-hidden " >
                        <h2 className="text-2xl font-medium " >{item}</h2>
                        <AiFillLock size={50} className="pb-2" />
                    </div>
                    ))}

                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                <h2>Module name</h2>
                            </SheetTitle>
                            <SheetDescription className="p-2 space-y-2 " >
                                {[1, 2, 3, 4].map(item => (
                                    <div onClick={() => router.replace(`chapter/${item}`)}
                                        className="border cursor-pointer text-slate-600 p-2 rounded-lg border-pink-200 bg-pink-50" >
                                        chapter {item}
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