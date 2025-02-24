import SectionBackground from "../shared/section-bg";
import Title from "../shared/Title";

export function Stats({ title, description, stats }) {
  return (
    <SectionBackground className="bg-neutral-900 ">
      {/* Container */}
      {/* <div className="mx-auto w-full max-w-7xl px-5  md:px-10 ">
       
        <Title className="text-center">Why WhatsApp?</Title>
        <p className="text-lg font-normal text-center text-gray-500 max-w-md md:max-w-2xl mx-auto">
          WhatsApp is the most popular messaging app in the world.
        </p>
       
        <div className=" lg:grid-cols-48 mx-auto grid w-full max-w-[960px] grid-cols-1 gap-5 px-16 py-10 sm:grid-cols-2 md:grid-cols-3 md:gap-12 lg:grid-cols-4">
         
          <div className="flex flex-col items-center ">
            <p>Open Rates</p>
            <h2 className="mb-4 mt-6 text-3xl font-extrabold md:text-5xl">
              98<span className="text-lime-500">%</span>
            </h2>
          </div>
         
          <div className="flex flex-col items-center">
            <p>Click Rates</p>
            <h2 className="mb-4 mt-6 text-3xl font-extrabold md:text-5xl">
              60<span className="text-lime-500">%</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-center">
            <p>Active Users</p>
            <h2 className="mb-4 mt-6 text-3xl font-extrabold md:text-5xl">
              2.60<span className="text-lime-500">Bn+</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-center">
            <p>Engagment Rates</p>
            <h2 className="mb-4 mt-6 text-3xl font-extrabold md:text-5xl">
              70<span className="text-lime-500">%</span>
            </h2>
          </div>
          <div className=""></div>
        </div>
      </div> */}

      {/* <div class="bg-neutral-900">
        <div class="max-w-5xl px-4 xl:px-0 py-10 mx-auto">
          <div class="border border-neutral-800 rounded-xl">
            <div class="p-4 lg:p-8 bg-gradient-to-bl from-neutral-800 via-neutral-900 to-neutral-950 rounded-xl">
              <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-y-20 gap-x-12">
                <div class="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-neutral-800 before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0">
                  <item.icon className="size-5" />
                  <div class="mt-3 sm:mt-5">
                    <h3 class="text-lg sm:text-3xl font-semibold text-white">
                      2,000+
                    </h3>
                    <p class="mt-1 text-sm sm:text-base text-neutral-400">
                      Preline partners
                    </p>
                  </div>
                </div>

                <div class="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-neutral-800 before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0">
                  <div class="flex justify-center items-center -space-x-5">
                    <img
                      class="relative z-[2] flex-shrink-0 size-8 rounded-full border-[3px] border-neutral-800"
                      src="https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                      alt="Image Description"
                    />
                    <img
                      class="relative z-[1] flex-shrink-0 size-8 rounded-full border-[3px] border-neutral-800 -mt-7"
                      src="https://images.unsplash.com/photo-1570654639102-bdd95efeca7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                      alt="Image Description"
                    />
                    <img
                      class="relative flex-shrink-0 size-8 rounded-full border-[3px] border-neutral-800"
                      src="https://images.unsplash.com/photo-1679412330254-90cb240038c5?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=2.5&amp;w=320&amp;h=320&amp;q=80"
                      alt="Image Description"
                    />
                  </div>
                  <div class="mt-3 sm:mt-5">
                    <h3 class="text-lg sm:text-3xl font-semibold text-white">
                      85%
                    </h3>
                    <p class="mt-1 text-sm sm:text-base text-neutral-400">
                      Happy customers
                    </p>
                  </div>
                </div>

                <div class="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-neutral-800 before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0">
                  <svg
                    class="flex-shrink-0 size-6 sm:size-8 text-[#ff0] mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                    <path d="m2 16 6 6" />
                    <circle cx="16" cy="9" r="2.9" />
                    <circle cx="6" cy="5" r="3" />
                  </svg>
                  <div class="mt-3 sm:mt-5">
                    <h3 class="text-lg sm:text-3xl font-semibold text-white">
                      $55M+
                    </h3>
                    <p class="mt-1 text-sm sm:text-base text-neutral-400">
                      Ads managed yearly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Title className="text-center bg-gradient-to-bl from-stone-100 to-gray-300">
        {title}
      </Title>
      <p className="text-lg font-normal text-center text-stone-300 max-w-md md:max-w-2xl mx-auto mb-6">
        {description}
      </p>
      <div className="max-w-5xl px-4 xl:px-0  mx-auto">
        <div className="border border-neutral-800 rounded-xl">
          <div className="p-4 lg:p-8 bg-gradient-to-bl from-neutral-800 via-neutral-900 to-neutral-950 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-y-20 gap-x-12">
              {stats?.map((stat) => (
                <div
                  key={stat.id}
                  className="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-neutral-800 before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0"
                >
                  {/* <stat.icon className="flex-shrink-0 size-6 sm:size-8 text-yellow-500 mx-auto" /> */}
                  <div className="mt-3 sm:mt-5">
                    <h3 className="text-lg sm:text-3xl font-semibold text-white">
                      {stat.value}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-neutral-400">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-neutral-100">
        <div className="max-w-5xl px-4 xl:px-0 py-10 mx-auto">
          <div className="border border-neutral-300 rounded-xl">
            <div className="p-4 lg:p-8 bg-gradient-to-bl from-neutral-200 via-neutral-100 to-neutral-50 rounded-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-y-20 gap-x-12">
                {stats?.map((stat) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={stat.id}
                      className="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-neutral-300 before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0"
                    >
                      <IconComponent className="flex-shrink-0 size-6 sm:size-8 text-yellow-500 mx-auto" />
                      <div className="mt-3 sm:mt-5">
                        <h3 className="text-lg sm:text-3xl font-semibold text-gray-900">
                          {stat.value}
                        </h3>
                        <p className="mt-1 text-sm sm:text-base text-neutral-600">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <p class="mt-2">
        <a
          class="group inline-flex items-center gap-x-2 font-medium text-sm text-[#ff0] decoration-2 hover:underline focus:outline-none focus:underline"
          href="#"
        >
          Job openings
          <svg
            class="flex-shrink-0 size-4 transition group-hover:translate-x-0.5 group-hover:translate-x-0 group-focus:translate-x-0.5 group-focus:translate-x-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </p> */}
    </SectionBackground>
  );
}
