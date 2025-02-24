"use client";
import React from "react";
import TemplatePreview from "../template/template-preview";
import CampaignChart from "./campaign-chart";

export default function CampaignOverview({ campaign, template ,totals,chartData}) {


  // Extract template components
  const templateHeader = template?.components?.find((c) => c.type === "HEADER") || null;
  const templateBody = template?.components?.find((c) => c.type === "BODY") || null;
  const buttons = template?.components?.find((c) => c.type === "BUTTONS")?.buttons || [];
  const quickReplies = template?.components?.find((c) => c.type === "QUICK_REPLIES")?.quick_replies || [];

  // format date function
  function formatDate(createdAt) {
    return new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
} 

  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 bg-gray-100">
      {/* Left Section (Campaign Overview & Chart) */}
      <div className="lg:col-span-3 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">📢 Campaign Overview</h2>

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Campaign Name", value: campaign?.campaignName || "N/A" },
              { label: "Campaign Type", value: campaign?.isScheduled ? "Scheduled" : "Broadcast" },
              { label: "Template Name", value: template?.name || "N/A" },
              { label: "Created At", value: campaign?.createdAt ? formatDate(campaign?.createdAt) : "N/A" },
            ].map((item, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-lg font-medium text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Sent", value: totals?.totalSent || 0 },
              { label: "Delivered", value: totals?.totalDelivered || 0 },
              { label: "Read", value: totals?.totalSeen || 0 },
              { label: "Clicked", value: totals?.totalClicked || 0 },
              { label: "Failed", value: totals?.totalFailed || 0 },
            ].map((item, index) => (
              <div key={index} className="p-3 text-center bg-gray-50 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-lg font-medium text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Status", value: campaign?.isScheduled ? "Scheduled" : "Broadcasted" },
            { label: "Total Cost Usage", value: campaign?.totalCost },
            { label: "Total Recipients", value: campaign?.totalRecipients },
          ].map((item, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className="text-lg font-medium text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 ">
          <CampaignChart data={chartData}/>
        </div>
      </div>

      {/* Right Section (Template Preview) */}
      <div className="lg:col-span-1 p-4">
        <TemplatePreview templateHeader={templateHeader} templateData={templateBody} buttons={buttons} quickReplies={quickReplies} />
      </div>
    </div>
  );
}
