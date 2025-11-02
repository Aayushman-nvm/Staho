"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Input{
    id:string,
    label:string,
    type?:string,
    disabled?:boolean,
    formatPrice?:boolean,
    required?:boolean,
    register:UseFormRegister<FieldValues>,
    error:FieldErrors,
}
function Input({id, label, type, disabled, formatPrice, required, register, error}:Input) {
  return (
    <div>Input
        <input id={id} disabled={disabled} {...register(id,{required})} placeholder=" " type={type}/>
        <label>{label}</label>
    </div>
  )
}

export default Input