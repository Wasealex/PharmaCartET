import { apiSlice } from "./apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPaymentMethod: builder.mutation({
      query: (data) => ({
        url: "/api/payments/chapa",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddPaymentMethodMutation } = paymentApiSlice;
