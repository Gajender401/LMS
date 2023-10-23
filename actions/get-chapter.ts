import { db } from "@/lib/db";
import { Quiz, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  moduleId: string;
  chapterId: string;
};

export const getChapter = async ({
  userId,
  courseId,
  moduleId,
  chapterId,
}: GetChapterProps) => {
  try {
    const applications = await db.applications.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        }
      }
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      }
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      }
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let quizes: Quiz[] = [];
    let nextChapter: Chapter | null = null;

    if (applications) {
      quizes = await db.quiz.findMany({
        where: {
          chapterId: chapterId
        }
      });
    }

    if (chapter.isFree || applications) {

      nextChapter = await db.chapter.findFirst({
        where: {
          moduleId: moduleId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          }
        },
        orderBy: {
          position: "asc",
        }
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        }
      }
    });

    return {
      chapter,
      course,
      quizes,
      nextChapter,
      userProgress,
      applications,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      quizes: [],
      nextChapter: null,
      userProgress: null,
      applications: null,
    }
  }
}