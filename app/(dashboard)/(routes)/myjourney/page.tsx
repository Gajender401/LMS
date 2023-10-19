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


const MyJourney = () => {

    return (

        <div className="flex bg-white p-8 w-full rounded-[35px] h-full flex-col ">
            <Sheet>
                <h1 className="text-3xl font-semibold text-slate-800" >My Journey</h1>
                <div className="p-5 my-5  bg-purple-100 space-y-5 rounded-[35px] h-full overflow-y-auto " >
                    <div className="flex flex-row items-center text-slate-600  justify-between" >
                        <h2 className="text-xl  my-2 font-medium " >Fundamental Cycle</h2>
                        <div className="flex flex-row items-center gap-5 " >
                            <Progress variant="custom2" className="w-56" value={48} />
                            <span>48%</span>
                        </div>
                    </div>

                    {[1,2,3,4,5,6].map(item => (
                    <SheetTrigger asChild >
                        <div>
                        <InfoCard text={`Module ${item}`} />
                        </div>
                    </SheetTrigger>
                    ))}
                </div>

                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            <h2>Module name</h2>
                        </SheetTitle>
                        <SheetDescription className="p-2 space-y-2 " >
                            {[1, 2, 3, 4].map(item => (
                                <div className="border text-slate-600 p-2 rounded-lg border-pink-200 bg-pink-50" >
                                    chapter {item}
                                </div>
                            ))}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>

            </Sheet>
        </div>
    );
}

export default MyJourney;