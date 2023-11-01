import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { BatchForm } from "./_components/batch-form";

const BatchPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const batch = await db.batch.findMany({
        where: {
            status: 'active'
        }
    });

    if (!batch) {
        return redirect("/");
    }


    return (
        <>
            <div className="p-6">
                    <h1>Create a batch here</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                        <BatchForm
                            initialData={batch}
                        />
                </div>
            </div>
        </>
    );
}

export default BatchPage;