import Image from "next/image";
import { IoCodeWorking } from "react-icons/io5";

const Logo = () => {
    return (
    <>
        <div className="flex gap-1 items-center hover:opacity-80 hover:cursor-pointer hover:transition-opacity">
            <div className="p-1 bg-slate-50 inline-flex shadow-sm rounded-full border-slate-100 border">
                <div className="p-2 border border-blue-700 rounded-full">
                    <IoCodeWorking size={28} className="text-[#333333]" />
                </div>
            </div>
            <div>
                <h2 className="text-blue-800 font-semibold text-lg">Coding Diary</h2>
                <p className="text-muted-foreground text-xs font-medium"> One code at a time!</p>
            </div>
        </div>
    </>
    );
}

export default Logo;