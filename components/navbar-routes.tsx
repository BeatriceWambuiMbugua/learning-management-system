"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button";
import { MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";

export const NavbarRoutes = () => {

    const pathName = usePathname();
    const router = useRouter();

    const isTeacherPage = pathName?.startsWith("/teacher")
    const isCoursePage = pathName?.startsWith("/chapter")

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
                        <FaChalkboardTeacher  className=" h-4 w-4 mr-2"/>
                        <p className="font-semibold text-sm">Teacher Mode</p>
                    </Button>
                </Link>
            )}
            <UserButton />
        </div>
    )
}