"use client";
import FacebookConnect from "@/components/auth/facebook-connect";
import { ConversationAnalytics } from "@/components/dashboard/maindash/ConAna";
import { OverviewCards } from "@/components/dashboard/maindash/overview-card";
import QrCode from "@/components/dashboard/maindash/qr-code";
import { TemplateAnalytics } from "@/components/dashboard/maindash/TempAna";
import { Icon } from "@/components/Icon";
import { NavUser } from "@/components/NavUser";
import Button from "@/components/ui/Button";
import React from "react";

export default function Page() {
  return (
    <main className="flex flex-col py-2 h-auto gap-2">
      <div className="flex justify-between items-center h-14 mx-4">
        <h2 className="text-2xl font-semibold text-gray-800  ">
          Welcome back, User
        </h2>
        <div className="flex items-center justify-end space-x-3">
          <div className="h-11 w-11 text-gray-800 rounded-full flex justify-center items-center">
            <Icon.bell className="size-5" />
          </div>
          <div className="h-10 text-gray-800 rounded-full flex justify-center items-center">
            <NavUser />
          </div>
        </div>
      </div>
      <div className="flex py-2 h-auto gap-2 flex-col-reverse lg:flex-row">
        <div className="h-auto w-full lg:w-9/12 space-y-4">
          <OverviewCards />
          <div className="grid lg:grid-cols-2 grid-rows-1 gap-4 ">
            <div className="justify-center">
              <TemplateAnalytics />
            </div>
            <div className=" justify-center">
              <ConversationAnalytics />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2  rounded-lg border-gray-200 dark:border-gray-600 h-48 md:h-72"></div>
            <div className="border-2  rounded-lg border-gray-200 dark:border-gray-600 h-48 md:h-72"></div>
          </div>
          <div className="mb-4 flex justify-center items-center border-2 rounded-lg border-gray-200 dark:border-gray-600 h-32 md:h-64">
            <Button variant="primary">Stats</Button>
          </div>
        </div>
        <div className="h-full w-full lg:w-3/12 mb-4 space-y-2">
          <FacebookConnect />
          <QrCode />
        </div>
      </div>
    </main>
  );
}
