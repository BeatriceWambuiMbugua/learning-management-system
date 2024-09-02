"use client"
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TitleFormProps {
    initialData: { title: string }
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
})
const TitleForm: React.FC<TitleFormProps> = ({ initialData, courseId }) => {
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Title Form", values)
        try {
            const response = await axios.patch(`/api/courses/${courseId}`, values)
            if (response.status === 200) {
                toast.success("Title updated successfully")
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
                <h1>Course Title</h1>
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) :
                        (
                            <>
                                <GoPencil className="h-4 w-4 mr-2" />
                                Edit Title
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing && (
                    <p className="text-sm mt-2">
                        {initialData.title}
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
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. 'Advanced Web Development..'" {...field} disabled={isSubmitting} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your update course Title.
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

export default TitleForm;