"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react";
import { Button } from "./ui/button";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";

export const NavbarRoutes = () => {
    const { isSignedIn, isLoaded } = useUser();
    const pathName = usePathname();
    const router = useRouter();

    const isTeacherPage = pathName?.startsWith("/teacher")
    const isCoursePage = pathName?.startsWith("/chapter")

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/sign-in");  // Redirect to the sign-in page if the user is not signed in
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded) return null;  // Avoid rendering until user status is loaded

    return (
        <div className="flex ml-auto gap-x-2">
            {isTeacherPage || isCoursePage ? (
                <Link href={"/"}>
                    <Button size={"sm"} variant={"ghost"}>
                        <MdOutlineLogout className=" h-4 w-4 mr-2" />
                        <p className="font-semibold text-sm"> Back to Courses</p>
                    </Button>
                </Link>
            ) : (
                <Link href={"/teacher/courses"}>
                    <Button size={"sm"} variant={"ghost"}>
                        <FaChalkboardTeacher className=" h-4 w-4 mr-2" />
                        <p className="font-semibold text-sm">Teacher Mode</p>
                    </Button>
                </Link>
            )}
            <UserButton />
        </div>
    );
}