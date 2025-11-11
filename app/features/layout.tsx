"use client";
import Link from "next/link";

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">My Dashboard</h1>
        <nav className="space-x-6">
          <Link href="/features/liveview/overview" className="hover:text-blue-300">Live View</Link>
          <Link href="/features/archive/summary" className="hover:text-blue-300">Archive</Link>
        </nav>
      </header>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
