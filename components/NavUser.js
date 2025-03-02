"use client";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/lib/features/slice/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Icon } from "./Icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./dashboard/shared/ui/popover";

export function NavUser() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove("user");
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="w-22 h-10 bg-lime-50 px-3 py-2 inline-flex justify-center items-center text-md font-semibold rounded-full text-gray-800 hover:bg-lime-100">
            <Icon.user className="size-[20px] text-lime-800" />
            <span className="hidden sm:block ml-2">
              {" "}
              {user?.name || "User"}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="max-w-[150px] py-2 shadow-none mt-2"
          side="top"
        >
          <div className="absolute right-2 top-16 mt-1 w-60 rounded-md shadow-lg bg-white ring-1 ring-gray-600 ring-opacity-5 focus:outline-none z-50">
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
        </PopoverContent>
      </Popover>
    </>
  );
}
