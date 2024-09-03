"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import * as z from "zod";
import { Course } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoImageOutline } from "react-icons/io5";
import { toast } from "sonner";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";


interface ImageFormProps {
    initialData: Course
    courseId: string
}

const formSchema = z.object({
    imageUrl: z.string().min(2, { message: "Image is Required" }),
})
const ImageForm: React.FC<ImageFormProps> = ({ initialData, courseId }) => {
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Image Form", values)
        try {
            const response = await axios.patch(`/api/courses/${courseId}`, values)
            if (response.status === 200) {
                toast.success("Image updated successfully")
                toggleEdit()
                router.refresh()
            }
        } catch {
            toast.error("Something went wrong")

        }

    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                <h1>Course Image</h1>
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {(isEditing &&
                        <>Cancel</>)
                    }
                    {
                        (!isEditing && !initialData?.imageUrl
                            &&
                            <>
                                <CiCirclePlus className="mr-2" size={18} />
                                Add Image
                            </>
                        )
                    }
                    {(
                        !isEditing && initialData?.imageUrl &&

                        <>
                            <GoPencil className="h-4 w-4 mr-2" />
                            Edit Image
                        </>
                    )
                    }
                </Button>
            </div>
            {
                !isEditing && (
                    !initialData.imageUrl ? (
                        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                            <IoImageOutline className="h-10 w-10 text-slate-500" />
                        </div>
                    ) :
                        <div className="relative aspect-video mt-2">
                            <Image
                                alt="Upload"
                                fill
                                className="object-cover rounded-md"
                                src={initialData.imageUrl}
                            />
                        </div>
                )
            }
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint="courseImage"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({
                                        imageUrl: url
                                    })
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            16:9 aspest ratio recommended
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ImageForm;