"use client";

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
import { cn } from "@/lib/utils/utils";

export function NavUser({ label }) {
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
          <button
            className={cn(
              "w-22 h-10 bg-lime-50 px-3 py-2 inline-flex justify-center items-center text-md font-semibold rounded-lg text-gray-800 hover:bg-lime-100",
              label && "flex w-full justify-start"
            )}
          >
            <Icon.user className="size-[20px] text-lime-800" />
            {label && (
              <span className="hidden sm:block ml-2 text-sm font-medium text-gray-800">
                {label}
              </span>
            )}

            {/* <span className="hidden sm:block ml-2 text-sm text-gray-800">
              {" "}
              {user?.name || "Akash Shukla"}
            </span> */}
          </button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[210px] shadow-none mx-2" side="top">
          <div className="p-2 bg-gray-100 rounded-t-md">
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
        </PopoverContent>
      </Popover>
    </>
  );
}
