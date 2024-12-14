export function InputBox({type,placeholder,reference}:{placeholder:string;reference:any,type:string}){
    return <div>
    <input ref={reference} className="px-2 py-2 border m-1 rounded-md min-w-80 " type={type} placeholder={placeholder} />
    </div>
}