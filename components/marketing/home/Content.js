import Image from "next/image";

export function Content() {
  return (
    <section className="">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:px-6">
        <div className="flex flex-col items-center justify-between mb-8 md:flex-row text-start">
          <h2 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            A Global Solution for Your
            <br />
            Communication Needs
          </h2>
          <p className="max-w-xl text-gray-500 sm:text-base dark:text-gray-400">
            Meseji provides powerful APIs and marketing tools designed to help{" "}
            <br /> businesses connect with their customers across the globe.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <Image
              className="object-cover rounded-2xl"
              fill
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=1471&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="meseji"
            />
          </div>
          <div className="p-8 border border-gray-800 rounded-2xl">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-[#D0F500] lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary-600 lg:w-8 lg:h-8 dark:text-primary-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
            </div>
            <h3 className="mb-8 text-5xl font-bold dark:text-white">+70%</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Drive traffic to your WhatsApp Business Profile
            </p>
          </div>
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <Image
              className="object-cover rounded-2xl"
              fill
              src="https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="meseji"
            />
          </div>
          <div className="p-8 border border-gray-800 rounded-2xl">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-[#D0F500] lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary-600 lg:w-8 lg:h-8 dark:text-primary-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <h3 className="mb-8 text-5xl font-bold dark:text-white">68%</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Make it easy for users to message your business and convert it to
              sales
            </p>
          </div>
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <Image
              className="object-cover rounded-2xl"
              fill
              src="https://images.unsplash.com/photo-1602583576845-9cf033a9df84?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="meseji"
            />
          </div>
          <div className="p-8 border border-gray-800 rounded-2xl">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-[#D0F500] lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary-600 lg:w-8 lg:h-8 dark:text-primary-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                />
              </svg>
            </div>
            <h3 className="mb-8 text-5xl font-bold dark:text-white">2M+</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Make it seamless for customers to engage with your business
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
