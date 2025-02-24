import { Icon } from "@/components/Icon";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
// import LanguageSwitcher from "./language-switcher";

export function Footer() {
  const menus = [
    {
      title: "Meseji",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Contact Us", href: "/contact-us" },
        { name: "Blog", href: "/blog" },
        { name: "Pricing", href: "/pricing" },
        { name: "Career", href: "https://wellfound.com/company/meseji/jobs" },
      ],
    },
    {
      title: "Integrations",
      links: [
        { name: "Shopify", href: "/integrations/shopify-whatsapp-integration" },
        { name: "WooCommerce", href: "/integrations/whatsapp-for-woocommerce" },
        { name: "Magento", href: "/integrations/magento-whatsapp-integration" },
        {
          name: "BigCommerce",
          href: "/integrations/bigcommerce-whatsapp-integration",
        },
        {
          name: "Google Sheets",
          href: "/integrations/google-sheets-whatsapp-integration",
        },
        { name: "Zapier", href: "/integrations/zapier-whatsapp-integration" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "FAQs", href: "https://docs.meseji.app/documentation/faqs" },
        { name: "Help Center", href: "#" },
        {
          name: "API Docs",
          href: "https://docs.meseji.app/api-reference/apireference/AuthController_register",
        },
        { name: "User Guide", href: "#" },
        { name: "Uptime Status", href: "https://status.meseji.app" },
      ],
    },
    {
      title: "Compare",
      links: [
        { name: "Twilio  vs Meseji ", href: "#" },
        { name: "AiSensy vs Meseji", href: "#" },
        { name: "Wati vs Meseji ", href: "#" },
        { name: "Infobip vs Meseji", href: "#" },
        { name: "Interakt vs Meseji", href: "#" },
        { name: "Plivo vs Meseji", href: "#" },
        { name: "Vonage vs Meseji", href: "#" },
      ],
    },
  ];
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-black">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-10 xl:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="flex flex-col col-span-full mb-10 lg:col-span-2 lg:mb-0 items-center lg:items-start">
            <Link
              aria-label={siteConfig?.name}
              href={siteConfig?.url}
              className="flex justify-center md:justify-center lg:justify-start"
            >
              {/* black logo */}
              {/* <Image src="/meseji.png" alt="logo" width={120} height={120} />  */}
              {/* lite logo */}
              <Image
                src="https://ik.imagekit.io/g689orrur/Logo/meseji-full-lite.png"
                width={140}
                height={140}
                alt="meseji lite logo"
              />
            </Link>
            <p className="py-8 text-sm text-gray-300 max-w-sm text-center md:text-center lg:text-left ">
              Meseji is a messaging platform that helps businesses to connect
              with their customers via SMS, WhatsApp, and other messaging
              channels.
            </p>
            {/* <LanguageSwitcher /> */}
          </div>
          {menus?.map((menu, index) => (
            <div key={index} className="lg:mx-auto text-left">
              <h4 className="text-lg text-gray-400 font-semibold mb-7">
                {menu?.title}
              </h4>
              <ul className="text-sm transition-all duration-500">
                {menu?.links?.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-5">
                    <Link
                      aria-label={link?.name}
                      href={link?.href}
                      className="text-gray-200 hover:text-gray-300 font-medium"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="py-7 border-t border-gray-200">
       
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-300 ">
              ©<Link href={siteConfig?.url}>Meseji</Link> {currentYear}, All
              rights reserved.
            </span>
            <ul className="flex space-x-4 mt-4 lg:mt-0 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400  hover:text-gray-300 transition-all duration-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-gray-400  hover:text-gray-300 transition-all duration-500"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-gray-400  hover:text-gray-300 transition-all duration-500"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-gray-400 hover:text-gray-300 transition-all duration-500"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
            <div className="flex mt-4 space-x-4 sm:justify-center">
              <Link
                href={siteConfig?.links?.twitter}
                className="w-9 h-9 rounded-full border flex justify-center items-center hover:bg-lime-600 text-gray-400 hover:text-gray-100"
              >
                <Icon.twitter />
              </Link>
              <Link
                href={siteConfig?.links?.instagram}
                className="w-8 h-8 rounded-full border flex justify-center items-center hover:bg-lime-600 text-gray-400 hover:text-gray-100"
              >
                <Icon.instagram />
              </Link>
              <Link
                href={siteConfig?.links?.linkedin}
                className="w-8 h-8 rounded-full border flex justify-center items-center hover:bg-lime-600 text-gray-400 hover:text-gray-100"
              >
                <Icon.linkedin />
              </Link>
              <Link
                href={siteConfig?.links?.facebook}
                className="w-8 h-8 rounded-full border flex justify-center items-center hover:bg-lime-600 text-gray-400 hover:text-gray-100"
              >
                <Icon.facebook />
              </Link>
              <Link
                href={siteConfig?.links?.youtube}
                className="w-8 h-8 rounded-full border flex justify-center items-center hover:bg-lime-600 text-gray-400 hover:text-gray-100"
              >
                <Icon.youtube />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
