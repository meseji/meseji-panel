import { Icon } from "@/components/Icon";
import React, { useEffect, useState } from "react";
import ExportButton from "@/components/ui/ExportButton";
import FilterButton from "@/components/ui/FilterButton";
import { useGetCampaignQuery } from "@/lib/features/api/whatsappCampaignApiSlice";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import RadialProgress from "../shared/ui/radialprogress";

export default function CreateBroadcast() {
  // local states
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [campaigns, setCampaigns] = useState([]);

  //router
  const router = useRouter();

  const {
    data: campaignData,
    isLoading,
    error,
  } = useGetCampaignQuery({
    name: debouncedSearchTerm,
  });

  const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return (value / total) * 100;
  };

  // function to process campaign data
  useEffect(() => {
    if (campaignData?.data) {
      const processedCampaigns = campaignData.data.map((campaign) => ({
        ...campaign,
        date: new Date(campaign.createdAt).toLocaleDateString(),
        sentPercentage: calculatePercentage(
          campaign.totalSent || 0,
          campaign.recipients || 0
        ),
        readPercentage: calculatePercentage(
          campaign.totalRead || 0,
          campaign.recipients || 0
        ),
      }));
      setCampaigns(processedCampaigns);
    }
  }, [campaignData]);

  // function to process set search term
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleFilterChange = (e) => {
    // Filter handling logic
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlenavigeteToCampaign = (campaign) => {
    // navigate to campaign details
    router.push(`/dashboard/broadcast/${campaign.campaignId}`);
  };
  return (
    <div className="flex flex-col h-full w-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative max-w-xs">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            name="table-search"
            id="table-search"
            className="py-2 px-3 ps-9 w-full text-gray-800 border-gray-200 shadow-sm rounded-lg text-sm focus:ring-lime-500 focus:border-lime-500"
            placeholder="Search for campaigns"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-3">
            <Icon.search className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ExportButton />
          <FilterButton
            menuItems={options}
            placeholder="Filter by"
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-4">
            <span className="ml-2">Loading campaigns...</span>
          </div>
        ) : error ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : (
          <table className="w-full text-left bg-white text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Campaign Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3">Recipients</th>
                <th className="px-6 py-3">Sent</th>
                <th className="px-6 py-3">Read</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {campaigns.map((campaign, index) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handlenavigeteToCampaign(campaign)}
                >
                  <td className="px-6 py-3">{campaign.campaignName}</td>
                  <td className="px-6 py-3">{campaign.campaignType}</td>
                  <td className="px-6 py-3">{campaign.date}</td>
                  <td className="px-6 py-3">{campaign.recipients} Contacts</td>
                  <td className="px-6 py-3">
                      <RadialProgress progress={campaign.sentPercentage} />
                  </td>
                  <td className="px-6 py-3">
                    <RadialProgress progress={campaign.readPercentage} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
