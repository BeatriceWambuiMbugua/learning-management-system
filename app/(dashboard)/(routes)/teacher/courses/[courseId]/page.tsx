import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";


const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {

    const { userId } = await auth();

    const course = await prisma.course.findUnique({
        where: {
            id: params.courseId
        },
    })

    if (!course || !userId) {
        return redirect("/")
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    const completionText = `${completedFields}/${totalFields}`
    const progress = (completedFields / totalFields) * 100
    const isCompleted = progress === 100

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course SetUp
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields ({completionText})
                    </span>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <Button size={"icon"} variant={"secondary"} className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-700 hover:text-emerald-100">
                            <LuLayoutDashboard />
                        </Button>
                        <h2>
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm
                    initialData = {course}
                    courseId = {course.id}
                    />
                    <DescriptionForm
                    initialData = {course}
                    courseId = {course.id}
                    />
                </div>

            </div>
        </div>
    );
}

export default CourseIdPage;