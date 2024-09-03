"use client"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoPencil } from "react-icons/go";
import * as z from "zod";

import { Combobox } from "@/components/ui/combobox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: { label: string, value: string }[];
}

const formSchema = z.object({
    categoryId: z.string().min(1),
});

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, courseId, options }) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const selectedOption = options.find((option) => option.value === initialData.categoryId);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Category Form", values);
        try {
            const response = await axios.patch(`/api/courses/${courseId}`, values);
            if (response.status === 200) {
                toast.success("Category updated successfully");
                toggleEdit();
                router.refresh();
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                <h1>Course Category</h1>
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <GoPencil className="h-4 w-4 mr-2" />
                            Edit Category
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn("text-sm mt-2", !initialData.categoryId && "text-slate-500 italic")}>
                    {selectedOption?.label || "No Category"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Combobox
                                            options={options}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your updated course category.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={!isValid || isSubmitting}>Save</Button>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default CategoryForm;