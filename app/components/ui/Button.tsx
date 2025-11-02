import {MouseEvent} from "react";

interface Button{
    label:string,
    onClick:(e:MouseEvent<HTMLButtonElement>)=>void,
    disabled?:boolean,
    outline?:boolean,
    icon?:any,
}

function Button({label,onClick,disabled,outline,icon}:Button) {
  return (
    <button onClick={onClick} disabled={disabled}>
        {icon}
        {label}
    </button>
  )
}

export default Button