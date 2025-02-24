import Image from "next/image";

export function ClientLogo() {
  return (
    <section className="bg-black text-white">
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        {/* Title */}
        <h5 className="mb-6 text-xl font-bold md:mb-10 lg:mb-12">
          Leading companies trust Meseji for their communication needs
        </h5>
        {/* Component */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12 md:grid-cols-5 md:gap-6">
          <Image
            className="mx-auto"
            src="/path/to/microsoft-logo.svg"
            alt="Microsoft Logo"
            width={150}
            height={50}
          />
          <Image
            className="mx-auto"
            src="/path/to/paypal-logo.svg"
            alt="PayPal Logo"
            width={150}
            height={50}
          />
          <Image
            className="mx-auto"
            src="/path/to/google-logo.svg"
            alt="Google Logo"
            width={150}
            height={50}
          />
          <Image
            className="mx-auto"
            src="/path/to/chase-logo.svg"
            alt="Chase Logo"
            width={150}
            height={50}
          />
          <Image
            className="mx-auto"
            src="/path/to/walmart-logo.svg"
            alt="Walmart Logo"
            width={150}
            height={50}
          />
        </div>
      </div>
    </section>
  );
}
