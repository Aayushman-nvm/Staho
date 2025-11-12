"use client";

interface HeadingProps {
  title?: string;
  subTitle?: string;
  center?: boolean;
}

function Heading({ title, subTitle, center }: HeadingProps) {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {subTitle && (
        <p className="font-light text-neutral-500 mt-2">{subTitle}</p>
      )}
    </div>
  );
}

export default Heading;
