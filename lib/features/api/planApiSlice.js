import { apiSlice } from "./apiSlice";
import BaseUrl from "@/constant/BaseApi";

export const planApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => ({
        url: `${BaseUrl}/plans/getAllPlan`,
        method: "GET",
      }),
    }),
    createPlan: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/plans`,
        method: "POST",
        body: data,
      }),
    }),
    updatePlan: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/plans`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePlan: builder.mutation({
      query: (id) => ({
        url: `${BaseUrl}/plans/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = planApiSlice;
