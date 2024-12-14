import { DocumentIcon } from "../icons/DocumentIcon"
import { ImageIcon } from "../icons/ImageIcon"
import { TwitterIcon } from "../icons/Twitter"
import { YoutubeIcon } from "../icons/Youtube"
import { SidebarItems } from "./SidebarItems"
import { Button } from "./Buttons"
import { LogoutIcon } from "../icons/LogoutIcon"
import { useNavigate } from "react-router-dom"
export function SideBar(){

    const navigate = useNavigate()
    
    
    return <div >
        <div className="bg-gray-100 h-screen min-w-72 fixed left-0 top-0 border border-r-slate-200">
            <div className="cursor-default flex gap-4 ml-4 my-6 items-center">
                <div>
                    <img src="https://img.icons8.com/?size=100&id=2802&format=png&color=228BE6" alt="Second Brain" className="size-12" />
                </div>
                <div className="font-bold text-2xl ">
                    Second Brain
                </div>
            </div>
            <SidebarItems icon={<TwitterIcon/>} text={"Tweets"} onClick={()=>{
                
            }} />
            <SidebarItems icon={<YoutubeIcon/>} text={"Youtube"} />
            <SidebarItems icon={<DocumentIcon/>} text={"Article"} />
            <SidebarItems icon={<ImageIcon/>} text={"Images"} />
            {/* <SidebarItems icon={<TagIcon/>} text={"Tags"} /> */}
            <div className="fixed bottom-4 m-8">
                <Button text="Logout" variant="secondary" startIcon={<LogoutIcon/>} 
                onClick={()=>{
                    localStorage.removeItem('token')
                    navigate('/signin')
                }}
                />
            </div>
        </div>
        
    </div>
}