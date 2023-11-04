'use client'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import dynamic from 'next/dynamic'
import axios from 'axios'
import '@/styles/chapter.css'
import { useRouter } from 'next/navigation'

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
  { params }: { params: { moduleId: string; } }
) {
  const [bgColor, setbgColor] = useState("");
  const [bgColorAfter, setbgColorAfter] = useState("");
  const [displayNotes, setdisplayNotes] = useState("");
  const [displayDoubts, setdisplayDoubts] = useState("");
  const bgChange = () => {
    setbgColor("#F3EEFF");
    setbgColorAfter("#fff");
    setdisplayNotes("none");
    setdisplayDoubts("block");
  };
  const bgColorChange = () => {
    setbgColor("#fff");
    setbgColorAfter("#f3eeff");
    setdisplayNotes("block");
    setdisplayDoubts("none");
  };

  const router = useRouter()

  const [_module, setModule] = useState<Module>()
  const [selectedVideo, setSelectedVideo] = useState<Video>()
  const [selectedChapter, setSelectedChapter] = useState<Chapter>()

  function findNextVideo(selectedChapter:Chapter, selectedVideo:Video) {
    if (!selectedChapter || !selectedVideo) {
      return null;
    }
  
    const currentVideoPosition = selectedVideo.position;
  
    const nextVideo = selectedChapter.videos.find(
      (video) => video.position === currentVideoPosition + 1
    );
  
    return nextVideo;
  }
  
  async function markCompleted(id:string|undefined) {
    const res = await axios.get(`/api/progress/user/${id}`)
  }

  async function fetchModule() {
    const moduleData = await axios.get(`/api/getcourses/course/phases/${params.moduleId}`)
    console.log(moduleData.data[0].chapters);
    setModule(moduleData.data[0])
  }

  useEffect(() => {
    fetchModule()
  }, [])

  return (
    <>
      <div className="upper-sect md:hidden relative pt-4 pb-4">
        <div className="relative mt-2">
          <input type="checkbox" id="btn1" hidden />
          <label
            htmlFor="btn1"
            className="total-course-label text-xl flex flex-row items-center justify-between"
          >
            <div className="flex flex-row items-center course-label pl-1 pr-2 pt-2 pb-2 z-10">
              <div>
                <img
                  src="/assets/images/Group 1410097012.png"
                  width="20px"
                  alt=""
                />
              </div>
              <div className="ml-2 text-normal font-bold text-white">Module - {_module?.position}</div>
            </div>
            <div className="text-sm font-bold mx-auto text-white">
              {_module?.title}
            </div>
          </label>
          <nav id="sidebar1">
            <ul className="list-items pl-6 pt-16 pr-4">
              {_module?.chapters?.map((chapter: Chapter) => (
                <Accordion key={chapter.id} type="single" collapsible className="w-full text-white ">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className='px-3' >{chapter.title}</AccordionTrigger>
                    <AccordionContent className='pl-6' >
                      {chapter.videos.map((video: Video) => (
                        <h2 key={video.id} onClick={() => { setSelectedVideo(video), setSelectedChapter(chapter) }} className='my-2 text-gray-200 hover:text-white transition duration-200 ease-in-out cursor-pointer' >{video.title}</h2>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </ul>
          </nav>
        </div>
      </div>


      <div className="right-side flex flex-row justify-between w-full">

        <div className="pt-4 pb-4 pl-4 pr-4 md:pt-8 md:pb-8 md:order-2 lg:order-1 md:pl-10 md:pr-10">
          <div className="flex flex-row">
            <h1 className="text-xl lg:text-2xl font-bold">
              {selectedVideo?.title}
            </h1>
          </div>
          <div className="mt-6">
            <ReactPlayer controls url={selectedVideo?.url} />
          </div>
          <div className="flex flex-row items-center justify-between mt-4">
            <div className="flex flex-row">
              <button
                className="pt-2 pb-2 pl-1 pr-1 text-xs video-down-btn-notes"
                style={{ background: bgColorAfter }}
                onClick={bgColorChange}
              >
                Take Notes
              </button>
              <button
                className="pt-2 pb-2 ml-4 pl-1 pr-1 text-xs video-down-btn"
                style={{ background: bgColor }}
                onClick={bgChange}
              >
                Ask Doubts
              </button>
            </div>
            <div>
              {selectedChapter && selectedVideo && findNextVideo(selectedChapter, selectedVideo)
                ?
                <button onClick={()=>router.replace(`chapter/${findNextVideo(selectedChapter, selectedVideo)}`)} className="pt-1 pb-1 pl-2 pr-2 text-xs items-center flex flex-row video-down-btn1">
                  Next Video
                </button>
                :
                <button onClick={()=>markCompleted(selectedChapter?.id)} className="pt-1 pb-1 pl-2 pr-2 text-xs items-center flex flex-row video-down-btn1">
                  <input type="checkbox" className="rounded-full mr-1" />
                  Mark as Completed
                </button>
              }
            </div>
          </div>
          <div className="video-down-sect" style={{ display: displayNotes }}>
            <div className="flex flex-row">
              <img src="/assets/images/bold.png" alt="" />
              <img src="/assets/images/italic.png" alt="" />
              <img src="/assets/images/underline.png" alt="" />
              <img src="/assets/images/dol.png" alt="" />
              <img src="/assets/images/rows.png" alt="" />
              <img src="/assets/images/align.png" alt="" />
              <img src="/assets/images/link.png" alt="" />
              <img src="/assets/images/img.png" alt="" />
            </div>
            <hr />
            <textarea
              name=""
              id="takeNotes"
              className="w-full h-20 border-0 focus:outline-none focus:ring-0 p-1"
            ></textarea>
          </div>
          <div
            className="video-down-sect1"
            style={{ display: displayDoubts }}
          >
            <div className="p-1">
              <h1 className="text-xs doubts-text">Title</h1>
              <input
                type="text"
                className="w-full h-6 border rounded-md focus:outline-none focus:ring-0 p-1"
              />
            </div>
            <div className="p-1">
              <div>
                <h1 className="text-xs doubts-text">Description</h1>
              </div>
              <div className="border rounded-md">
                <div className="flex flex-row">
                  <img src="src\assets\images\bold.png" alt="" />
                  <img src="src\assets\images\italic.png" alt="" />
                  <img src="src\assets\images\underline.png" alt="" />
                  <img src="src\assets\images\dol.png" alt="" />
                  <img src="src\assets\images\rows.png" alt="" />
                  <img src="src\assets\images\align.png" alt="" />
                  <img src="src\assets\images\link.png" alt="" />
                  <img src="src\assets\images\img.png" alt="" />
                </div>
                <hr />
                <textarea
                  name=""
                  id="takeNotes"
                  className="w-full h-8 border-0 focus:outline-none focus:ring-0 pl-1"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side-inner hidden md:flex md:order-1 lg:order-2 md:w-1/2 lg:w-1/2 xl:w-1/4">
          <div className="pl-4 w-[-webkit-fill-available] mt-4 pr-4" >
            <div className="mt-8 mb-8">
              <a
                href=""
                className="flex flex-row items-center text-gray-200 hover:text-white active:text-white transition duration-200 ease-in-out"
              >
                <span className="font-bold ml-2 text-xl">{_module?.title}</span>
              </a>
            </div>

            {_module?.chapters?.map((chapter: Chapter) => (
              <Accordion key={chapter.id} type="single" collapsible className="w-full text-white " >
                <AccordionItem className='w-full' value="item-1">
                  <AccordionTrigger className=' text-gray-200 w-full hover:text-white transition duration-200 ease-in-out font-medium ml-2 text-sm' >{chapter.title}</AccordionTrigger>
                  <AccordionContent className='pl-6' >
                    {chapter.videos.map((video: Video) => (
                      <h2 key={video.id} onClick={() => setSelectedVideo(video)} className='my-2 text-gray-200 hover:text-white transition duration-200 ease-in-out cursor-pointer' >{video.title}</h2>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}

export default Page