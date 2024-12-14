import { Card } from "../components/Card"
import { SideBar } from "../components/SideBar"
import { sharedContent } from "../hooks/sharedContent"

export function SharedBrain(){

  const contents = sharedContent()
  
  return <div>    
    <SideBar/>
    <div className="ml-72 p-6 bg-gray-300 min-h-screen ">
        <div className="flex justify-between p-2">
            <div className="text-3xl font-semibold cursor-default mb-8">
                {"All Notes"}
            </div>
            
        </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 auto-rows-auto grid-auto-flow-dense"> 

      {/* <div className="flex flex-wrap gap-4 "> */}

        {/* 👆👆👆 However, please note that true masonry layouts (like Pinterest) are a bit more complex to achieve with pure CSS. If you need a more sophisticated masonry layout, you might want to consider using a library like react-masonry-css or react-grid-layout. */}


      {
        contents.map(({title,type,link})=>{
          return <Card title={title} type={type} link={link}/>
        })
      }
      
      </div>
      </div>
  </div>
}
