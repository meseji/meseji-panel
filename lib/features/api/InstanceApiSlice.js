import { apiSlice } from "./apiSlice";
import BaseUrl from "@/constant/BaseApi";

export const instanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstances: builder.query({
      query: () => ({
        url: `${BaseUrl}/instances`,
        method: "GET",
      }),
    }),
    createInstance: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/instances`,
        method: "POST",
        body: data,
      }),
    }),
    updateInstance: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/instances`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteInstance: builder.mutation({
      query: (id) => ({
        url: `${BaseUrl}/instances/${id}`,
        method: "DELETE",
      }),
    }),

    getInstancesByUser: builder.query({
      query: (userId) => ({
        url: `${BaseUrl}/instances/getAllClientIds/${userId}`,
        method: "GET",
      }),
    }),
    findClietById: builder.query({
      query: (clientId) => ({
        url: `${BaseUrl}/instances/findClientById/${clientId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetInstancesQuery,
  useCreateInstanceMutation,
  useUpdateInstanceMutation,
  useDeleteInstanceMutation,
  useGetInstancesByUserQuery,
  useFindClietByIdQuery,
} = instanceApiSlice;
