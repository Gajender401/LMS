import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export async function POST(
    req: Request
) {
    try {
        const user = await currentUser();
        const { userId } = auth();

        if (!user || !user.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!userId || !user.firstName) {
            return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
        }




        const { result, requestId } = await req.json()


        if (result) {
            await db.applications.update({
                where: {
                    id: requestId
                },
                data: {
                    status: 'approved'
                }
            })

        } else {
            await db.applications.update({
                where: {
                    id: requestId
                },
                data: {
                    status: 'rejected'
                }
            })
        }


        return new NextResponse("done", { status: 200 });
    } catch (error) {
        console.log("[Sending email]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}
