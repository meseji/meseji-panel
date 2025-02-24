import Image from "next/image";
import SectionBackground from "../shared/section-bg";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Hero() { 
  const t = useTranslations("home.hero");

  return (
    <SectionBackground className="bg-gradient-to-t from-white to-gray-50/70">
      <div className="mx-auto w-full max-w-7xl px-1 md:px-10 ">
        <div className="container mx-auto px-6 lg:px-8 flex relative space-x-4">
          <div className="w-full md:w-1/2 lg:w-3/6 flex flex-col relative space-y-8">
            <h1 className="block text-4xl font-clash font-medium text-stone-950 md:text-4xl lg:text-6xl leading-none lg:leading-tight ">
            {t("title")}
              {/* Connect, Engage <br />
              and Grow with <br />
              <span className="text-lime-500">WhatsApp</span> */}
            </h1>
            <p className="mt-3 text-lg text-gray-800">
            {t("subtitle")}
              {/* A seamless way to connect with customers using <br />
              multi-channel marketing solutions. */}
            </p>

            <div className="flex mt-5 space-x-2 lg:space-x-4">
              <div className="group relative">
                <Link
                  href="/register?ref=marketing-free"
                  className="relative flex items-center p-[5px] bg-stone-900 text-gray-200 hover:text-stone-900 rounded-full hover:bg-lime-400 transition-all duration-300 "
                >
                  <span className="ml-3 lg:ml-4 font-sm">{t("buttons.free_trial")}</span>
                  <span className="ml-2 lg:ml-3 flex items-center justify-center size-9 bg-lime-300 text-stone-900 rounded-full transform transition-transform duration-300 group-hover:bg-stone-900 group-hover:text-gray-200">
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

              <div className="group relative">
                <Link
                  href="https://cal.com/meseji/30min"
                  className="relative flex items-center p-[5px] border text-stone-900 rounded-full hover:border-lime-400 hover:bg-lime-400 hover:text-stone transition-all duration-300"
                >
                  <span className="ml-3 lg:ml-4 font-sm">{t("buttons.book_demo")}</span>
                  <span className="ml-2 lg:ml-3 flex items-center justify-center size-9 bg-gray-100 text-stone-900 rounded-full transform transition-transform duration-300 group-hover:bg-black group-hover:text-white">
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

            <div className="mt-5 lg:mt-8 grid grid-cols-2 gap-x-5">
              <div className="py-5 flex justify-start items-center gap-2">
                <div className="flex gap-x-1">
                  <svg
                    className="size-4 text-gray-800"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="size-4 text-gray-800"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="size-4 text-gray-800"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="size-4 text-gray-800"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    className="size-4 text-gray-800"
                    width="51"
                    height="51"
                    viewBox="0 0 51 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.0352 1.6307L33.9181 16.3633C34.2173 16.6768 34.5166 16.9903 34.8158 16.9903L50.0779 19.1845C50.9757 19.1845 51.275 20.4383 50.6764 21.0652L39.604 32.3498C39.3047 32.6632 39.3047 32.9767 39.3047 33.2901L41.998 49.2766C42.2973 50.217 41.1002 50.8439 40.5017 50.5304L26.4367 43.3208C26.1375 43.3208 25.8382 43.3208 25.539 43.3208L11.7732 50.8439C10.8754 51.1573 9.97763 50.5304 10.2769 49.59L12.9702 33.6036C12.9702 33.2901 12.9702 32.9767 12.671 32.6632L1.29923 21.0652C0.700724 20.4383 0.999979 19.4979 1.89775 19.4979L17.1598 17.3037C17.459 17.3037 17.7583 16.9903 18.0575 16.6768L24.9404 1.6307C25.539 0.69032 26.736 0.69032 27.0352 1.6307Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <p className="flex text-sm text-gray-800">
                  <span className="font-bold">4.6</span> /5
                </p>

                <div className="flex items-center space-x-1">
                  <Image
                    src="https://ik.imagekit.io/g689orrur/meseji-marketing-assets/6388a700b817cb287ed1d925_heroG2.svg" // Replace with your image path
                    alt="Stars"
                    width={25}
                    height={25}
                  />
                  <Image
                    src="https://ik.imagekit.io/g689orrur/meseji-marketing-assets/6388a6ff6835135af804efce_herocapterra.svg" // Replace with your image path
                    alt="Stars"
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block lg:block md:w-1/2 lg:w-3/6 relative">
            {/* Main Image */}
            <div className="flex justify-center">
              <Image
                src="/hero1.png" // Replace with your image path
                alt="Hero Image"
                width={400}
                height={400}
              />
            </div>
            {/* Chat Bubbles */}
            {/* Top Left */}
            <div className="absolute top-12 left-0 bg-white p-4 rounded-lg shadow-md w-32">
              <p className="text-sm font-medium">Hey Mr</p>
              <p className="text-xs text-gray-500">Nice to meet you!</p>
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-12 left-4 bg-white p-4 rounded-lg shadow-md w-36">
              <p className="text-sm font-medium">Hi Martha</p>
              <p className="text-xs text-gray-500">How can I help you today?</p>
            </div>

            {/* Top Right */}
            <div className="absolute top-8 right-6 bg-white p-4 rounded-lg shadow-md w-36">
              <h3 className="text-sm font-bold">Active</h3>
              <div className="flex space-x-2 mt-2">
                {/* Replace with avatar images */}
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-6 right-12 bg-white p-4 rounded-lg shadow-md w-36">
              <p className="text-sm font-medium">Hope you&apos;re doing fine</p>
              <p className="text-xs text-gray-500">How can I help?</p>
            </div>
          </div>
        </div>
      </div>
    </SectionBackground>
  );
}
