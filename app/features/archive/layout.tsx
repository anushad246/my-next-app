"use client";
import Link from "next/link";

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
    const menuItems = ["Summary", "Old Reports", "Deleted Files"];

    return (
        <div className="flex h-full">
            <aside className="w-64 bg-white shadow-md p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item}>
                            <Link href={`/features/archive/${item.toLowerCase().replace(" ", "-")}`} className="block hover:bg-gray-100 p-2 rounded">
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
            <section className="flex-1 p-6">{children}</section>
        </div>
    );
}
