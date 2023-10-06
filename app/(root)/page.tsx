'use client'
import { useAuth } from "@clerk/nextjs";
import { Category, Chapter, Course } from "@prisma/client";
import { CheckCircle, Clock } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { useEffect, useState } from "react";

import { Navbar } from "../(dashboard)/_components/navbar";
import { Sidebar } from "../(dashboard)/_components/sidebar";

import { Button } from '@/components/ui/button';
import axios from 'axios';
import {useRouter } from 'next/navigation';
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

  const {redirectUrl, setRedirectUrl } = useUserContext()

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

  const handleSubmit = (id:string) => {
    setredirectState(false)
    setRedirectUrl(`/${id}/apply`)
    router.push('/sign-in');
  }

  if (!userId) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <nav className="flex p-2 items-center justify-between" >
          <p>Logo</p>
          <Button onClick={()=>router.push('/sign-in')} >
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
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            icon={Clock}
            label="In Progress"
            numberOfItems={coursesInProgress.length}
          />
          <InfoCard
            icon={CheckCircle}
            label="Completed"
            numberOfItems={completedCourses.length}
            variant="success"
          />
        </div>
        <CoursesList
          items={[...coursesInProgress, ...completedCourses]}
        />
      </main>
    </div>

  )
}
