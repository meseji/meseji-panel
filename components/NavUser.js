"use client";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/lib/features/slice/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Icon } from "./Icon";

export function NavUser() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    Cookies.remove("user");
    dispatch(logout());
    router.push("/login");
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <button
        className="w-22 h-10 bg-lime-50 px-3 py-2 inline-flex justify-center items-center text-md font-semibold rounded-full text-gray-800 hover:bg-lime-100"
        onClick={toggleMenu}
      >
        <Icon.user className="size-[20px] text-lime-800" />
        <span className="hidden sm:block ml-2"> {user?.name || "User"}</span>
      </button>

      {menuOpen && (
        <div
          ref={menuRef} // Attach ref to the dropdown container
          className="absolute right-2 top-16 mt-1 w-60 rounded-md shadow-lg bg-white ring-1 ring-gray-600 ring-opacity-5 focus:outline-none z-50"
        >
          <div className="py-3 px-5 bg-gray-100 rounded-t-md ">
            <p className="text-sm text-gray-500">{user?.name}</p>
            <p className="text-sm font-sm text-gray-800">{user?.email}</p>
          </div>
          <div className="mt-2 py-2 px-3.5 shadow-xs border-t-0 border-lime-100">
            <button
              className="w-full text-left flex items-center gap-x-3.5 py-2 text-sm text-gray-800"
              onClick={handleLogout}
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
