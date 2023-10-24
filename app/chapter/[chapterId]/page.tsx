'use client'
import { Navbar } from '@/app/(dashboard)/_components/navbar'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import dynamic from 'next/dynamic'
import axios from 'axios'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

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

interface Quiz {
  chapterId: string;
  createdAt: string;
  id: string;
  isPublished: boolean;
  position: number;
  title: string;
  updatedAt: string;
}

interface Video {
  chapterId: string;
  description: string;
  id: string;
  isPublished: boolean;
  position: number;
  title: string;
  url: string;
}

interface Chapter {
  createdAt: string;
  id: string;
  isFree: boolean;
  isPublished: boolean;
  moduleId: string;
  position: number;
  quizs: Quiz[]; 
  title: string;
  updatedAt: string;
  videos: Video[]; 
}

function Page(
  { params }: { params: { chapterId: string; } }
) {

  const [_module, setModule] = useState<Module>()
  const [selectedVideo, setSelectedVideo] = useState<Video>()

  async function fetchModule() {
    const moduleData = await axios.get(`/api/getcourses/course/phases/${params.chapterId}`)
    console.log(moduleData.data[0].chapters);
    setModule(moduleData.data[0])
  }

  useEffect(() => {
    fetchModule()
  }, [])
  
  return (
    <div className="h-full bg-[#f3f6fd]" >
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-64 flex-col pt-[80px] fixed inset-y-0 z-40">
        <div className="h-full flex flex-col overflow-y-auto bg-[#3f72e8]">
          {_module?.chapters?.map((chapter:Chapter) =>(
          <Accordion key={chapter.id} type="single" collapsible className="w-full text-white ">
            <AccordionItem value="item-1">
              <AccordionTrigger className='px-3' >{chapter.title}</AccordionTrigger>
              <AccordionContent className='pl-6' >
              {chapter.videos.map((video: Video)=>(
                <h2 key={video.id} onClick={()=>setSelectedVideo(video)} className='my-2 cursor-pointer' >{video.title}</h2>
              ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          ))}
        </div>
      </div>

      <main className="md:pl-64 flex items-center flex-row pt-[80px] h-full">
        <div className="flex bg-white p-8 w-full h-full items-center flex-col ">
          <div className='mt-10'>
          <ReactPlayer url={selectedVideo?.url} />
          </div>
          <div className='mt-32 w-1/2' >
            {selectedVideo?.description}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page