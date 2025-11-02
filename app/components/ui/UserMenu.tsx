"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { AiOutlineMenu } from "react-icons/ai";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

function UserMenu() {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close menu when clicking outside - BUG FIX #5
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLogin = () => {
    setIsOpen(false);
    // Add your login logic here
  };

  const handleSignup = () => {
    setIsOpen(false);
    registerModal.onOpen();
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu Trigger Button */}
      <button
        onClick={toggleOpen}
        className="
          flex items-center gap-3 
          border border-gray-300 rounded-full 
          py-1 px-2 md:py-2 md:px-4
          hover:shadow-md transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-rose-500
          cursor-pointer
        "
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="User menu"
      >
        <AiOutlineMenu className="text-gray-700" size={18} />
        <div className="hidden md:block">
          <Avatar />
        </div>
      </button>

      {/* Dropdown Menu - BUG FIX #1: Changed !isOpen to isOpen */}
      {isOpen && (
        <div
          className="
            absolute right-0 mt-3 w-48 md:w-56
            bg-white rounded-xl shadow-xl border border-gray-200
            overflow-hidden
            z-50
            animate-in fade-in slide-in-from-top-2 duration-200
          "
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            <MenuItem
              onClick={handleLogin}
              label="Log In"
              icon={<FiLogIn />}
            />
            <MenuItem
              onClick={handleSignup}
              label="Sign Up"
              icon={<FiUserPlus />}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
