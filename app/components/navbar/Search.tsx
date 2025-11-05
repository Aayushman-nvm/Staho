"use client";

import { BiSearch } from "react-icons/bi";
import { useState } from "react";

function Search() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  return (
    <div className="w-full md:w-auto">
      {/* Desktop Search */}
      <div className="hidden md:flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 py-2 px-4 gap-2">
        <div className="flex-1 px-4 border-r border-gray-300">
          <input
            type="text"
            placeholder="Anywhere"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm font-semibold placeholder-gray-600 outline-none bg-transparent"
          />
        </div>
        <div className="flex-1 px-4 border-r border-gray-300">
          <input
            type="text"
            placeholder="Any week"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-sm font-semibold placeholder-gray-600 outline-none bg-transparent"
          />
        </div>
        <div className="flex-1 px-4">
          <input
            type="text"
            placeholder="Add guests"
            value={guests > 1 ? `${guests} guests` : ""}
            readOnly
            className="w-full text-sm font-semibold placeholder-gray-600 outline-none bg-transparent cursor-pointer"
          />
        </div>
        <button
          className="bg-rose-500 text-white rounded-full p-2 hover:bg-rose-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          aria-label="Search"
        >
          <BiSearch size={18} />
        </button>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden flex items-center border border-gray-300 rounded-full shadow-sm py-2 px-4 gap-3">
        <BiSearch size={20} className="text-gray-600" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">Anywhere</p>
          <p className="text-xs text-gray-500">Any week · Add guests</p>
        </div>
      </div>
    </div>
  );
}

export default Search;
