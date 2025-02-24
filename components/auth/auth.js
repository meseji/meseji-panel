import Link from "next/link";

export default function Auth({ children }) {
  return (
    <section className="grid gap-0 min-h-screen md:grid-cols-2 bg-white">
      <div className="hidden md:flex items-center justify-center bg-gray-100 rounded-s-xl ml-4 my-4">
        <div className="mx-auto max-w-md px-5 py-16 md:px-10 md:py-20">
          <div className="flex justify-center">
            <img
              className="w-24 h-24"
              src="/android-chrome-192x192.png"
              alt="meseji"
            />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Welcome back!
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Log in to your account to continue
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between px-5 py-14 md:px-8 md:py-18 min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
        <footer className="w-full max-w-xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div>
              <p className="text-sm text-gray-600">© 2024 Meseji</p>
            </div>

            <div className="space-x-4 text-sm">
              <Link
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="/terms-conditions"
              >
                Terms
              </Link>
              <Link
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="/privacy-policy"
              >
                Privacy
              </Link>
              <Link
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="/contact-us"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
