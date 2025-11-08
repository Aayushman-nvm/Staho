"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
}

function CategoryInput({
  onClick,
  selected,
  label,
  icon: Icon,
}: CategoryInputProps) {
  return (
    <button
      onClick={() => onClick(label)}
      type="button"
      className={`
        rounded-xl border-2 p-4 flex flex-col gap-3
        hover:border-black transition-all duration-200
        cursor-pointer w-full
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold text-left">{label}</div>
    </button>
  );
}

export default CategoryInput;
