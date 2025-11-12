import { apiSlice } from "../apiSlice";
import { setCredentials } from "../../slices/authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),
    refreshToken: builder.mutation({
      query: (refreshToken: string) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
