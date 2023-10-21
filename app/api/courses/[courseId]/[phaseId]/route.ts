import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string, phaseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const phase = await db.phase.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        modules: {
          include: {
            chapters : true
          }
        }
      }
    });

    if (!phase) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedPhase = await db.phase.delete({
      where: {
        id: params.phaseId,
      },
    });

    return NextResponse.json(deletedPhase);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { phaseId: string } }
) {
  try {
    const { userId } = auth();
    const { phaseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const phase = await db.phase.update({
      where: {
        id: phaseId,
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(phase);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}