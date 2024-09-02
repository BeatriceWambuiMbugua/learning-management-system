"use client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"


const formSchema = z.object({
    title: z.string().min(2,
        { message: "Title must be at least 2 characters." },
    ),
})
const CreateCourse = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values)
            router.push(`/teacher/courses/${response.data.id}`)
            toast.success("Course created")
        } catch {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">Name Your Course</h1>
                <p className="text-slate-600 text-sm">What would you want to name your course? Don&apos;t worry, you can change this later</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. 'Advanced UI/UX' "
                                            disabled={isSubmitting}
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href={"/"}>
                                <Button type="button" variant={"ghost"}>Cancel</Button>
                            </Link>

                            <Button type="submit" disabled={isSubmitting || !isValid}>Continue</Button>

                        </div>


                    </form>

                </Form>
            </div>


        </div>
    );
}

export default CreateCourse;