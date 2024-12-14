import { ReactElement } from "react"

export function SidebarItems({icon,text}:{
    text:string,
    icon:ReactElement,
    onClick?:()=>void
}){
    return <div>
        <div className="hover:bg-gray-300 cursor-pointer  px-8 py-4 flex items-center  gap-4 transition-all duration-600">
            <div>
                {icon}
            </div>
            <div className="text-gray-200">
                {text}
            </div>
        </div>
    </div>
}