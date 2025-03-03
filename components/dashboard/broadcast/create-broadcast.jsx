import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchedulerSchema } from "@/lib/utils/schemas";
import { useCreateCampaignMutation } from "@/lib/features/api/whatsappCampaignApiSlice";
import Select from "../shared/selectDemo";
import { useGetAllTemplateQuery } from "@/lib/features/api/whatsappTemplateApiSlice";

export default function CreateBroadcast() {
  const [approvedTemplates, setApproveTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(campaignSchedulerSchema),
  });

  const {
    data: getAllTemplates,
    isLoading: loadingAllTemplates,
    refetch: refetchAllTemplates,
  } = useGetAllTemplateQuery();

  const [createCampaign, { isLoading: loadingcampaign }] =
    useCreateCampaignMutation();

  const onSubmit = async (data) => {
    // const payload = {
    //   campaignName: campaignName,
    //   templateId: selectedTemplate.id,
    //   paramsDatas: formattedContacts,
    // };
    try {
      // const response = await createCampaign(payload).unwrap();
      // console.log("Response:", response);
    } catch (error) {
      console.error("Error creating campaign:", error);
      // setError("Failed to create campaign. Please try again later.");
    }
    console.log("Campaign Data:", data);
    // Call API to schedule campaign with selected details
  };

  useEffect(() => {
    if (getAllTemplates?.data?.apiData?.data.length) {
      const approvedTemplates = getAllTemplates?.data?.apiData?.data.filter(
        (template) => template.status === "APPROVED"
      );
      setApproveTemplates(approvedTemplates);
    }
  }, [getAllTemplates]);

  const groupedData = approvedTemplates.reduce((acc, item) => {
    const { category, id, name } = item;
    const existingCategory = acc.find((group) => group.category === category);

    if (existingCategory) {
      existingCategory.items.push({ value: id, label: name });
    } else {
      acc.push({
        category,
        items: [{ value: id, label: name }],
      });
    }

    return acc;
  }, []);
  const handleTemplateChange = (tempId) => {
    const findTemaplate = approvedTemplates.find((temp) => temp.id === tempId);
    setSelectedTemplate(findTemaplate);
    setVariables({});
  };
  return (
    <div className="relative p-4 mx-auto w-full max-w-full md:max-w-sm lg:max-w-lg">
      {/* <div className="w-full space-y-4 min-w-4xl flex flex-col justify-center items-center"> */}
      {/* Sender Number Selection */}
      <div className="mx-auto w-full space-y-3">
        <div>
          <label
            htmlFor="campaignName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Campaign Name
          </label>
          <div className="mt-2">
            <Controller
              name="campaignName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Campaign Name"
                  className="block w-full rounded-lg border-0 p-2 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              )}
            />
            {errors.campaignName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.campaignName.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-2">
          <Controller
            name="templateId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={groupedData}
                label="Template"
                groupKey="category"
                valueKey="value"
                labelKey="label"
                onChange={handleTemplateChange}
              />
            )}
          />
          {errors.campaignName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.campaignName.message}
              </p>
            )}
        </div>

        {/* <div>
          <label className="block text-sm font-medium">Sender Number</label>
          <select
            {...register("senderNumber")}
            className="block w-full rounded-md border p-2 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2"
          >
            <option value="">Select Sender Number</option>
            <option value="number1">+91 12345 67890</option>
            <option value="number2">+91 98765 43210</option>
          </select>
          {errors.senderNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.senderNumber.message}
            </p>
          )}
        </div> */}

        {/* User List Selection */}
        <div>
          <label className="block text-sm font-medium">User List</label>
          <select
            {...register("userList")}
            className="block w-full rounded-md border p-2 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2"
          >
            <option value="">Select User List</option>
          </select>
          {errors.userList && (
            <p className="text-red-500 text-sm mt-1">
              {errors.userList.message}
            </p>
          )}
        </div>

        {/* Template Selection */}
        <div>
          <label className="block text-sm font-medium">Message Template</label>
          <select
            {...register("template")}
            className="block w-full rounded-md border p-2 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2"
          >
            <option value="">Select Template</option>
            <option value="template1">Template 1 - Offer Message</option>
            <option value="template2">Template 2 - Feedback Request</option>
          </select>
          {errors.template && (
            <p className="text-red-500 text-sm mt-1">
              {errors.template.message}
            </p>
          )}
        </div>

        {/* Optional Scheduled Time */}
        <div>
          <label className="block text-sm font-medium">
            Schedule Time (Optional)
          </label>
          <input
            type="datetime-local"
            {...register("scheduleTime")}
            className="block w-full rounded-md border p-2 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2"
          />
          {errors.scheduleTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.scheduleTime.message}
            </p>
          )}
        </div>

        {/* Chunk Size Input */}
        <div>
          <label className="block text-sm font-medium">
            Chunk Size (Users per Batch)
          </label>
          <input
            type="number"
            {...register("chunkSize", { valueAsNumber: true })}
            className="block w-full rounded-md border p-2 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2"
          />
          {errors.chunkSize && (
            <p className="text-red-500 text-sm mt-1">
              {errors.chunkSize.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="button" // Important: No longer type="submit"
            onClick={handleSubmit(onSubmit)} // Directly trigger the form submission handler
            className="bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700"
          >
            Schedule Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
