"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LiveViewLayout({ children }: { children: React.ReactNode }) {
  const menuItems = ["Overview", "Cameras", "Reports"];
  const pathname = usePathname();

  return (
    <div className="flex h-full">
      <aside className="w-64 bg-white shadow-md p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const path = `/features/liveview/${item.toLowerCase()}`;
            const isActive = pathname === path;
            return (
              <li key={item}>
                <Link
                  href={path}
                  className={`block p-2 rounded ${
                    isActive ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
                  }`}>
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <section className="flex-1 p-6">{children}</section>
    </div>
  );
}
