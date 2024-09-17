import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["User", "Medication", "Cart", "Order", "Payment"],
  endpoints: (builder) => ({
    getUser: builder.query({}),
    getMedication: builder.query({}),
    getCart: builder.query({
      query: () => "/api/cart/all",
      transformResponse: (response) => response.cart,
    }),
  }),
});

export const { useGetUserQuery, useGetMedicationQuery, useGetCartQuery } =
  apiSlice;
