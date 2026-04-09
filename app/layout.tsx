"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import EnvironmentIndicator from "@/components/EnvironmentIndicator";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        {/* <EnvironmentIndicator /> */}
        <main className="flex-1 bg-gray-50">
          <Provider store={store}>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
