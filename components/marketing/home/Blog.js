"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Blog() {
  const activeIndexRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("home.blog");
  const articles = t.raw("articles");

  return (
    <section className="relative bg-gray-50">
      <div className="relative z-10 px-4 py-12 sm:py-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:py-20 xl:py-28 lg:grid lg:grid-cols-2">
        <div className="lg:pr-8">
          <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
            <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl font-clash">
              {t("title")}
            </h2>
            <p className="mt-6 text-base font-normal leading-7 text-gray-900">
              {t("description")}
            </p>
            
            <form action="#" method="post" className="mt-8 relative">
              <div className="relative space-y-4 sm:flex sm:space-y-0 sm:items-end">
                <div className="flex-1">
                  <input
                    type="email"
                    className="block w-full px-4 py-3 sm:py-3.5 text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                    placeholder="Enter email address"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {t("form.cta")}
                </button>
              </div>
            </form>
            <p className="mt-2 ms-2 text-sm font-semibold text-gray-700">
              {t("form.info")}
            </p>
          </div>
        </div>
      </div>

      <div className="pb-8 lg:absolute lg:inset-0 lg:pb-0">
        <div className="flex flex-col items-center justify-center overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div
            className="flex justify-start w-full gap-6 pb-8 snap-x scroll-smooth overflow-x-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {articles.map((article, index) => (
              <div
                key={index}
                className="relative snap-start scroll-ml-6 shrink-0 first:pl-6 last:pr-6"
              >
                <div className="relative flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow w-60 md:w-80 group rounded-xl hover:shadow-lg hover:-translate-y-1">
                  <Link href={article.link} title="">
                    <div className="relative top-0 left-0 w-full h-48 overflow-hidden rounded-xl aspect-[3/1]">
                      <Image
                        className="transition-all duration-200 transform group-hover:scale-110"
                        src={article.image}
                        alt={`meseji-${index + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div className="flex-1 px-4 py-5 sm:p-6">
                    <Link href={article.link} title="">
                      <p className="text-lg font-bold text-gray-900">
                        {article.title}
                      </p>
                      <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                        {article.description}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end mt-2 space-x-5">
            {articles.map((_, index) => (
              <div
                key={index}
                className={`w-16 h-[3px] rounded-full ${
                  activeIndexRef.current === index
                    ? "bg-gray-900"
                    : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
