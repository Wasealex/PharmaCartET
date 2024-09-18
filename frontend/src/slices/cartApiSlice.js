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
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/api/cart/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
    updateCart: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/api/cart/${id}`,
        method: "PUT",
        body: { quantity },
      }),
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/api/cart/deleteAll",
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
  useClearCartMutation,
} = cartApiSlice;
