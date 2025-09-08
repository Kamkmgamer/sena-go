"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "الواجهة" },
  { href: "/admin/posts", label: "المقالات" },
  { href: "/admin/pages", label: "الصفحات" },
  { href: "/admin/media", label: "الوسائط" },
  { href: "/admin/taxonomy", label: "التصنيفات والوسوم" },
  { href: "/admin/settings", label: "الإعدادات" },
];

export default function AdminNav({ variant = "vertical" }: { variant?: "vertical" | "horizontal" }) {
  const pathname = usePathname();
  const isHorizontal = variant === "horizontal";
  return (
    <nav className={isHorizontal ? "flex items-center gap-1 text-sm overflow-x-auto no-scrollbar" : "flex flex-col gap-1 text-sm"}>
      {links.map((item) => {
        const active = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-link ${active ? "active" : ""} ${isHorizontal ? "px-3 py-2 rounded-full whitespace-nowrap" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
