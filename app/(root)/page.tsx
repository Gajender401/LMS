'use client'
import { useAuth } from "@clerk/nextjs";
import { Category, Chapter, Course } from "@prisma/client";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { useEffect, useState } from "react";

import { Navbar } from "../(dashboard)/_components/navbar";
import { Sidebar } from "../(dashboard)/_components/sidebar";

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserContext } from "@/hooks/context";


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

  const { redirectUrl, setRedirectUrl } = useUserContext()

  if (redirectUrl && redirectState) {
    console.log(redirectUrl);

    router.replace(redirectUrl)
  }


  useEffect(() => {
    // Fetch courses when the component mounts
    async function fetchCourses() {
      const response = await axios.get("/api/getcourses");
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
    setRedirectUrl(`/${id}/apply`)
    router.push('/sign-in');
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
    );
  }

  return (
    <div className="h-full bg-[#f3f6fd] ">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-20 items-center flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-20 md:pb-10 flex items-center flex-row pb-5 pt-[80px] h-full">
        <div className="grid bg-white p-8 w-[68%] rounded-[35px] h-full grid-cols-1 sm:grid-cols-2 gap-4">
          <h2 className="text-[25px] font-semibold" >My jurney</h2>
        </div>
        <div className=" bg-white p-8 w-[28%] mx-[2%] rounded-[40px] h-full flex flex-col items-center gap-4">
        <h2 className="text-[25px] font-medium" >Updates</h2>
        </div>
      </main>
    </div>

  )
}
