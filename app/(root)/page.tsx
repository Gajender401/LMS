'use client'
import { useAuth } from "@clerk/nextjs";
import { Batch, Category, Chapter, Course } from "@prisma/client";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { useEffect, useState } from "react";


import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserContext } from "@/hooks/context";
import Loader from "@/components/loader";
import Dashbord from "@/components/dashbord";


interface CourseT {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  isPublished: boolean;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}


type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

export default function Dashboard() {
  const { userId } = useAuth();
  const [completedCourses, setCompletedCourses] = useState<CourseWithProgressWithCategory[]>([]);
  const [coursesInProgress, setCoursesInProgress] = useState<CourseWithProgressWithCategory[]>([]);
  const [courses, setCourses] = useState<CourseT[]>([]);
  const router = useRouter();
  const [redirectState, setredirectState] = useState(true)
  const date = new Date();
  const [batch, setBatch] = useState<Batch>()
  


  const { redirectUrl, setRedirectUrl } = useUserContext()


  if (redirectUrl && redirectState) {
    console.log(redirectUrl);

    router.replace(redirectUrl)
  }


  useEffect(() => {
    // Fetch courses when the component mounts
    async function fetchCourses() {
      const response = await axios.get("/api/getcourses");
      const res = await axios.post("/api/getcourses",{'courseId':response.data[0].id})
      
      setBatch(res.data)
      setCourses(response.data);
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    // Fetch user-specific data when userId changes
    async function fetchData() {
      if (userId) {
        const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);
        setCompletedCourses(completedCourses);
        setCoursesInProgress(coursesInProgress);
      }
    }
    fetchData();
  }, [userId]);

  const handleSubmit = (id: string) => {
    setredirectState(false)
    setRedirectUrl(`/${batch?.id}/apply`)
    router.push('/sign-up');
  }

  if (!userId) {
    return (
      <div className='w-full h-full flex items-center flex-col'>
        <nav className="flex space-x-10 p-2 items-center justify-between" >
          <p>Logo</p>
          <Button onClick={() => router.push('/sign-in')} >
            Login
          </Button>
        </nav>
        {courses &&
          <div className='space-y-10'>
            {courses.map(course => (
              <div className='flex flex-col justify-start items-start' key={course.id}>
                {course.imageUrl &&
                  <img src={course.imageUrl} alt='course' />
                }
                name : {course.title}
                <Button onClick={() => handleSubmit(course.id)} >
                  Enroll
                </Button>
              </div>
            ))}
          </div>
        }
      </div>

      // <>
      //   {/* Navbar Start */}
      //   <nav className="hidden md:block pt-4 pb-4">
      //     <div className="sign-up-navbar flex flex-row justify-between">
      //       <img
      //         src="/logo-nav.svg"
      //         alt=""
      //         className="logo-navbar"
      //       />

      //       <a
      //         onClick={() => router.push('/sign-in')}
      //         className="nav-btn cursor-pointer flex flex-row justify-center text-center text-white items-center pl-2 pr-2 pt-2 pb-2"
      //       >
      //         Log in{" "}
      //         <img
      //           src="/right-arrow .png"
      //           alt=""
      //           width="14px"
      //           className="ml-1"
      //         />
      //       </a>
      //     </div>
      //   </nav>
      //   <hr></hr>
      //   <nav className="md:hidden pt-4 pb-4 pl-2 pr-2">
      //     <div className="flex flex-row justify-between">
      //       <img
      //         src="/logo-nav.svg"
      //         alt=""
      //         className="logo-navbar"
      //       />

      //       <a
      //         href=""
      //         className="nav-btn flex flex-row justify-center text-center text-sm text-white items-center pl-2 pr-2 pt-2 pb-2"
      //       >
      //         Log in{" "}
      //         <img
      //           src="/right-arrow .png"
      //           alt=""
      //           width="12px"
      //           className="ml-1"
      //         />
      //       </a>
      //     </div>
      //   </nav>
      //   <hr></hr>
      //   {/* Navbar End */}

      //   {/* Course Start */}
      //   <section className="container mx-auto pb-20 pl-2 pr-2">
      //     <div className="course-details mt-10 md:mt-20 pt-4 pb-4 flex flex-col md:flex-row items-center justify-between">
      //       <div className="c-left-side text-center md:text-left md:w-1/2 flex flex-row">
      //         <div>
      //           <span className="text-sm md:text-md lg:text-lg">
      //             Hey there, you're applying for
      //           </span>
      //           <div className="mt-2">
      //             <h1 className="text-lg md:text-2xl lg:text-3xl font-bold course-heading">
      //               Full Stack Development
      //             </h1>
      //             <p className="text-md md:text-xl font-semibold course-highlight">
      //               Career booster
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="c-right-side w-full md:w-1/2 flex flex-row justify-center md:justify-around">
      //         <div className="pt-4 pb-4 pr-2 pl-1 lg:pl-2 lg:pr-2 lg:pt-10 lg:pb-10">
      //           <span className="text-xs lg:text-sm">Program duration</span>
      //           <h1 className="text-sm md:text-lg lg:text-xl course-heading font-semibold">
      //             9 <small className="">Months</small>
      //           </h1>
      //         </div>
      //         <div className="pt-4 pb-4 pl-2 pr-1 lg:pl-2 lg:pr-2 lg:pt-10 lg:pb-10">
      //           <span className="text-xs lg:text-sm">Time commitment</span>
      //           <h1 className="text-sm md:text-lg lg:text-xl course-heading font-semibold">
      //             10-12 <small className="">hrs/week</small>
      //           </h1>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="course-details1 mt-5 pt-4 pb-4 flex flex-col md:flex md:flex-row md:items-center justify-center md:justify-between">
      //       <div className="c-left-side1 w-full text-center md:text-left md:w-1/2 flex flex-row">
      //         <div>
      //           <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
      //             Only 15% applicants make it our cohort
      //           </h1>
      //           <p className="mt-2 lg:mt-4 text-xs md:text-sm font-normal course-highlight1">
      //             Give us your stellar responses to these questions, and we'll
      //             determine if this programis your perfect fit.
      //           </p>
      //         </div>
      //       </div>
      //       <div className="c-right-side1 mt-4 flex flex-row mx-auto">
      //         <a
      //           href=""
      //           className="flex flex-row md:flex-row justify-center shadow-lg items-center text-sm md:text-md lg:text-lg course-btn lg:pl-4 lg:pr-4 xl:pl-10 xl:pr-10"
      //         >
      //           Let's go{" "}
      //           <img
      //             src="/right-arrow (2).png"
      //             alt=""
      //             width="14px"
      //             className="ml-2"
      //           />
      //         </a>
      //       </div>
      //     </div>
      //     <section className="hidden md:block">
      //       <div className="course-details2 mt-5 pt-8 pb-8 lg:pt-20 lg:pb-20 flex flex-col md:flex md:flex-col items-center justify-around">
      //         <div className="container1 mt-2 mb-2 lg:mb-4">
      //           <div className="steps">
      //             <span className="circle"></span>
      //             <span className="circle"></span>
      //             <span className="circle"></span>
      //             <div className="progress-bar-apply">
      //               <span className="indicator"></span>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="flex flex-row">
      //           <div className="text-left md:text-center flex flex-col justify-center md:items-center mt-4 md:mt-0 md:mr-1 md:ml-1 lg:mr-2 lg:ml-2">
      //             <h1 className="text-white text-sm md:text-lg">
      //               Submit application
      //             </h1>
      //             <p className="text-xs w-full lg:w-2/3 md:text-sm text-left md:text-center course-select-highlight mt-2">
      //               We follow application process to carefully curate our learning
      //               community.
      //             </p>
      //           </div>
      //           <div className="text-left md:text-center flex flex-col justify-center md:items-center mt-4 md:mt-0 md:mr-1 md:ml-1 lg:mr-2 lg:ml-2">
      //             <h1 className="text-white text-sm md:text-lg">Get selected</h1>

      //             <p className="text-xs w-full lg:w-2/3 md:text-sm text-left md:text-center course-select-highlight mt-2">
      //               Upon confirmation of your acceptance, make the necessary
      //               payment to secure your spot.
      //             </p>
      //           </div>
      //           <div className="text-left md:text-center flex flex-col justify-center md:items-center mt-4 md:mt-0 md:mr-1 md:ml-1 lg:mr-2 lg:ml-2">
      //             <h1 className="text-white text-sm md:text-lg">
      //               Start your journey
      //             </h1>
      //             <p className="text-xs w-full lg:w-2/3 md:text-sm text-left md:text-center course-select-highlight mt-2">
      //               Congratulations, you're in! It's time to embark on your
      //               journey.
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //     </section>
      //     <section className="md:hidden">
      //       <div className="course-details2 mt-5 pt-4 pb-4 flex flex-col md:flex md:flex-row md:items-center justify-around">
      //         <div className="text-left md:text-center flex flex-row mt-4 md:mt-0 md:mr-1 md:ml-1 lg:mr-2 lg:ml-2">
      //           <div className="mr-2">
      //             <div className="course-select mt-2">
      //               <div className=""></div>
      //             </div>
      //           </div>
      //           <div>
      //             <h1 className="text-sm md:text-lg" id="mob-high-text">
      //               Submit application
      //             </h1>
      //             <p className="text-xs md:text-sm text-left md:text-center course-select-highlight mt-1">
      //               We follow application process to carefully curate our learning
      //               community.
      //             </p>
      //           </div>
      //         </div>
      //         <div className="text-left md:text-center flex flex-row mt-4 md:mt-0 md:mr-1 md:ml-1 lg:mr-2 lg:ml-2">
      //           <div className="mr-2">
      //             <div className="course-select1 mt-2">
      //               <div className="course-bar-mob"></div>
      //             </div>
      //           </div>
      //           <div>
      //             <h1 className="text-white text-sm md:text-lg">Get selected</h1>
      //             <p className="text-xs md:text-sm text-left md:text-center course-select-highlight mt-1">
      //               Upon confirmation of your acceptance, make the necessary
      //               payment to secure your spot.
      //             </p>
      //           </div>
      //         </div>
      //         <div className="text-left md:text-center flex flex-row mt-4 md:mt-0 md:mr-1 md:ml-1 lg:mr-2 lg:ml-2">
      //           <div className="mr-2">
      //             <div className="course-select1 mt-2">
      //               <div className="course-bar-mob one"></div>
      //             </div>
      //           </div>
      //           <div>
      //             <h1 className="text-white text-sm md:text-lg">
      //               Start your journey
      //             </h1>
      //             <p className="text-xs md:text-sm text-left md:text-center course-select-highlight mt-1">
      //               Congratulations, you're in! It's time to embark on your
      //               journey.
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //     </section>
      //   </section>
      //   {/* Course End */}
      // </>
    );
  }

  return (
    <Dashbord redirectUrl={redirectUrl} />
  )
}
