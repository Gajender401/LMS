'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


interface Live {
    id: string;
    title: string;
    isPublished: boolean;
    timing: string;
    courseId: string;
    url: string;
  }

const Live = () => {

    const [data, setData] = useState<Live[]>([])
    const router = useRouter()

    async function fetchLink() {
        const res = await axios.get('/api/getlive')
        console.log(res.data);
        setData(res.data)
    }

    useEffect(() => {
        fetchLink()
    }, [])

    return (
        <div className="flex bg-white p-8 w-full rounded-[35px] h-full flex-col ">
            {data.map((item: Live)=>(
                <div key={item.id} className='bg-sky-200 text-sky-600 p-5 justify-between rounded-lg flex flex-row ' >
                    <div>
                    <h2 className='font-semibold' >{item.title}</h2>
                    <p>{item.timing}</p>
                    </div>
                    <Button onClick={()=>window.open(item.url)} >
                        Attend
                    </Button>
                </div>
            ))}
        </div>
    )
}

export default Live