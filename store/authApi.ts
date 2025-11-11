import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQuery';
import { setTokens, setUser } from './authSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<
            { accessToken: string; refreshToken: string; user: any },
            { email: string; password: string }>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
                    dispatch(setUser(data.user));
                } catch {
                    console.error('Login failed');
                }
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
