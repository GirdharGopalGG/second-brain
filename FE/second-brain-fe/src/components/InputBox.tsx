import { ReactElement, useState } from "react";
import { EyeOpen } from "../icons/EyeOpen";
import { EyeClose } from "../icons/EyeClose";

export function InputBox({
    type,
    placeholder,
    reference,
    endIcon}:{placeholder:string,
        reference:any,
        type?:string,
        endIcon?:ReactElement}){

    const [passwordVisible,setPasswordVisible] = useState(false)

    const togglePassword = ()=>{
        setPasswordVisible(visible => !visible)
    }

    return <div className="flex items-center outline-1 outline w-full rounded-md">
        <input 
        ref={reference} 
        className="outline-none p-2 min-w-60 "
        type={passwordVisible?"text":type} 
        placeholder={placeholder} 
        />

        {endIcon && <div 
            className="cursor-pointer pr-2" onClick={togglePassword }>
                
            {passwordVisible?<EyeOpen/>:<EyeClose/>}
        </div> }
    </div>
}