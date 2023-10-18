import { Check } from 'lucide-react'
import React from 'react'

interface InfoCardProps {
  text: string;
}
const InfoCard: React.FC<InfoCardProps> = ({ text }) => {
  return (
    <div className='w-full border bg-[#fffaff] rounded-xl p-4 flex items-center justify-between' >
        <p>{text}</p>
        <span className='bg-green-600 rounded-full p-0.5 ' >
            <Check className='text-white' />
        </span>
    </div>
  )
}

export default InfoCard