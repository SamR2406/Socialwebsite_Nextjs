"use client";
import { useMessages } from "../context/MessagesContext";

export default function Navbar() {
  const { unreadCount } = useMessages();

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-3">
      <h1 className="text-lg font-bold">MySocialApp</h1>
      <div className="relative">
        <button className="relative">
          Inbox
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
