import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchedulerSchema } from "@/lib/utils/schemas";

export default function CreateBroadcast() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(campaignSchedulerSchema),
  });

  const onSubmit = (data) => {
    console.log("Campaign Data:", data);
    // Call API to schedule campaign with selected details
  };
  return (
    <div className="relative p-4 mx-auto w-full max-w-full md:max-w-sm lg:max-w-md">
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
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
