import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({}),
  }),
});

export const { useGetUserQuery, useGetMedicationQuery } = apiSlice;