import { Feature } from "@/components/marketing/home/feature";
import { Testimonial } from "@/components/marketing/home/Testimonial";
import LeadForm from "@/components/marketing/lead-form";
import Faqs from "@/components/marketing/shared/faq";
import { industries } from "@/config/data/industries";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import Link from "next/link";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => 
    industries.map((industrie) => ({
      locale,
      industrie: industrie.slug,
  })))
}

export async function generateMetadata({ params }) {
  const industrie = industries.find(
    (industrie) => industrie.slug === params.industrie
  );
  return {
    title: industrie.title,
    description: industrie.description,
    image: industrie?.image,
    alternates: {
      canonical: `${siteConfig.url}/integrations/${industrie.slug}`,
    },
  };
}

export default async function Page({ params }) {
  const industrie = industries?.find(
    (industrie) => industrie?.slug === params?.industrie
  );

  return (
    <section class="relative py-12 sm:py-14 bg-stone-50">
      <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-y-4 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
          <div class="text-center xl:col-span-1 lg:text-left md:px-16 lg:px-0 xl:pr-20">
            <h1 class="block text-4xl font-clash font-medium text-stone-950 md:text-4xl lg:text-6xl leading-none lg:leading-[1.1]">
              {industrie?.title}
            </h1>
            <p class="mt-2 text-lg text-stone-600 sm:mt-6 font-inter ">
              {industrie?.description}
            </p>

            <div className="group relative mt-10">
              <Link
                href={industrie?.ButtonLink || "#"}
                className="relative inline-flex max-w-max items-center p-[5px] bg-stone-900 text-stone-200 hover:text-stone-900 rounded-full hover:bg-lime-400 transition-all duration-300"
              >
                <span className="ml-3 lg:ml-4 font-sm">
                  {industrie?.ButtonText || "Free Trial"}
                </span>
                <span className="ml-2 lg:ml-3 flex items-center justify-center size-9 bg-lime-300 text-stone-900 rounded-full transform transition-transform duration-300 group-hover:bg-stone-900 group-hover:text-stone-200">
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
            <span class="text-sm text-stone-500 mt-4 ms-2 block">
              No setup fees.
            </span>
          </div>

          <div className="xl:col-span-1">
            <LeadForm />
          </div>
        </div>
      </div>

      <Feature integration={industrie} />
      <Testimonial />
      <Faqs
        faqTitle={industrie?.faqTitle}
        faqDescription={industrie?.faqDescription}
        faqs={industrie?.faqs}
      />
    </section>
  );
}
