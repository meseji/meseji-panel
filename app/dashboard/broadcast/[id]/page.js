"use client";
import MainHeader from "@/components/dashboard/shared/MainHeader";
import React from "react";
import SingleCampaignHistory from "@/components/dashboard/broadcast/single-campaign-history";
import { useGetSingleCampaignQuery } from "@/lib/features/api/whatsappCampaignApiSlice";

export default function Page({ params }) {
  const {
    data: singleCampaignData,
    isLoading,
    error,
  } = useGetSingleCampaignQuery(params?.id,{skip: !params?.id});
  return (
    <div className="flex flex-col h-full w-full space-y-1">
      <MainHeader name={singleCampaignData?.campaign?.campaignName} />
      <SingleCampaignHistory campaign={singleCampaignData?.campaign} recepients = {singleCampaignData?.recepients} chartData={singleCampaignData?.chartData} totals ={singleCampaignData
      ?.totals}/>
    </div>
  );
}
