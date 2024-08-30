"use client"

import { IoBarChart, IoCompassOutline, IoList } from "react-icons/io5"
import { LuLayoutGrid } from "react-icons/lu"
import { SideItems } from "./sideitems"
import { usePathname } from "next/navigation"

const guestRoutes = [
    {
        icon: LuLayoutGrid,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: IoCompassOutline,
        label: "Browse",
        href: "/search"
    }
]
const teacherRoutes = [
    {
        icon: IoList,
        label: "Courses",
        href: "/teacher/courses"
    },
    {
        icon: IoBarChart,
        label: "Analytics",
        href: "/teacher/analytics"
    }
]

export const SideRoutes = () => {
    const pathName = usePathname();

    const isTeacherPage = pathName.includes("/teacher")

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    return (
        <div className="w-full flex flex-col">
            {
                routes.map((route) => (
                    <SideItems
                    key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                        
                    />
                ))
            }
        </div>
    )
}