
enum contentType {
        Youtube = 'youtube',
        Twitter = 'twitter',
        Article = 'article',
        Image = 'image'
    }

interface dropdownProps {
    type:contentType,
    setType:React.Dispatch<React.SetStateAction<contentType>>
}

 export const Dropdown:React.FC<dropdownProps>=({type,setType})=>{
    
    // const [type, setType ] = useState<contentType>(contentType.Youtube)

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setType(e.target.value as contentType) // <-- AS CONTENT TYPE
    }
    
    return <div className=" p-1 flex ">
        <label htmlFor="contentType"></label>
        <select className="cursor-pointer" id="contentType"  value={type}  onChange={handleChange}>
            <option value="" disabled  >-- select an option --</option>
            {Object.keys(contentType).map((key)=>(
                <option key={key} value={contentType[key as keyof typeof contentType] }>
                    {key}
                </option>
            ))}
        </select>
        {/* {type && <p className="font-semibold ">You selected:{type}</p>} */}
    </div>
}