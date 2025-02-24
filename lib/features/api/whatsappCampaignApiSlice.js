import { apiSlice } from "./apiSlice";
import BaseUrl from "@/constant/BaseApi";

export const whatsappTemplateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCampaign: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/whatsapp-broadcasts/createCamapiagn`,
        method: "POST",
        body: data,
      }),
    }),
    getCampaign: builder.query({
      query: (data) => ({
        url: `${BaseUrl}/whatsapp-broadcasts/getAllCampaigns?name=${data.name}`,
        method: "GET",
      }),
    }),
    uploadFileForBroadcast: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/whatsapp-broadcasts/uploadFile`,
        method: "POST",
        body: data,
      }),
    }),
    testTemplateMessage: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/whatsapp-broadcasts/testTemplateMessage`,
        method: "POST",
        body: data,
      }),
    }),
    getSingleCampaign: builder.query({
      query: (id) => ({
        url: `${BaseUrl}/whatsapp-broadcasts/getSingleCampaign/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCampaignMutation,
  useGetCampaignQuery,
  useUploadFileForBroadcastMutation,
  useTestTemplateMessageMutation,
  useGetSingleCampaignQuery,
} = whatsappTemplateApiSlice;
