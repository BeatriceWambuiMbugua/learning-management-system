"use client"

import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoImageOutline } from "react-icons/io5";
import { toast } from "sonner";
import * as z from "zod";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { FaRegFile } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";


interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] }
    courseId: string
}

const formSchema = z.object({
    url: z.string().min(1),
})
const AttachmentForm: React.FC<AttachmentFormProps> = ({ initialData, courseId }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Image Form", values)
        try {
            const response = await axios.post(`/api/courses/${courseId}/attachments`, values)
            if (response.status === 200) {
                toast.success("Attachment added successfully")
                toggleEdit()
                router.refresh()
            }
        } catch {
            toast.error("Something went wrong")

        }

    }

    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
            toast.success("Attachment deleted successfully")
            router.refresh()
        } catch {
            toast.error("Something went wrong")

        } finally {
            setDeletingId(null)
        }
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                <h1>Course Attachment</h1>
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {(isEditing &&
                        <>Cancel</>)
                    }
                    {
                        (!isEditing &&
                            <>
                                <CiCirclePlus className="mr-2" size={18} />
                                Add File
                            </>
                        )
                    }

                </Button>
            </div>
            {
                !isEditing && (
                    <>
                        {
                            initialData.attachments.length === 0 && (
                                <p className="text-sm mt-2 text-slate-500 italic">
                                    No attachments yet
                                </p>
                            )
                        }
                        {
                            initialData.attachments.length > 0 && (
                                <div className="space-y-2">
                                    {
                                        initialData.attachments.map((attachment) => (
                                            <div key={attachment.id} className="flex items-center p-3 w-full bg-blue-100 border-blue-200 border text-blue-700 rounded-md">
                                                <FaRegFile className="h-4 w-4 mr-2 flex-shrink-0" />
                                                <p className="text-xs line-clamp-1">
                                                    {attachment.name}
                                                </p>
                                                {
                                                    deletingId === attachment.id && (
                                                        <div className="ml-auto">
                                                            <LuLoader2 className="h-4 w-4 animate-spin" />
                                                        </div>
                                                    )
                                                }
                                                {
                                                    deletingId !== attachment.id && (

                                                        <button
                                                            className="ml-auto transition hover:opacity-75"
                                                            onClick={() => onDelete(attachment.id)}
                                                        >
                                                            <MdOutlineCancel />
                                                        </button>

                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </>
                )
            }
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint="courseAttachment"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({
                                        url: url
                                    })
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            Add anything your students might need to complete the course
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default AttachmentForm;