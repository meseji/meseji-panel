import { apiSlice } from "./apiSlice";
import BaseUrl from "@/constant/BaseApi";

export const whatsappApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQrCode: builder.mutation({
      query: (id) => ({
        url: `${BaseUrl}/alt-whatsapp/getQrCode/${id}`,
        method: "GET",
      }),
    }),

    registerClient: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/alt-whatsapp/registerClient`,
        method: "POST",
        body: data,
      }),
    }),

    createTemplate: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/whatsapp-templates/createTemaplate`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterClientMutation, useGetQrCodeMutation,useCreateTemplateMutation } = whatsappApiSlice;
