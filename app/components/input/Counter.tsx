"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

function Counter({ title, subtitle, value, onChange }: CounterProps) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={onReduce}
          disabled={value === 1}
          className={`
            w-10 h-10 rounded-full border-2 border-neutral-400 
            flex items-center justify-center 
            text-neutral-600 cursor-pointer 
            hover:opacity-80 transition
            ${value === 1 ? "opacity-40 cursor-not-allowed" : ""}
          `}
          aria-label={`Decrease ${title.toLowerCase()}`}
          type="button"
        >
          <AiOutlineMinus />
        </button>
        <div className="font-light text-xl text-neutral-600 w-10 text-center">
          {value}
        </div>
        <button
          onClick={onAdd}
          className="
            w-10 h-10 rounded-full border-2 border-neutral-400 
            flex items-center justify-center 
            text-neutral-600 cursor-pointer 
            hover:opacity-80 transition
          "
          aria-label={`Increase ${title.toLowerCase()}`}
          type="button"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}

export default Counter;
