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
import { Course } from "@prisma/client";

interface DescriptionFormProps {
    initialData: Course;
    courseId: string
}

const formSchema = z.object({
    description: z.string().min(2, { message: "Description must be at least 2 characters." }),
})
const DescriptionForm: React.FC<DescriptionFormProps> = ({ initialData, courseId }) => {
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Description Form", values)
        try {
            const response = await axios.patch(`/api/courses/${courseId}`, values)
            if (response.status === 200) {
                toast.success("Description updated successfully")
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
                <h1>Course Description</h1>
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) :
                        (
                            <>
                                <GoPencil className="h-4 w-4 mr-2" />
                                Edit Description
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing && (
                    <p className={cn("text-sm mt-2", !initialData.description && "text-slate-500, italic")}>
                        {initialData.description || "No Description"}
                    </p>
                )
            }
            {
                isEditing && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="e.g. 'This course is about..." {...field} disabled={isSubmitting} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your update course Description.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={!isValid || isSubmitting}>Save</Button>
                        </form>
                    </Form>
                )
            }
        </div>
    );
}

export default DescriptionForm;