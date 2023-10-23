import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

// type CourseWithProgressWithCategory = Course & {
//   category: Category | null;
//   phase: { id: string }[];
//   progress: number | null;
// };

type GetCourses = {
  userId: string;
};

export const getCourses = async ({
  userId,
}: GetCourses) => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: true,
        phase: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
        applications: {
          where: {
            userId,
            status: 'Approved'
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    // const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
    //   courses.map(async course => {
    //     if (course.applications.length === 0) {
    //       return {
    //         ...course,
    //         progress: null,
    //       }
    //     }

    //     const progressPercentage = await getProgress(userId, course.id);

    //     return {
    //       ...course,
    //       progress: progressPercentage,
    //     };
    //   })
    // );

    return courses;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
}