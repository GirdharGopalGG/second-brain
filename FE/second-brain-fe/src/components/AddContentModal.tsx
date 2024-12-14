import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Buttons";
import { InputBox } from "./InputBox";
import {Dropdown} from "./Dropdown";
import axios from "axios";


enum contentType { 
    Youtube = 'youtube',
    Twitter = 'twitter',
    Image = 'image',
    Article = 'article'

}

export function AddContentModal({open,onClose}:{
    
    open:boolean,
    onClose:()=>void
}){
const beUrl = import.meta.env.VITE_BE_URL as string


    const linkRef = useRef<HTMLInputElement>()
    const titleRef = useRef<HTMLInputElement>()
    const [type,setType] = useState<contentType>(contentType.Youtube)
    
    async function addContent(){
    const title = titleRef.current?.value
    const link = linkRef.current?.value
    
    await axios.post(`${beUrl}content`,
        {
            title,link,type
        },{
            headers:{
                'token':localStorage.getItem("token")
            }
        }
    )
    onClose()
    window.location.reload()
    

    }
    
    return <div>
        {open && <div>
        <div className="bg-slate-900 opacity-70 fixed top-0 left-0 h-screen w-screen  flex justify-center items-center ">
        </div>

        <div className=" fixed top-0 left-0 h-screen w-screen  flex justify-center items-center ">
            <div className="bg-white border  p-4 rounded-lg">
                <div className="flex justify-end">
                    <div onClick={onClose} className="hover:cursor-pointer">
                        <CrossIcon />   
                    </div>
                </div>
                <div >
                    <InputBox type="text" reference={titleRef} placeholder={'Title'} />
                    <InputBox type="text" reference={linkRef} placeholder={'Link'} />
                </div>
                <div className="flex justify-between px-10 items-center my-2 ">
                    <div className="cursor-default">Type: </div>
                    <div>
                        <Dropdown type={type} setType={setType} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button variant="primary" text="Submit" onClick={addContent} />
                </div>
            </div>
        </div>
            
        </div>}
    </div>
}


