import { Icon } from "@/components/Icon";
import Link from "next/link";

export function Feature({ integration }) {
  return (
    <div className="bg-white rounded-3xl mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-16 my-12">
      <div className="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
        <div className="relative w-full text-center lg:text-left lg:w-2/4">
          <h2 className="text-4xl font-semibold font-clash text-stone-900 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
            {integration?.features_title}
          </h2>
        </div>
        <div className="relative w-full text-center lg:text-left lg:w-2/5">
          <p className="text-lg font-normal text-stone-500 mb-5">
            {integration?.features_description}
          </p>
          <Link
            href="/register"
            className=" group inline-flex items-center gap-x-1 text-base decoration-2  font-medium  text-lime-500 pb-1 border-b-2 border-neutral-300 hover:border-lime-500 transition focus:outline-none focus:border-lime-500"
          >
            All Integrations
            <Icon.arrowUpRight className="size-5" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
        {integration?.features.map((feature, index) => (
          <div
            key={index}
            className="group relative bg-stone-100 rounded-2xl p-4 transition-all duration-500 hover:bg-indigo-600"
          >
            <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z"
                  stroke="#4F46E5"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-stone-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
              {feature.feature}
            </h4>
            <p className="text-sm font-normal text-stone-500 transition-all duration-500 leading-5 group-hover:text-white">
              {feature.feature_description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
