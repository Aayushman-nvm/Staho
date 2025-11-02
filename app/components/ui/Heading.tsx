"use client";

interface Heading{
    title:string,
    subTitle?:string,
    center?:boolean,
}

function Heading({title, subTitle,center}:Heading) {
  return (
    <div>Heading
        {title}
        {subTitle}
    </div>
  )
}

export default Heading