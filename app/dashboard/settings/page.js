"use client";
import Title from "@/components/ui/Title";
import React from "react";
import { OverviewCards } from "@/components/dashboard/maindash/overview-card";
import { TemplateAnalytics } from "@/components/dashboard/maindash/TempAna";
import { MessagingTrends } from "@/components/dashboard/maindash/MeshTr";
import { Recommendations } from "@/components/dashboard/maindash/Recom";
import { ConversationAnalytics } from "@/components/dashboard/maindash/ConAna";
import MainHeader from "@/components/dashboard/shared/MainHeader";

export default function Page() {
  return (
    <div className="flex flex-col h-full w-full space-y-2">
      <MainHeader title="Settings"></MainHeader>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Marketing Analytics Dashboard
        </h1>
        <OverviewCards />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TemplateAnalytics />
          <ConversationAnalytics />
        </div>
        <MessagingTrends />
        <Recommendations />
      </div>
    </div>
  );
}
