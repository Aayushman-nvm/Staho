"use client";

import Search from "./ui/Search";
import UserMenu from "./ui/UserMenu";
import Link from "next/link";
import { RiHomeSmile2Fill } from "react-icons/ri";

function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-white z-50 shadow-sm border-b border-gray-200">
      <div className="max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3 md:gap-0">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer group"
          >
            {/* Icon directly rendered - no Image component needed */}
            <RiHomeSmile2Fill 
              className="h-8 w-8 md:h-10 md:w-10 text-rose-500 group-hover:text-rose-600 transition-colors duration-200"
            />
            <span className="hidden md:block text-xl lg:text-2xl font-bold text-rose-500 group-hover:text-rose-600 transition-colors">
              Staho
            </span>
          </Link>

          {/* Search - Center on Desktop */}
          <div className="flex-1 flex justify-center max-w-2xl mx-auto">
            <Search />
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/host"
              className="hidden md:block text-sm font-semibold text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors duration-200"
            >
              Staho your home
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
