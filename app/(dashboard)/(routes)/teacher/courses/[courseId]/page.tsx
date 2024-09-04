import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LuLayoutDashboard, LuListChecks } from "react-icons/lu";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-upload";
import CategoryForm from "./_components/category-form";
import { AiOutlineDollar } from "react-icons/ai";
import PriceForm from "./_components/price-form";
import { FaRegFile } from "react-icons/fa";
import AttachmentForm from "./_components/attachment-form";


const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {

    const { userId } = await auth();

    const course = await prisma.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            attachments: {
                orderBy:{
                    createdAt: "desc"
                }
            }
        }
    })

    const categories = await prisma.category.findMany({
        orderBy: {
            name: "asc"
        }
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
                            <LuLayoutDashboard size={20} />
                        </Button>
                        <h2 className="text-base font-medium">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <ImageForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <CategoryForm
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => (
                            { label: category.name, value: category.id }
                        ))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <Button size={"icon"} className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-700 hover:text-emerald-100">
                                <LuListChecks size={20} />
                            </Button>
                            <h2 className="text-base font-medium">
                                Customize your Chapters
                            </h2>
                        </div>
                        <div>
                            TODO: Chapters
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <Button size={"icon"} className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-700 hover:text-emerald-100">
                                <AiOutlineDollar size={20} />
                            </Button>
                            <h2 className="text-base font-medium">
                                Sell Your Course
                            </h2>
                        </div>
                        <PriceForm
                        initialData={course}
                        courseId={course.id}
                        />
                    </div>
                    <div>
                         <div className="flex items-center gap-x-2">
                            <Button size={"icon"} className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-700 hover:text-emerald-100">
                                <FaRegFile size={20} />
                            </Button>
                            <h2 className="text-base font-medium">
                                Resources and Attachments
                            </h2>
                        </div>
                         <AttachmentForm
                        initialData={course}
                        courseId={course.id}
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseIdPage;