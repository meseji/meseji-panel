import Image from "next/image";
import React from "react";
import Title from "../shared/Title";
import SectionBackground from "../shared/section-bg";
import { Icon } from "@/components/Icon";
import { useTranslations } from "next-intl";

export function HowDo() {
  const t = useTranslations("home.howDo");
  return (
    <SectionBackground className="bg-gradient-to-t from-white to-gray-50/70">
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        {/* Heading Div */}
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12 lg:mb-16">
          <Title tag={t("tag")}>{t("title")}</Title>
          <p className="mx-auto mt-4 max-w-[528px] text-[#aeaeae]">
          {t("description")} 
          {/* Experience the power of Meseji—where innovation meets simplicity. */}
          </p>
        </div>
        {/* How it Works */}
        <div className="flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-evenly lg:gap-x-8 ">
          {/* Item */}
          <div className="max-w-72 relative w-full  p-10  max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4  space-y-4 bg-white shadow rounded-2xl border border-gray-200 hover:border-lime-600 hover:bg-lime-50 transition-all duration-700 ease-in-out">
            <div className="flex size-10 flex-col  justify-start rounded-full ">
              <Icon.broadcastM className="size-7" />
            </div>
            <p className="text-xl font-semibold">
              {t("items.broadcast.title")}
              {/* Broadcast */}
              </p>
            <p className="text-sm text-[#636262]">
            {t("items.broadcast.description")}
              {/* Increase engagement, conversions, and customer loyalty with
              tailored communication. */}
            </p>
          </div>

          <div className="max-w-72 relative w-full  p-10  max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4  space-y-4 bg-white shadow rounded-2xl border border-gray-200 hover:border-lime-600 hover:bg-lime-50 transition-all duration-700 ease-in-out">
            <div className="flex size-10 flex-col  justify-start rounded-full ">
              <Icon.automationM className="size-7" />
            </div>
            <p className="text-xl font-semibold">
            {t("items.automation.title")}
              {/* Automation */}
              </p>
            <p className="text-sm text-[#636262]">
              {t("items.automation.description")}
              {/* Create custom workflows tailored to your business Chat needs for
              seamless operations. */}
            </p>
          </div>
          <div className="max-w-72 relative w-full  p-10  max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4  space-y-4 bg-white  shadow rounded-2xl border border-gray-200 hover:border-lime-600 hover:bg-lime-50 transition-all duration-700 ease-in-out">
            <div className="flex size-10 flex-col  justify-start rounded-full ">
              <Icon.globeM className="size-7" />
            </div>
            <p className="text-xl font-semibold">
              
            {t("items.tracking.title")}
            {/* Tracking */}
            </p>
            <p className="text-sm text-[#636262]">
            {t("items.tracking.description")}
              {/* Monitor customer behavior, campaign performance, Chat, and sales
              metrics in real-time. */}
            </p>
          </div>
          <div className="max-w-72 relative w-full  p-10  max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4  space-y-4 bg-white  shadow rounded-2xl border border-gray-200 hover:border-lime-600 hover:bg-lime-50 transition-all duration-700 ease-in-out">
            <div className="flex size-10 flex-col  justify-start rounded-full ">
              <Icon.crmM className="size-7" />
            </div>
            <p className="text-xl font-semibold">
              {t("items.crm.title")}
              
              {/* CRM */}
              </p>
            <p className="text-sm text-[#636262]">
              {t("items.crm.description")}
              
              {/* Customer interactions, preferences, and purchase history to
              deliver personalized experiences. */}
            </p>
          </div>
        </div>
      </div>
    </SectionBackground>
  );
}
