import Image from "next/image";
import Link from "next/link";

export function Document() {
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {/* Component */}
        <div className="grid grid-cols-1 items-center justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
          {/* Image Div */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-[#8fff9e] p-6">
            <Image
              src="/document.png"
              alt="Features Image"
                width={640}
                height={640}
                quality={80}
              className="inline-block h-full w-full max-w-[640px] rounded-2xl object-cover"
            />
          </div>
          {/* Content */}
          <div className="max-w-[720px]">
            <h2 className="mb-2 mt-6 pb-4 text-3xl font-extrabold md:text-5xl">
              Meseji API Documentation
            </h2>
            <p className="mb-10 max-w-[528px] text-xl text-[#636262] lg:mb-12">
              Learn how to integrate Meseji APIs and SDKs into your applications
              to send messages, manage contacts, and more. Get started with Whatsapp API and Grow your business with Meseji.
            </p>
            <Link
              href="https://docs.meseji.app"
              className="mr-5 inline-block rounded-full border border-solid border-[#c9fd02] bg-[#c9fd02] px-6 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white"
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
