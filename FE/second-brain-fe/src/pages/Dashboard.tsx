import { Button } from "../components/Buttons"
import { Card } from "../components/Card"
import { Plusicon } from "../icons/Plusicon"
import { ShareIcon } from "../icons/Shareicon"
import { AddContentModal } from "../components/AddContentModal"
import { useState } from "react"
import { SideBar } from "../components/SideBar"
import { useContent } from "../hooks/useContent"
import axios from "axios"


const beUrl = import.meta.env.VITE_BE_URL as string

 export function Dashboard(){
  const [modalOpen, setModalOpen] = useState(false)
  const contents = useContent()
  
  return <div>    
    
    <SideBar/>
    <AddContentModal open={modalOpen} onClose={()=>setModalOpen(false)}/>
    <div className="ml-72 p-6 bg-gray-300 min-h-screen ">
        <div className="flex justify-between p-2">
            <div className="text-3xl font-semibold cursor-default">
                {"All Notes"}
            </div>
            <div className="flex justify-end  mb-8 ">
            
                <Button  variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}
                
                onClick={ async() => {
                  const response = await axios.post(`${beUrl}share`,{
                    share:true
                    },{
                    headers:{
                      'token':localStorage.getItem('token')
                    }
                  })
                  const shareUrl = `https://cohort-3-0-rjc2.vercel.app${response.data.link}`

                  alert("Copied to Clipboard")
                  
                  navigator.clipboard.writeText(shareUrl)
                } 
              }  
                
              />


                <Button onClick={()=>setModalOpen(true)} variant="primary" text="Add content"  startIcon={<Plusicon/>}/>

            </div>
        </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 auto-rows-auto grid-auto-flow-dense"> 

        {/* 👆👆👆 However, please note that true masonry layouts (like Pinterest) are a bit more complex to achieve with pure CSS. If you need a more sophisticated masonry layout, you might want to consider using a library like react-masonry-css or react-grid-layout. */}


      {
        contents.map(({title,type,link,_id})=>{
          return <Card title={title} type={type} link={link} id={_id}/>
        })
      }
      
      </div>
      </div>
  </div>
}
