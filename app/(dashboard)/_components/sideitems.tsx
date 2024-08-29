"use client"

import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { IconType } from "react-icons"

interface SideItemsProps{
    icon: IconType,
    label: string,
    href: string
}
export const SideItems = ({icon:Icon, label, href}: SideItemsProps) => {
    const pathName = usePathname();
    const router = useRouter();

    const isActive = (pathName === "/" && href === "/" || pathName === href || pathName?.startsWith(`${href}/`));

    const onClick = () => {
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20", isActive && "text-blue-800 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-800")}
            >
           <div className="flex items-center gap-x-2 py-4">
            <Icon size={22} className={cn("text-slate-700", isActive && "text-blue-800")}/>
            {label}
           </div>
           <div
           className={cn("ml-auto opacity-0 border-2 border-blue-800 h-full transition-all", isActive && "opacity-100")}
           />

        </button>
    )
}