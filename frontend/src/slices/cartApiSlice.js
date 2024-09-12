import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (id) => ({
        url: "/api/cart",
        method: "POST",
        body: { id },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetCartQuery, useAddToCartMutation } = cartApiSlice;
