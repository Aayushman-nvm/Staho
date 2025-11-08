"use client";

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/app/data/categories";

function Categories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="
            flex flex-row items-center justify-between 
            pt-4 overflow-x-auto scrollbar-hide
            gap-2 md:gap-3
          "
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
