"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMessages } from "../context/MessagesContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/post", label: "Post" },
  { href: "/chat", label: "Chat" },
  { href: "/messages", label: "Mail" },
  { href: "/profile", label: "Profile" },
  { href: "/help", label: "Help" },
];

export function NavBar() {
  const pathname = usePathname();

  const { unreadCount } = useMessages();

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
            "rounded-full px-4 py-2 transition relative inline-flex items-center gap-2",
            isActive(link.href)
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-700 hover:bg-slate-100",
          ].join(" ")}
        >
          {link.label}
          {link.label === "Mail" && unreadCount > 0 && (
            <span className="inline-flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
