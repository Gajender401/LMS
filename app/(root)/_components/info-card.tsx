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
    <div className={`border bg-[${color}] rounded-3xl flex items-center gap-x-2 p-3`}>
      <div>
        Enroled on : {date}
      </div>
      <h2>
        {heading}
      </h2>
      <div>
        <Progress value={progress} className={`w-[90%] ${progressColor}`} />
        {progress}%
      </div>
    </div>
  )
}