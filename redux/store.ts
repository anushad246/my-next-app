import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// apiSlice.ts → base query with token refresh logic
// authSlice.ts → stores tokens and user info
// authApi.ts → handles login + refresh endpoints
// store.ts → combines all
// Wrapped Redux store in layout.tsx
// Simple login UI integrated
