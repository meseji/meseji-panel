import { apiSlice } from "./apiSlice";
import BaseUrl from "@/constant/BaseApi";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => ({
        url: `${BaseUrl}/payments`,
        method: "GET",
      }),
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/payments/create-order`,
        method: "POST",
        body: data,
      }),
    }),
    updatePayment: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/payments`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `${BaseUrl}/payments/${id}`,
        method: "DELETE",
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/payments/createOrder`,
        method: "POST",
        body: data,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/payments/verifyPayment`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} = paymentApiSlice;
