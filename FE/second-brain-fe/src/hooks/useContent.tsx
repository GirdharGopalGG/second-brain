import axios from "axios";
import { useEffect, useState } from "react";

export function useContent(){
    const [contents, setContents] = useState([])

    useEffect(()=>{
       axios.get('http://localhost:3000/content',
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