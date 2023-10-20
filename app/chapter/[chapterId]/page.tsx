'use client'
import { Navbar } from '@/app/(dashboard)/_components/navbar'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import dynamic from 'next/dynamic'
 
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

function Page() {
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