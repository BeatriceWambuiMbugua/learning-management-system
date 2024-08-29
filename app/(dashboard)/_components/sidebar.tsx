import Logo from "./logo"

export const Sidebar = () =>{
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
           <div className="py-6 px-4">
            <Logo/>
           </div>
        </div>
    )
}