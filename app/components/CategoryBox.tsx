"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

function CategoryBox({ label, icon: Icon, selected }: CategoryBoxProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // Toggle off if clicking the same category
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    // BUG FIX #5 & #6: Added styling and accessibility
    <button
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center 
        gap-2 p-3 border-b-2 
        hover:text-neutral-800 transition-all duration-200
        cursor-pointer group
        min-w-[80px] sm:min-w-[90px]
        ${
          selected
            ? "border-b-neutral-800 text-neutral-800"
            : "border-transparent text-neutral-500 hover:border-neutral-300"
        }
      `}
      role="tab"
      aria-selected={selected}
      aria-label={`Filter by ${label}`}
    >
      <Icon size={26} className="group-hover:scale-110 transition-transform duration-200" />
      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

export default CategoryBox;
