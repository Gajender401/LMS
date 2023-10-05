'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { auth } from '@clerk/nextjs';


interface Course {
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

const Home = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    const user = auth()

    useEffect(() => {
        fetchCourses();
    }, []);

    async function fetchCourses() {
        const response = await axios.get("/api/getcourses");
        
        setCourses(response.data);
    }

    const handleSubmit = () => {
        if (!user) {
         
        } 
    }

    return (
        <div className='w-full h-full flex items-center justify-center ' >
            {courses &&
                <div className='space-y-10' >
                    {courses.map(course => (
                        <div className='flex flex-col justify-start items-start' >
                            {course.imageUrl &&
                                <img src={course.imageUrl} alt='course' />
                            }
                            name : {course.title}
                            <Button onClick={() =>handleSubmit()} >
                                Enroll
                            </Button>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Home;
