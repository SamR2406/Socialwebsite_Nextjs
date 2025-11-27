"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/post", label: "Post" },
  { href: "/chat", label: "Chat" },
  { href: "/profile", label: "Profile" },
  { href: "/help", label: "Help" },
];

export function NavBar() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex gap-3 text-sm font-semibold">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={[
            "rounded-full px-4 py-2 transition",
            isActive(link.href)
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-700 hover:bg-slate-100",
          ].join(" ")}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
