import { Icon } from "@/components/Icon";
import SectionBackground from "../shared/section-bg";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Integrations() {
  const t = useTranslations("integrations");
  return (
    <SectionBackground className="bg-gradient-to-t from-white to-gray-50/70">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-center lg:gap-11 gap-7 inline-flex">
          <div className="w-full justify-between items-center lg:gap-12 gap-7 flex md:flex-row flex-col">
            <div className="flex-col justify-center md:items-start items-center gap-2.5 inline-flex">
              {/* <Title>Integrations</Title> */}
              <h2 className="text-gray-900 text-3xl font-medium font-clash leading-normal">
                {t("title")}
              </h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed md:text-start text-center">
                {t("description")}
              </p>
            </div>
            <Link
              href="/register"
              className=" group inline-flex items-center gap-x-1 text-base decoration-2  font-medium  text-lime-500 pb-1 border-b-2 border-neutral-300 hover:border-lime-500 transition focus:outline-none focus:border-lime-500"
            >
              {t("cta")}
              <Icon.arrowUpRight className="size-5" />
            </Link>
          </div>
          <div className="w-full justify-start items-center gap-6 flex md:flex-row flex-col">
            <div className="w-full p-6 rounded-2xl border border-gray-200 hover:border-lime-600 hover:bg-lime-50 transition-all duration-700 ease-in-out flex-col justify-start items-center gap-3 inline-flex">
              <Link href="">
                <Icon.shopify className="size-7" />
              </Link>
              <h5 className="text-center text-gray-900 text-base font-semibold leading-relaxed">
                Shopify
              </h5>
            </div>
            <div className="w-full p-6 rounded-2xl border border-gray-200 hover:border-lime-600 hover:bg-lime-50 transition-all duration-700 ease-in-out flex-col justify-start items-center gap-3 inline-flex">
              <Link aria-label={""} href="">
                <Icon.bigcommerce className="size-7" />
              </Link>
              <h5 className="text-center text-gray-900 text-base font-semibold leading-relaxed">
                BigCommerce
              </h5>
            </div>

            <div className="w-full p-6 rounded-2xl border border-gray-200 hover:border-lime-600 hover:bg-lime-50 transition-all duration-700 ease-in-out flex-col justify-start items-center gap-3 inline-flex">
              <Link href="">
                <Icon.woocommerce className="size-7" />
              </Link>
              <h5 className="text-center text-gray-900 text-base font-semibold leading-relaxed">
                Woocommerce
              </h5>
            </div>
            <div className="w-full p-6 rounded-2xl border border-gray-200 hover:border-lime-600 hover:bg-lime-50 transition-all duration-700 ease-in-out flex-col justify-start items-center gap-3 inline-flex">
              <Link href="">
                <Icon.salesforce className="size-7" />
              </Link>
              <h5 className="text-center text-gray-900 text-base font-semibold leading-relaxed">
                Salesforce
              </h5>
            </div>
            <div className="w-full p-6 rounded-2xl border border-gray-200 hover:border-lime-600 hover:bg-lime-50 transition-all duration-700 ease-in-out flex-col justify-start items-center gap-3 inline-flex">
              <Link href="">
                <Icon.zendesk className="size-7" />
              </Link>
              <h5 className="text-center text-gray-900 text-base font-semibold leading-relaxed">
                Zendesk
              </h5>
            </div>
          </div>
        </div>
      </div>
    </SectionBackground>
  );
}
