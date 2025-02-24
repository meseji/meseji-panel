import { apiSlice } from "./apiSlice";
import BaseUrl from "@/constant/BaseApi";

export const whatsappTemplateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTemplate: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/whatsapp-templates/createTemaplate`,
        method: "POST",
        body: data,
      }),
    }),
    getSingleTemplate: builder.query({
      query: (id) => ({
        url: `${BaseUrl}/whatsapp-templates/getSingleTemplates/${id}`,
        method: "GET",
      }),
    }),
    getAllTemplate: builder.query({
      query: () => ({
        url: `${BaseUrl}/whatsapp-templates/getAllTemplates`,
        method: "GET",
      }),
    }),
    updateTemplate:builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/whatsapp-templates/updateTemplate/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    useDeleteTemplate:builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/whatsapp-templates/deleteTemplate`,
        method: "DELETE",
        body:data
      }),
    }),
  }),
});

export const {
  useCreateTemplateMutation,
  useGetSingleTemplateQuery,
  useGetAllTemplateQuery,useUpdateTemplateMutation,useUseDeleteTemplateMutation
} = whatsappTemplateApiSlice;
