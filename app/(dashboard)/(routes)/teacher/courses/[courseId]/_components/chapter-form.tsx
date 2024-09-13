"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoPencil } from "react-icons/go";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Chapter, Course } from "@prisma/client";
import { FaPlusCircle } from "react-icons/fa";
import { Input } from "@/components/ui/input";

interface ChapterFormProps {
    initialData: Course & {chapters: Chapter[]};
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
})
const ChapterForm: React.FC<ChapterFormProps> = ({ initialData, courseId }) => {
    const[isCreating, setIsCreating] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const toggleCreating = () => setIsCreating((current) => !current)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Description Form", values)
        try {
            const response = await axios.post(`/api/courses/${courseId}/chapters`, values)
            if (response.status === 200) {
                toast.success("Chapter Created successfully")
                toggleCreating()
                router.refresh()
            }
        } catch {
            toast.error("Something went wrong")

        }

    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                <h1>Course Chapters</h1>
                <Button variant={"ghost"} onClick={toggleCreating}>
                    {isCreating ? (
                        <>Cancel</>
                    ) :
                        (
                            <>
                                <FaPlusCircle className="h-4 w-4 mr-2" />
                                Create a Chapter
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isCreating && (
                   <div
                    className={cn("text-sm mt-2", !initialData.chapters.length && "text-slate-500 italic")}>
                        {!initialData.chapters.length && "No Chapters Available"}
                        {/* Add a list of Chapters */}
                    </div>
                )
            }
            {
                !isCreating &&(
                    <p className="text-xs text-muted-foreground mt-4">
                        Drag and drop to reorder the chaoters
                    </p>
                )
            }
            {
                isCreating && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course Chapter</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. 'Introduction to Webdevelopment" {...field} disabled={isSubmitting} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your Course Chapter.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={!isValid || isSubmitting}>Create</Button>
                        </form>
                    </Form>
                )
            }
        </div>
    );
}

export default ChapterForm;