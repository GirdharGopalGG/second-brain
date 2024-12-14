import axios from "axios";
import { useEffect, useState } from "react";

export function sharedContent(){
const beUrl = import.meta.env.VITE_BE_URL as string

    const [content,setContent] = useState([])

    const shareLink = window.location.pathname.substring(7)
    console.log(shareLink)
    
    useEffect(()=>{
        axios.get(`${beUrl}${shareLink}`

        ).then((response)=>{
            console.log(response)

            setContent(response.data.content)
        })
    },[])

    return content
}