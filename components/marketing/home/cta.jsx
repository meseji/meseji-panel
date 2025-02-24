import { useTranslations } from "next-intl";
import Link from "next/link";

export function CTA() {
  const t = useTranslations("cta");
  return (
    <>
      <div className="relative flex items-center justify-center bg-gray-50">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black rounded-t-[40px]"></div>
        <div className="text-center w-full justify-center items-center relative z-10 h-[300px] bg-lime-400 rounded-3xl mx-8 lg:mx-16 my-8 lg:my-16 shadow-lg flex flex-col px-6 md:px-10 lg:px-16 py-6   md:py-10 lg:py-14">
          <div>
            <p className="text-gray-700 text-base">
              
              {t("title")}
            </p>
            <h2 className="text-xl font-meduim mt-3 font-clash block  font-medium text-stone-950 md:text-2xl lg:text-4xl leading-none lg:leading-tight">
            
              {t("description")}
            </h2>
          </div>

          <div className="group relative mt-6">
            <Link
              href="https://cal.com/meseji/30min"
              className="relative flex items-center p-[5px] border text-stone-900 bg-white rounded-full hover:border-lime-400 hover:bg-lime-400 hover:text-stone transition-all duration-300"
            >
              <span className="ml-3 lg:ml-4 font-sm">{t("button")}</span>
              <span className="ml-2 lg:ml-3 flex items-center justify-center size-9 bg-gray-200 text-stone-900 rounded-full transform transition-transform duration-300 group-hover:bg-black group-hover:text-white">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
