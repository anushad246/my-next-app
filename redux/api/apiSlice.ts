import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "../store";


const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to refresh token
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as any).accessToken;
      const newRefreshToken = (refreshResult.data as any).refreshToken;

      // store new tokens
      api.dispatch({
        type: "auth/setCredentials",
        payload: { accessToken: newAccessToken, refreshToken: newRefreshToken },
      });

      // retry original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // logout if refresh fails
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
