import BaseUrl from "@/constant/BaseApi";
import { apiSlice } from "./apiSlice";

export const contactsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSingleContact: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/contacts/addContact`,
        method: "POST",
        body: data,
      }),
    }),

    getAllContacts: builder.query({
      query: (data) => ({
        url: `${BaseUrl}/contacts/getAllContacts?searchTerm=${data.searchTerm}&page=${data.page}&limit=${data.limit}`,
        method: "GET",
      }),
    }),

    addBulkContacts: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/contacts/bulkAddContacts`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddSingleContactMutation,
  useGetAllContactsQuery,
  useDownloadSampleCsvMutation,
  useAddBulkContactsMutation,
} = contactsApiSlice;
