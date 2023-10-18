import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import InfoCard from "./_components/Info-card";
import { Progress } from "@/components/ui/progress";


const MyJourney = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }


    return (
        <div className="flex bg-white p-8 w-full rounded-[35px] h-full flex-col ">
            <h1 className="text-3xl font-semibold text-slate-800" >My Journey</h1>
            <div className="p-5 my-5  bg-purple-100 space-y-5 rounded-[35px] h-full overflow-y-auto " >
                <div className="flex flex-row items-center text-slate-600  justify-between" >
                    <h2 className="text-xl  my-2 font-medium " >Fundamental Cycle</h2>
                    <div className="flex flex-row items-center gap-5 " >
                        <Progress variant="custom2" className="w-56" value={48} />
                        <span>48%</span>
                    </div>
                </div  >
                <InfoCard text='Intro to HTML' />
                <InfoCard text='Intro to CSS'  />
                <InfoCard text='Intro to HTML' />
                <InfoCard text='Intro to CSS'  />                
                <InfoCard text='Intro to HTML' />
                <InfoCard text='Intro to CSS'  />
            </div>

        </div>
    );
}

export default MyJourney;