"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Send,
  CheckCircle,
  MousePointerClick,
  XCircle,
  CheckCheck,
} from "lucide-react";
import CampaignOverview from "./campaign-overview";
import RecipientsOverview from "./recipients-overview";
import { useGetSingleTemplateQuery } from "@/lib/features/api/whatsappTemplateApiSlice";

const tabs = [
  { key: "overview", label: "Overview", icon: BarChart },
  { key: "sent", label: "Sent", icon: Send },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
  { key: "read", label: "Read", icon: CheckCheck },
  { key: "clicked", label: "Clicked", icon: MousePointerClick },
  { key: "failed", label: "Failed", icon: XCircle },
];

export default function SingleCampaignHistory({ campaign, recepients,chartData,totals }) {
  // local states
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  console.log(recepients)
  // rtk query calling api
  const {
    data: singleTemplate,
    isLoading,
    error,
  } = useGetSingleTemplateQuery(campaign?.templateId,{skip: !campaign?.templateId});
  return (
    <div className="w-full h-full bg-white mx-auto">
      <div className="flex border-b gap-6 overflow-x-auto hide-scrollbar">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${
                activeTab === key
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab(key)}
          >
            <Icon size={16} />
            {label}{" "}
          </button>
        ))}
      </div>
      {activeTab === "overview" && (
        <CampaignOverview
          campaign={campaign}
          recepients={recepients}
          template={singleTemplate?.data}
          totals={totals}
          chartData={chartData}
        />
      )}
      {activeTab !== "overview" && (
        <RecipientsOverview recepients={recepients} activeTab={activeTab} />
      )}
    </div>
  );
}
