import { Integrations } from "@/components/marketing/home/Integrations";
import Faqs from "@/components/marketing/shared/faq";
import { integrations } from "@/config/data/integrations";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import LeadForm from "../../../../../components/marketing/lead-form";
import { Stats } from "@/components/marketing/home/Stats";
import { Feature } from "@/components/marketing/home/feature";
import { Testimonial } from "@/components/marketing/home/Testimonial";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    integrations.map((integration) => ({
      locale,
      integration: integration.slug,
    })));
}

export async function generateMetadata({ params }) {
  const integration = integrations.find(
    (integration) => integration.slug === params.integration
  );
  return {
    title: integration.title,
    description: integration.description,
    image: integration?.image,
    alternates: {
      canonical: `${siteConfig.url}/integrations/${integration.slug}`,
    },
  };
}

export default async function Page({ params }) {
  const integration = integrations.find(
    (integration) => integration.slug === params.integration
  );

  return (
    <section className="relative py-12 sm:py-14 bg-stone-50">
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 xl:grid-cols-2">
          <div className="lg:ml-8 text-center xl:col-span-1 lg:text-left md:px-16 lg:px-0 xl:pr-20 sticky top-20">
            <p>{integration?.tag}</p>
            <h1 className="block text-4xl font-clash font-medium text-stone-950 md:text-4xl lg:text-6xl leading-none lg:leading-tight">
              {integration.title}
            </h1>
            <p className="mt-2 text-lg text-stone-600 sm:mt-6 font-inter ">
              {integration?.description}
            </p>

            <div className="group relative mt-10">
              <Link
                href={integration?.ButtonLink || "#"}
                className="relative inline-flex max-w-max items-center p-[5px] bg-stone-900 text-stone-200 hover:text-stone-900 rounded-full hover:bg-lime-400 transition-all duration-300"
              >
                <span className="ml-3 lg:ml-4 font-sm">
                  {integration?.ButtonText || "Free Trial"}
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
            <span className="text-sm text-stone-500 mt-4 ms-2 block">
              No setup fees.
            </span>
          </div>

          <div className="xl:col-span-1">
            <LeadForm />
          </div>
        </div>
      </div>

      <Feature integration={integration} />
      <Stats stats={integration.stats} />
      <Integrations />
      <Testimonial />
      <Faqs
        faqTitle={integration?.faqTitle}
        faqDescription={integration?.faqDescription}
        faqs={integration?.faqs}
      />
    </section>
  );
}
