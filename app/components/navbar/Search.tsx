"use client";

import { BiSearch } from "react-icons/bi";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

function Search() {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff - 1;
      }

      return `${diff} Days`;
    }

    return "Any week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add guests";
  }, [guestCount]);

  return (
    <div
      className="w-full md:w-auto cursor-pointer"
      onClick={searchModal.onOpen}
    >
      {/* Desktop Search */}
      <div className="hidden md:flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 py-2 px-4 gap-2">
        <div className="flex-1 px-4 border-r border-gray-300">
          <div className="text-sm font-semibold text-gray-600">
            {locationLabel}
          </div>
        </div>
        <div className="flex-1 px-4 border-r border-gray-300">
          <div className="text-sm font-semibold text-gray-600">
            {durationLabel}
          </div>
        </div>
        <div className="flex-1 px-4">
          <div className="text-sm text-gray-400">{guestLabel}</div>
        </div>
        <button
          className="bg-rose-500 text-white rounded-full p-2 hover:bg-rose-600 transition-colors duration-200"
          aria-label="Search"
        >
          <BiSearch size={18} />
        </button>
      </div>

      {/* Mobile Search */}
      <div
        className="md:hidden flex items-center border border-gray-300 rounded-full shadow-sm py-2 px-4 gap-3"
        onClick={searchModal.onOpen}
      >
        <BiSearch size={20} className="text-gray-600" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{locationLabel}</p>
          <p className="text-xs text-gray-500">
            {durationLabel} · {guestLabel}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Search;
