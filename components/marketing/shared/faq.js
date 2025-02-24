"use client";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";

export default function Faqs({ faqTitle, faqDescription, faqs }) {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq, index) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div class="bg-stone-50">
      <section>
        <Script
          id="faq-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-8 md:px-10 md:py-14">
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
            <p className="font-inter mb-2 text-center text-sm font-medium">
              FAQs
            </p>
            <h2 className="font-clash text-xl lg:text-3xl font-semibold text-black">
              {faqTitle}
            </h2>
            <p className="font-inter mt-4 max-w-xl px-5 text-base font-light text-gray-500 lg:max-w-lg">
              {faqDescription}
            </p>
          </div>
          <div className="mt-10 flex w-full flex-col">
            {faqs.map((faq, index) => (
              <>
                <div
                  key={index}
                  className="relative my-3 w-full rounded-md px-12 py-3"
                >
                  <div className="flex justify-between">
                    <h2
                      className="text-lg font-meduim text-black max-w-3xl"
                      onClick={() => toggleFAQ(index)}
                    >
                      {faq.question}
                    </h2>
                    <button
                      className=" right-5 top-12 focus:outline-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="white"></circle>
                        <path
                          d="M7.04688 11.9999H16.9469"
                          stroke="black"
                          strokeWidth="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        {openFAQ !== index && (
                          <path
                            d="M12 7.05005V16.95"
                            stroke="black"
                            strokeWidth="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        )}
                      </svg>
                    </button>
                  </div>

                  {openFAQ === index && (
                    <p className="font-inter mt-4 text-base font-light text-gray-500 max-w-3xl">
                      {faq.answer}
                    </p>
                  )}
                </div>
                <div className="mr-4 ml-8 border border-gray-200"></div>
              </>
            ))}
          </div>
          <p className="font-inter mx-auto mt-12 text-center text-base text-gray-500">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our
            <Link href="#" className="text-black font-bold">
              {" "}
              customer support team.
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
