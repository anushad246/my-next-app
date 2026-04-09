import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { APP_CONFIG } from "@/config/config";

// Types
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

// Base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: APP_CONFIG.apiBaseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Base query with automatic token refresh
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 401 Unauthorized - attempt token refresh
  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      // No refresh token available, logout user
      api.dispatch({ type: "auth/logout" });
      return result;
    }

    try {
      const refreshResult = await baseQuery(
        {
          url: "/auth/token/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResult.data as RefreshTokenResponse;

        // Store new tokens
        api.dispatch({
          type: "auth/setCredentials",
          payload: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });

        // Retry original query with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, logout user
        api.dispatch({ type: "auth/logout" });
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};

// Create API slice with base configuration
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User",],
  endpoints: () => ({}),
});

