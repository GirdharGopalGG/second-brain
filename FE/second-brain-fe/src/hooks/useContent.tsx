import axios from "axios";
import { useEffect, useState } from "react";

export function useContent(){
const beUrl = import.meta.env.VITE_BE_URL as string

    const [contents, setContents] = useState([])

    useEffect(()=>{
       axios.get(`${beUrl}content`,
            {
                headers:{
                "token":localStorage.getItem('token')
                }
            }
        ).then((response)=>{
            setContents(response.data.content)
        })
    },[])

    return contents
}