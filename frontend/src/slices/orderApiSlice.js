import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/api/orders",
      transformResponse: (response) => response.orders,
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/api/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (id) => `/api/orders/${id}`,
      transformResponse: (response) => response.order,
      providesTags: ["Order"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, orderData }) => ({
        url: `/api/orders/${id}`,
        method: "PUT",
        body: orderData, // Pass the updated order data
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApiSlice;
