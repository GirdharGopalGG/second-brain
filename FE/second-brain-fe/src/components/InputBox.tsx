export function InputBox({placeholder,reference}:{placeholder:string;reference:any}){
    return <div>
    <input ref={reference} className="px-2 py-2 border m-1 rounded-md min-w-80 " type="text" placeholder={placeholder} />
    </div>
}