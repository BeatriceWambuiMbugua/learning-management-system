"use client"

import { IoCompassOutline } from "react-icons/io5"
import { LuLayoutGrid } from "react-icons/lu"
import { SideItems } from "./sideitems"

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

export const SideRoutes = () => {
    const routes = guestRoutes;
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