import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const _module = await db.module.findUnique({
      where: {
        id: params.moduleId,
      },
      include: {
        chapters: true
      }
    });

    if (!_module) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedModule = await db.module.delete({
      where: {
        id: params.moduleId,
      },
    });

    return NextResponse.json(deletedModule);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { userId } = auth();
    const { moduleId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const _module = await db.module.update({
      where: {
        id: moduleId,
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(_module);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}