import { ShareIcon } from "../icons/Shareicon"
import { DelIcon } from "../icons/DelIcon"
import { YoutubeIcon } from "../icons/Youtube"
import { TwitterIcon } from "../icons/Twitter"
import { DocumentIcon } from "../icons/DocumentIcon"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { ImageIcon } from "../icons/ImageIcon"
import { useEffect } from "react"

declare global {
    interface Window {
        twttr: any;
    }
}

interface card{
    type?:"youtube"|"twitter"|"article"|"image",
    title?:string,
    link?:string,
    id?: string
}

export function Card(props:card){
const beUrl = import.meta.env.VITE_BE_URL as string

useEffect(() => {
        if (props.type === 'twitter') {
            const loadTwitterScript = ()=>{
                    if (window.twttr) {
                        window.twttr.widgets.load();
                    }
                
            };

            loadTwitterScript();
        }
    }, []);

    const location = useLocation()
    // console.log(location.pathname)


    return <div>
    <div className="min-h-24 min-w-80 p-4 rounded-2xl shadow-md bg-white border-slate-200  border">
        <div className="flex justify-between max-h-7 py-2 mb-4">
            <div className="flex items-center gap-4">
                <div>
                {props.type==='youtube'?<YoutubeIcon/>:props.type==='twitter'?<TwitterIcon/>:props.type==='article'?<DocumentIcon/>:<ImageIcon/>}
               </div>
               <div className="font-semibold ">
                {props.title}
                </div>
            </div>  
            <div className="flex items-center gap-4 text-slate-500 ">
                
                { <a href={props.link} target="_blank">
                    <ShareIcon/>
                </a>
                }

                <div className="cursor-pointer"
                onClick = {async() => {
                    const response = await axios.delete(`${beUrl}content`,
                      
                    {
                        headers:{
                            'token':localStorage.getItem('token')
                        },
                        data:{
                            contentId:props.id 
                        }
                    }
                )

                    // console.log(response)
                    if(response.status===200){
                        window.location.reload()
                    }

                    }
                    
                }
                
                >

                {location.pathname==='/dash' && <DelIcon/>}
            </div>

            </div>
        </div>
        <div  >
                

            {/* ?.replace('watch?v=','embed/') */}
            {props.type==='youtube' && <iframe className="min-h-40 w-full rounded-xl" src={props.link?.includes('youtu.be')?props.link?.replace('youtu.be','youtube.com/embed'):props.link?.replace('watch?v=','embed/')} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

            
            {props.type === 'twitter' && <div className="h-40 overflow-hidden">
                <blockquote
                    className="twitter-tweet">
                    <a href={props.link?.replace('x.com','twitter.com')}>
                    </a>
                </blockquote>    
                </div>
            }         
            
            

            {props.type==='article' && <div 
                className="h-40 break-all overflow-hidden" > 
                    {props.link} 
                </div> }
           
            {props.type==='image' && <div 
                className="h-40 break-all overflow-hidden">
                    {props.link} 
                </div> }


        </div>
        
    </div>
    </div>
}