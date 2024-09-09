import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileNavbar } from "./mobile-navbar"

export const Navbar = () =>{
    return (
        <div className="p-4 border-b  h-full flex items-center bg-white shadow-sm">
            Testing
            <MobileNavbar/>
            <NavbarRoutes/>
        </div>
    )
}