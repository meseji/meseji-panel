import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BaseUrl from "@/constant/BaseApi";
const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  credentials: "include",
  withCredentials: "true",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
