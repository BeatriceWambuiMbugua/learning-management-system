import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { IoMenu } from "react-icons/io5"
import { Sidebar } from "./sidebar"

export const MobileNavbar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                 <IoMenu size={22} />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <Sidebar/>
            </SheetContent>
          
        </Sheet>
    )
}