"use client"

interface MenuItem{
    onClick:()=>void,
    label:string,
}

function MenuItem({onClick, label}:MenuItem) {
  return (
    <div onClick={onClick}>MenuItem
        {label}
    </div>
  )
}

export default MenuItem