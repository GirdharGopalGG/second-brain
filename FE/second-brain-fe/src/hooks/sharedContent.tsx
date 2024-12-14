import axios from "axios";
import { useEffect, useState } from "react";

export function sharedContent(){
    const [content,setContent] = useState([])

    const shareLink = window.location.pathname.substring(7)
    // console.log(shareLink)
    
    useEffect(()=>{
        axios.get(`http://localhost:3000/${shareLink}`

        ).then((response)=>{
            console.log(response)

            setContent(response.data.content)
        })
    },[])

    return content
}