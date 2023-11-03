import { db } from "@/lib/db";
import { Course, Applications, Batch } from "@prisma/client";

type PurchaseWithCourse = Applications & {
  batch: Batch & { course: Course };
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};
  
  purchases.forEach((purchase) => {
    const courseTitle = purchase.batch.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.batch.course.price || 0;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const applications = await db.applications.findMany({
      where: {
        batch: {
          course: {
            userId: userId
          }
        },
        status: 'Approved'
      },
      include: {
        batch: {
          include: {
            course: true
          }
        }
      }
    });

    const validApplications: PurchaseWithCourse[] = applications.map(app => ({
      ...app,
      batch: {
        ...app.batch,
        course: app.batch.course || {
          // Fill in default values for Course properties
          id: "",
          userId: "",
          title: "",
          description: null,
          imageUrl: null,
          price: null,
          isPublished: false,
          categoryId: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      },
    }));

    const groupedEarnings = groupByCourse(validApplications);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = validApplications.length;

    return {
      data,
      totalRevenue,
      totalSales,
    }
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    }
  }
}
