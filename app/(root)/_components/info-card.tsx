import { Progress } from "@/components/ui/progress";

interface InfoCardProps {
  heading: string;
  date: string;
  progress: number;
  color: string;
  progressColor: string;
}

export const InfoCard = ({
  color,
  heading,
  date,
  progress,
  progressColor
}: InfoCardProps) => {
  return (
    <div className={` ${color} rounded-xl flex flex-row items-center justify-between gap-x-2 p-5`}>
      <div className="flex h-full flex-col justify-between items-start" >
      <h2 className="font-semibold text-xl text-gray-600" >
        {heading}
      </h2>
      <div className="text-gray-500" >
        {date}
      </div>
      </div>

      <div className="w-[80%] flex gap-2 flex-col" >
        <p className="font-medium " >Progress</p>
        <Progress value={progress} className="h-2" variant="custom1" />
        <p className="w-full flex justify-end items-center" >
        {progress}% 
        </p>
      </div>
    </div>
  )
}