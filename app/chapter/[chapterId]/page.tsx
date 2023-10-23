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

function Page(
  { params }: { params: { chapterId: string; } }
) {

  const [_module, setModule] = useState<Module>()
  const [selectedChapter, setSelectedChapter] = useState<Chapter>()

  async function fetchModule() {
    const _module = await axios.get(`/api/getcourses/course/phases/${params.chapterId}`)
    console.log(_module.data);
    setModule(_module.data)
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
          <Accordion type="single" collapsible className="w-full text-white ">
            <AccordionItem value="item-1">
              <AccordionTrigger className='px-3' >Chapter name</AccordionTrigger>
              <AccordionContent className='pl-6' >
                <h2 className='my-2 cursor-pointer' >Content 1</h2>
                <h2 className='my-2 cursor-pointer' >Content 2</h2>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <main className="md:pl-64 flex items-center flex-row pt-[80px] h-full">
        <div className="flex bg-white p-8 w-full h-full items-center flex-col ">
          <ReactPlayer url='https://www.youtube.com/watch?v=wWgIAphfn2U' />
        </div>
      </main>
    </div>
  )
}

export default Page