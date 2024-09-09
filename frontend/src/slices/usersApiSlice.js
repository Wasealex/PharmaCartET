import { apiSlice } from "./apiSlice";
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/users/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/api/users/signup",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/api/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useUpdateUserMutation,
} = usersApiSlice;
