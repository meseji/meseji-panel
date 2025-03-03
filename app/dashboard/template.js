"use client";
import { Icon } from "@/components/Icon";
import { NavUser } from "@/components/NavUser";
import Breadcrumb from "@/components/ui/Breadcrumbs";
import { sidebarNav } from "@/config/site-nav";
import { cn } from "@/lib/utils/utils";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Template({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      {/* <nav className="h-16 w-full flex-shrink-0 flex items-center justify-between px-4 bg-white border-b">
        <div className="flex flex-row justify-center items-center">
          <Icon.sidebar
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`h-5 w-5  block lg:hidden mr-4 hover:text-gray-700 ${
              isSidebarOpen ? "text-gray-800" : "text-gray-600"
            }`}
          />
          <div className="flex items-center">
            <Link href="/dashboard">
              <Image
                className="w-auto h-12"
                width={70}
                height={56}
                src="/android-chrome-192x192.png"
                alt="logo"
                quality={100}
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-3">
          <div className="h-11 w-11 text-gray-800 rounded-full flex justify-center items-center">
            <Icon.bell className="size-5" />
          </div>
          <div className="h-10 text-gray-800 rounded-full flex justify-center items-center">
            <NavUser />
          </div>
        </div>
      </nav> */}

      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          className={`${
            isSidebarOpen ? "w-56 " : "w-16 hidden lg:block"
          } bg-white h-full flex-shrink-0 transition-width duration-300 border-r `}
        >
          <div className="h-full flex flex-col justify-between">
            <div
              className={cn(
                "flex items-center px-2 py-2",
                isSidebarOpen ? "justify-between" : "justify-center"
              )}
            >
              {isSidebarOpen && (
                <div className="flex items-center">
                  <Link href="/dashboard">
                    <Image
                      className="w-auto h-10"
                      width={60}
                      height={46}
                      src="/android-chrome-192x192.png"
                      alt="logo"
                      quality={100}
                    />
                  </Link>
                </div>
              )}
              <button
                className="group inline-flex rounded-md p-2 hover:bg-gray-200/50"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <PanelRightClose
                    className="size-5 shrink-0 text-gray-500 group-hover:text-gray-700 "
                    aria-hidden="true"
                  />
                ) : (
                  <PanelRightOpen
                    className="size-5 shrink-0 text-gray-500 group-hover:text-gray-700 "
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3">
              <ul className="space-y-1">
                {sidebarNav
                  .filter((item) => item?.isActive)
                  .map((item) => (
                    <li
                      key={item?.id}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-lg",
                        pathname === item?.route
                          ? "text-lime-950 bg-lime-200/80"
                          : "text-gray-500 hover:bg-lime-50",
                        isSidebarOpen ? "h-11 " : "size-11"
                      )}
                    >
                      <Link href={item?.route} className="flex items-center">
                        <item.icon className="size-[18px]" />
                        <span
                          className={`${
                            isSidebarOpen ? "block ml-2" : "hidden"
                          }`}
                        >
                          {item?.title}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
            <div className="p-3 space-y-2 ">
              <Link
                href="/dashboard/settings"
                className="flex items-center px-[10px] py-[10px] text-sm font-medium text-gray-900 rounded-lg hover:bg-lime-100/80"
              >
                <Icon.settings className="size-[18px]" />
                <span className={cn(isSidebarOpen ? "block ml-3" : "hidden")}>
                  Settings
                </span>
              </Link>
              <NavUser label={isSidebarOpen && "Account"} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="h-full p-3 md:p-4 lg:p-5">
            {/* <Breadcrumb /> */}
            <div className="pb-10">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
