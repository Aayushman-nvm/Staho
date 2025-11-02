"use client";

import { MouseEvent, ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-full rounded-lg transition-all duration-200
        disabled:opacity-70 disabled:cursor-not-allowed
        hover:opacity-80
        ${outline ? "bg-white border-black text-black" : "bg-rose-500 border-rose-500 text-white"}
        ${small ? "py-1 text-sm font-light border" : "py-3 text-base font-semibold border-2"}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-1/2 -translate-y-1/2" />}
      {label}
    </button>
  );
}

export default Button;
