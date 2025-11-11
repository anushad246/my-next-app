"use client";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <main className="flex-1 bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
