"use client";
import { Icon } from "@/components/Icon";
import { marketMenu } from "@/config/market-nav";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import LanguageSwitcher from "./language-switcher";

export default function Navs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSubMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const generateBreadcrumbs = (menuList, parentPath = "", basePosition = 1) => {
    if (!menuList?.length) return [];

    return menuList.reduce((breadcrumbs, menu, index) => {
      if (!menu?.isActive || !menu?.url) return breadcrumbs;

      const currentPath = new URL(menu.url, `${siteConfig.url}${parentPath}`)
        .pathname;

      const breadcrumb = {
        "@type": "ListItem",
        position: basePosition + index,
        name: menu.title,
        item: `${siteConfig.url}${currentPath}`,
      };

      // Recursively generate breadcrumbs for child menus
      const childBreadcrumbs = menu.children?.length
        ? generateBreadcrumbs(
            menu.children,
            currentPath,
            basePosition + index + 1
          )
        : [];

      return [...breadcrumbs, breadcrumb, ...childBreadcrumbs];
    }, []);
  };

  // Generate breadcrumb JSON-LD schema
  const breadcrumbList = marketMenu.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: generateBreadcrumbs(marketMenu),
      }
    : null;

  return (
    <header className="sticky top-0 blur-1 z-[1000] h-auto w-full  bg-white text-black ">
      {breadcrumbList && (
        <Script
          id="breadcrumb-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
        />
      )}

      <div className="items-center max-w-screen-2xl mx-auto">
        <div className="flex flex-col px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
          <div className="flex-shrink-0">
            <Link href="/" title="" className="flex">
              <Image
                className="w-auto h-10 lg:h-12"
                width={120}
                height={56}
                src="https://ik.imagekit.io/g689orrur/Logo/meseji-full-dark.png"
                alt="meseji dark logo"
              />
            </Link>
          </div>

          <nav
            className={`flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0 hidden`}
          >
            {marketMenu?.map(
              (menu, index) =>
                menu?.isActive !== false && (
                  <ul
                    key={index}
                    className="flex flex-col lg:flex-row font-normal"
                  >
                    <li className="relative group px-[5px] py-2">
                      {menu?.children?.length > 0 ? (
                        <button
                          className="flex text-base text-black transition-all duration-200 hover:text-opacity-100 group-hover:text-gray-600"
                          aria-haspopup="true"
                        >
                          {menu?.title}
                          <div className="group">
                            <svg
                              className="w-6 h-6 fill-current transition-transform duration-300 ease-in-out group-hover:rotate-180"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                            </svg>
                          </div>
                        </button>
                      ) : (
                        <Link
                          href={menu?.url}
                          className="flex text-base text-black transition-all duration-200 hover:text-opacity-70"
                        >
                          {menu?.title}
                        </Link>
                      )}
                      <div className="absolute lg:-left-2 top-2 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[260px] transform">
                        <div className="relative top-6 bg-white rounded-3xl lg:shadow-xl w-full">
                          {/* <div className="w-10 h-10 bg-lime-50 transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm"></div> */}

                          {menu?.children?.length > 0 && (
                            <div className="relative z-10 top-full mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white-400 lg:shadow-lg ring-1 ring-lime-900/10">
                              <div className="p-4">
                                {menu?.children?.map(
                                  (subMenu) =>
                                    subMenu.isActive !== false && (
                                      <div
                                        key={subMenu.id || subMenu.title}
                                        className="group relative flex items-center gap-x-5 rounded-lg py-[7px] px-3 text-sm/6 hover:bg-gradient-to-tr from-lime-50 to-gray-50"
                                      >
                                        {subMenu?.icon && (
                                          <div className="flex size-10 flex-none items-center justify-center rounded-lg bg-lime-50 group-hover:bg-white">
                                            <subMenu.icon className="size-6" />
                                          </div>
                                        )}

                                        <div className="">
                                          <Link
                                            href={subMenu?.url}
                                            className="block font-semibold text-gray-900"
                                          >
                                            {subMenu?.title}
                                            <span className="absolute inset-0" />
                                          </Link>
                                          <p className="text-gray-600">
                                            {subMenu?.description}
                                          </p>
                                        </div>
                                      </div>
                                    )
                                )}
                              </div>
                              {menu?.addons && (
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                  {menu?.addons?.map((addon) => (
                                    <Link
                                      key={addon?.title}
                                      href={addon?.url}
                                      className="flex  items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                                    >
                                      <svg
                                        className="size-5 flex-none text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      {addon?.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  </ul>
                )
            )}
          </nav>
          {menuOpen && (
            <div className="lg:hidden">
              <nav className="flex flex-col space-y-2 bg-white p-4">
                {marketMenu?.map(
                  (menu) =>
                    menu.isActive !== false && (
                      <div key={menu.id}>
                        <button
                          onClick={() => toggleSubMenu(menu.id)}
                          className="w-full flex justify-between items-center px-2 py-2 text-left text-black hover:bg-gray-100"
                        >
                          {menu?.title}
                          {menu?.children?.length > 0 && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className={`w-4 h-4 transform transition-transform ${
                                activeMenu === menu.id ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )}
                        </button>

                        {/* Submenu */}
                        {activeMenu === menu.id && (
                          <div className="pl-4 space-y-1">
                            {menu.children.map(
                              (subMenu) =>
                                subMenu.isActive !== false && (
                                  <Link
                                    href={subMenu.url}
                                    key={subMenu.id}
                                    className="block text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
                                  >
                                    {subMenu.title}
                                  </Link>
                                )
                            )}
                          </div>
                        )}
                      </div>
                    )
                )}
              </nav>
            </div>
          )}
          <div
            className={`flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0 ${
              menuOpen ? "" : "hidden"
            }`}
          >
           <LanguageSwitcher /> 
            <Link
              href="/login"
              className="inline-flex px-5 py-2 font-medium text-black transition-all duration-200 bg-white rounded-full border hover:bg-lime-50 focus:bg-lime-50"
            >
              <span className="">Login</span>
            </Link>
            <Link
              href="/register"
              className="inline-flex px-5 py-2 font-medium text-white transition-all duration-200 bg-gray-800 rounded-full hover:bg-lime-500 focus:bg-lime-400"
            >
              <span className="mr-2">Free Trial</span>
            </Link>
          </div>
          <button
            aria-label="Menu"
            type="button"
            onClick={toggleMenu}
            className="absolute right-5 inline-flex p-2 text-gray-900 transition-all duration-200 rounded-md lg:hidden focus:bg-lime-100 hover:bg-lime-100"
          >
            {menuOpen ? (
              <Icon.cancel className="block w-6 h-6" />
            ) : (
              <Icon.menu className="block w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
