import React from "react";
import SectionBackground from "../shared/section-bg";
import Image from "next/image";
import Title from "../shared/Title";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useTranslations } from "next-intl";

// const sections = [
//   {
//     title: "Broadcasting Made Easy with Meseji",
//     description:
//       "Simplify your customer communication with Meseji's broadcasting tools. Create, schedule, and send messages across multiple channels effortlessly while tracking performance and automating responses.",
//     features: [
//       { label: "Broadcast to multiple channels seamlessly" },
//       { label: "Schedule messages with ease" },
//       { label: "Track message performance in real-time" },
//       { label: "Automate responses for better engagement" },
//     ],
//     image:
//       "https://ik.imagekit.io/g689orrur/meseji-marketing-assets/whatsapp-chat.png",
//     Buttonlink: "/register?ref=mark-feat-message",
//     ButtonText: "Get Started",
//   },
//   {
//     title: "WhatsApp Business Flow Builder",
//     description:
//       "Automate customer interactions on WhatsApp with our drag-and-drop flow builder. Simplify workflows, integrate with CRMs, and enhance engagement with automated responses.",
//     features: [
//       { label: "Intuitive drag-and-drop interface" },
//       { label: "Integrate seamlessly with CRMs" },
//       { label: "Automate responses for quick support" },
//     ],
//     image:
//       "https://ik.imagekit.io/g689orrur/meseji-marketing-assets/flow-meseji.webp?updatedAt=1739555807468",
//     Buttonlink: "/regiter?ref=mark-feat-flow",
//     ButtonText: "Get Started",
//   },
//   {
//     title: "Shared Inbox for Teams and Businesses",
//     description:
//       "Streamline team collaboration with Meseji's shared inbox. Manage customer conversations, assign tasks, and organize messages to improve customer satisfaction.",
//     features: [
//       { label: "Assign conversations to team members" },
//       { label: "Tag messages for better organization" },
//       { label: "Manage all customer conversations in one place" },
//     ],
//     image:
//       "https://ik.imagekit.io/g689orrur/meseji-marketing-assets/meseji-chat-optim.webp?updatedAt=1739552062645",
//     Buttonlink: "/register?ref=mark-feat-inbox",
//     ButtonText: "Get Started",
//   },
//   {
//     title: "Seamless Meta Ads Integration",
//     description:
//       "Manage and optimize your Facebook and Instagram ad campaigns effortlessly with Meseji. Create engaging ads, track performance, and maximize your ROI.",
//     features: [
//       { label: "Easily create engaging ad campaigns" },
//       { label: "Track ad performance metrics" },
//       { label: "Optimize campaigns for maximum ROI" },
//     ],
//     image:
//       "https://ik.imagekit.io/g689orrur/meseji-marketing-assets/whatsapp-meta-ads.jpg",
//     Buttonlink: "/register?ref=mark-feat-ads",
//     ButtonText: "Get Started",
//   },
// ];

export function Show() {
  const t = useTranslations("home.features"); // Access "features" translations

  const services = t.raw("service");
  // return (
  //     <SectionBackground className="bg-gray-100">
  //       <div className="text-center">
  //         <Title tag={"Feature"}>What we Provide</Title>
  //       </div>
  //       <div className="py-12 space-y-8">
  //         {sections.map((section, index) => (
  //           <div
  //             key={index}
  //             className={cn(
  //               "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  //               index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse",
  //               "flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:justify-between"
  //             )}
  //           >
  //             <div className="w-full lg:w-1/2">
  //               <Image
  //                 src={section.image}
  //                 alt={section.title}
  //                 width={1950}
  //                 height={1950}
  //                 className="w-full rounded-xl object-cover"
  //                 quality={100}
  //                 priority
  //                 loading="eager"
  //               />
  //             </div>
  //             <div className="w-full lg:w-1/2">
  //               <div className="lg:max-w-xl">
  //                 <h2 className="font-medium font-clash text-3xl lg:text-4xl text-stone-800">
  //                   {section.title}
  //                 </h2>
  //                 <p className="text-gray-500 dark:text-neutral-500 mt-4">
  //                   {section.description}
  //                 </p>
  //                 <ul className="space-y-2 sm:space-y-4 mt-6">
  //                   {section.features.map((feature, i) => (
  //                     <li key={i} className="flex gap-x-3">
  //                       <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
  //                         <svg
  //                           className="shrink-0 size-3.5"
  //                           xmlns="http://www.w3.org/2000/svg"
  //                           width="24"
  //                           height="24"
  //                           viewBox="0 0 24 24"
  //                           fill="none"
  //                           stroke="currentColor"
  //                           strokeWidth="2"
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                         >
  //                           <polyline points="20 6 9 17 4 12" />
  //                         </svg>
  //                       </span>
  //                       <div className="grow">
  //                         <span className="text-sm sm:text-base text-gray-500">
  //                           {feature.label}
  //                         </span>
  //                       </div>
  //                     </li>
  //                   ))}
  //                 </ul>
  //                 <div className="group relative mt-10">
  //                   {/* <Link
  //                     aria-label={section?.ButtonText}
  //                     href={section?.Buttonlink}
  //                     className="relative inline-flex max-w-max items-center p-[5px] bg-stone-900 text-gray-200 hover:text-stone-900 rounded-full hover:bg-lime-400 transition-all duration-300"
  //                   >
  //                     <span className="ml-3 lg:ml-4 font-sm">
  //                       {section?.ButtonText}
  //                     </span>
  //                     <span className="ml-2 lg:ml-3 flex items-center justify-center size-9 bg-lime-300 text-stone-900 rounded-full transform transition-transform duration-300 group-hover:bg-stone-900 group-hover:text-gray-200">
  //                       <svg
  //                         stroke="currentColor"
  //                         fill="currentColor"
  //                         strokeWidth="0"
  //                         viewBox="0 0 448 512"
  //                         height="1em"
  //                         width="1em"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
  //                       </svg>
  //                     </span>
  //                   </Link> */}
  //                   <Link
  //                     aria-label={section?.ButtonText}
  //                     href={section?.Buttonlink}
  //                     className=" group inline-flex items-center gap-x-1 text-base decoration-2 font-medium  text-lime-500 pb-1 border-b-2 border-neutral-300 hover:border-lime-500 transition focus:outline-none focus:border-lime-500"
  //                   >
  //                     {section?.ButtonText}
  //                     <Icon.arrowUpRight className="size-5" />
  //                   </Link>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </SectionBackground>
  //   );
  // }

  return (
    <SectionBackground className="bg-gray-100">
      <div className="text-center">
        <Title tag={t("tag")}>{t("title")}</Title>
      </div>
      <div className="py-12 space-y-8">
        {services?.map((service, index) => (
          <div
            key={index}
            className={cn(
              "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse",
              "flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:justify-between"
            )}
          >
            <div className="w-full lg:w-1/2">
              <Image
                src={service?.image}
                alt={service?.title}
                width={1950}
                height={1950}
                className="w-full rounded-xl object-cover"
                quality={100}
                priority
                loading="eager"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-xl">
                <h2 className="font-medium font-clash text-3xl lg:text-4xl text-stone-800">
                  {`${service?.title}`}
                </h2>
                <p className="text-gray-500 dark:text-neutral-500 mt-4">
                  {`${service?.description}`}
                </p>
                <ul className="space-y-2 sm:space-y-4 mt-6">
                  {service?.features?.map((feature, i) => (
                    <li key={i} className="flex gap-x-3">
                      <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                        <svg
                          className="shrink-0 size-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <div className="grow">
                        <span className="text-sm sm:text-base text-gray-500">
                          {feature}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="group relative mt-10">
                  <Link
                    aria-label={service?.ButtonText}
                    href={service?.Buttonlink}
                    className=" group inline-flex items-center gap-x-1 text-base decoration-2 font-medium  text-lime-500 pb-1 border-b-2 border-neutral-300 hover:border-lime-500 transition focus:outline-none focus:border-lime-500"
                  >
                    {service?.ButtonText}
                    <Icon.arrowUpRight className="size-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionBackground>
  );
}
