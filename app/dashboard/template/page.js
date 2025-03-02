"use client";
import MainHeader from "@/components/dashboard/shared/MainHeader";
import TemplateCard from "@/components/dashboard/template/template-card";
import TemplateTable from "@/components/dashboard/template/template-table";
import { Icon } from "@/components/Icon";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import { useGetAllTemplateQuery } from "@/lib/features/api/whatsappTemplateApiSlice";
import { cn } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [allTemplates, setAllTemplates] = useState([]);
  const [viewMode, setViewMode] = useState("card");
  const [activeTab, setActiveTab] = useState("Explore");
  const tabs = ["Explore", "Approved", "Rejected", "Pending"];
  const router = useRouter();

  // call rtk query
  const {
    data: getAllTemplates,
    isLoading: loadingAllTemplates,
    isFetching: fetchingAllTemplates,
    refetch: refetchAllTemplates,
  } = useGetAllTemplateQuery();

  useEffect(() => {
    if (getAllTemplates?.data?.apiData?.data?.length) {
      setAllTemplates(getAllTemplates?.data?.apiData?.data);
    }
  }, [getAllTemplates]);

  console.log(getAllTemplates);

  const filteredTemplates =
    activeTab === "Explore"
      ? allTemplates
      : allTemplates.filter(
          (template) => template.status === activeTab.toUpperCase()
        );

  console.log(filteredTemplates);
  return (
    <div className="flex flex-col h-[90vh] w-full">
      <MainHeader title="Templates">
        <Button size="md" onClick={() => router.push("template/new-template")}>
          <Icon.plus size={18} className="mr-1" />
          New Template
        </Button>
      </MainHeader>
      {/* <div className="flex flex-col md:flex-row lg:flex-row  justify-between ">
        <Title>Templates</Title>
        <div className="flex items-center gap-3">
          <Button size="md" variant="outline">
            view
          </Button>
          <Button
            size="md"
            onClick={() => router.push("template/new-template")}
          >
            <Icon.plus size={18} className="mr-1" />
            New Template
          </Button>
        </div>
      </div> */}
      <div className="w-full mx-auto ">
        <div className="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between w-full">
          {/* <ul className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
            <li className="flex items-center cursor-pointer outline-none group">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-indigo-600"
                  d="M19.7778 9.33333V9.33333C19.7778 8.09337 19.7778 7.47339 19.6415 6.96472C19.2716 5.58436 18.1934 4.50616 16.8131 4.1363C16.3044 4 15.6844 4 14.4444 4C12.963 4 11.4815 4 10 4C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12V12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20C11.3333 20 12.6667 20 14 20C15.6554 20 16.4831 20 17.1459 19.7588C18.2569 19.3544 19.1322 18.4791 19.5365 17.3681C19.7778 16.7053 19.7778 15.8776 19.7778 14.2222V14.2222M16.6667 14.2222H20.2222C21.2041 14.2222 22 13.4263 22 12.4444V11.1111C22 10.1293 21.2041 9.33333 20.2222 9.33333H16.6667C15.6848 9.33333 14.8889 10.1293 14.8889 11.1111V12.4444C14.8889 13.4263 15.6848 14.2222 16.6667 14.2222Z"
                  stroke="#4F46E5"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="font-normal text-lg leading-8 text-indigo-600 ml-2 mr-3 transition-all duration-500 group-hover:text-indigo-600">
                Finance
              </span>
              <button className="flex aspect-square h-6 rounded-full border border-indigo-600  items-center justify-center font-manrope font-medium text-base text-indigo-600  transition-all duration-500 group-hover:border-indigo-600 group-hover:text-indigo-600">
                8
              </button>
            </li>

            <li className="flex items-center cursor-pointer outline-none group">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                  d="M10 14.2449C9.55209 14.2449 7.76925 14.2449 6 14.2449C4.11438 14.2449 3.17157 14.2449 2.58579 13.6591C2 13.0733 2 12.1305 2 10.2449V10.0816C2 8.19601 2 7.25321 2.58579 6.66742C3.17157 6.08163 4.11275 6.08163 5.99512 6.08163C9.46482 6.08163 14.4728 6.08163 18 6.08163C19.8856 6.08163 20.8284 6.08163 21.4142 6.66742C22 7.25321 22 8.19599 22 10.0816C22 10.136 22 10.1905 22 10.245C22 12.1306 22 13.0733 21.4142 13.6591C20.8284 14.2449 19.8856 14.2449 18 14.2449C16.2308 14.2449 14.4479 14.2449 14 14.2449M20.6667 17.2381C20.6667 17.3697 20.6667 17.6444 20.6667 17.9986C20.6667 19.8851 20.6667 20.8284 20.0809 21.4142C19.4951 22 18.5523 22 16.6667 22H7.33333C5.44772 22 4.50491 22 3.91912 21.4142C3.33333 20.8284 3.33333 19.8856 3.33333 18V17.2381M15.3333 6.08163V5.33333C15.3333 4.08718 15.3333 3.4641 15.0654 3C14.8898 2.69596 14.6374 2.44349 14.3333 2.26795C13.8692 2 13.2462 2 12 2V2C10.7538 2 10.1308 2 9.66667 2.26795C9.36263 2.44349 9.11015 2.69596 8.93462 3C8.66667 3.4641 8.66667 4.08718 8.66667 5.33333V6.08163M11.3333 16.966H12.6667C13.403 16.966 14 16.3569 14 15.6054V12.8844C14 12.1329 13.403 11.5238 12.6667 11.5238H11.3333C10.597 11.5238 10 12.1329 10 12.8844V15.6054C10 16.3569 10.597 16.966 11.3333 16.966Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-normal text-lg leading-8 text-black pl-2 pr-3 transition-all duration-500 group-hover:text-indigo-600">
                Management
              </span>
              <span className="w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center font-manrope font-medium text-base text-gray-900 transition-all duration-500 group-hover:border-indigo-600 group-hover:text-indigo-600">
                3
              </span>
            </li>

            <li className="flex items-center cursor-pointer outline-none group">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                  d="M9.69081 22H13.537M11.6139 2V3.53846M18.4123 4.8163L17.3244 5.90416M4.8155 4.81701L5.90336 5.90486M2 11.6154H3.53846M19.6893 11.6154H21.2278M7.53442 15.6948C5.2814 13.4418 5.2814 9.78895 7.53442 7.53592C9.78744 5.2829 13.4403 5.2829 15.6933 7.53592C17.9464 9.78895 17.9464 13.4418 15.6933 15.6948C15.1999 16.1883 14.6393 16.5737 14.041 16.851C13.745 16.9881 13.537 17.2743 13.537 17.6005L13.537 18.9231C13.537 19.3479 13.1926 19.6923 12.7677 19.6923H10.46C10.0352 19.6923 9.69081 19.3479 9.69081 18.9231V17.6005C9.6908 17.2743 9.48274 16.9881 9.18677 16.851C8.58845 16.5737 8.02786 16.1883 7.53442 15.6948Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-normal text-lg leading-8 text-black pl-2 pr-3 transition-all duration-500 group-hover:text-indigo-600">
                Today&apos;s deal
              </span>
              <span className="w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center font-manrope font-medium text-base text-gray-900 transition-all duration-500 group-hover:border-indigo-600 group-hover:text-indigo-600">
                1
              </span>
            </li>
          </ul>
          
          </div> */}
          <div></div>
          <div className="flex flex-row items-center justify-between">
            <button
              disabled={fetchingAllTemplates}
              onClick={() => refetchAllTemplates()}
              className={cn(
                "inline-block rounded-full p-2 me-4 text-gray-600 hover:bg-gray-50 focus:relative",
                fetchingAllTemplates && "cursor-not-allowed opacity-60"
              )}
              title="Sync All Template"
            >
              <Icon.sync
                className={cn(
                  "size-5 transition-transform",
                  fetchingAllTemplates && "animate-spin"
                )}
              />
            </button>

            <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-xs">
              <button
                onClick={() =>
                  setViewMode(viewMode === "card" ? "table" : "card")
                }
                className={cn(
                  viewMode === "card" ? "bg-gray-100" : "Card",
                  "inline-block border-e p-2 text-gray-600 hover:bg-gray-50 focus:relative"
                )}
                title="Grid View"
              >
                <Icon.grid className={"size-5"} />
              </button>

              <button
                onClick={() =>
                  setViewMode(viewMode === "card" ? "table" : "card")
                }
                className={cn(
                  viewMode === "card" ? "Table" : "bg-gray-100",
                  "inline-block border-e p-2 text-gray-600 hover:bg-gray-50 focus:relative"
                )}
                title="List Product"
              >
                <Icon.list className={"size-5"} />
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="pb-4">
        {viewMode === "card" && (
          <div
            className={cn(viewMode === "table" ? "hidden" : "flex flex-col")}
          >
            <div className="flex w-full mb-5 mx-auto border-b border-gray-300 text-black">
              <ul className="flex flex-wrap gap-6">
                {tabs.map((tab) => (
                  <li
                    key={tab}
                    className={`py-4 relative cursor-pointer text-sm ${
                      activeTab === tab ? "text-black " : "text-gray-800"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                    <div
                      className={`absolute w-full h-[2px] bg-black -bottom-[1px] ${
                        activeTab === tab ? "block" : "hidden"
                      }`}
                    ></div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-7">
              {filteredTemplates?.map((template, idx) => (
                <TemplateCard
                  key={idx}
                  id={template?.id}
                  name={template?.name}
                  components={template?.components}
                  status={template?.status}
                  language={template?.language}
                  category={template?.category}
                />
              ))}
            </div>
          </div>
        )}
        {viewMode === "table" && (
          <div className="my-5">
            <TemplateTable
              className={cn(viewMode === "table" ? "hidden" : "flex")}
              templates={filteredTemplates}
            />
          </div>
        )}
      </div>
    </div>
  );
}
