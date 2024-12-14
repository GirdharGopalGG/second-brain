import { ReactElement } from "react";

interface buttonInterface{
    variant:'primary' | 'secondary',
    startIcon?:ReactElement,
    text:string,
    onClick?:()=>void,
    wide?:boolean,
    classname?:string,
    disabled?:boolean
}

const variantClasses = {
  'primary':'bg-blue-300 text-white font-normal ',
  'secondary':'bg-blue-100 text-blue-200 font-medium mr-3 '
}
const defaultStyles = "px-4 py-2 rounded-md  flex items-center gap-2 text-lg "

export function Button(props:buttonInterface){
 return <button onClick={props.onClick} className={ variantClasses[props.variant]+' ' +defaultStyles+' '+`${props.wide?' w-full ':''}` +' '+`${props.classname}`+' '+ `${props.disabled?' opacity-70 cursor-not-allowed ':' opacity-100 cursor-pointer'}` }>
  
    {props.startIcon}
  
    {props.text}
  </button>
}