// components/Messages.jsx
"use client";
import { useMessages } from "../context/MessagesContext";

export default function Messages() {
  const { messages, setMessages } = useMessages();

  const markAsRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
    );
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-600">Inbox</h2>
      <ul>
        {[
          // render a sorted copy so we don't mutate context state
          ...messages,
        ]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((msg) => (
            <li
              key={msg.id}
              className={`border-b py-3 ${msg.isRead ? "bg-gray-50" : "bg-blue-200"}`}
            >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-400">{msg.title}</h3>
              <span className="text-sm text-gray-500">{msg.date}</span>
            </div>
            <p className="text-gray-700 mt-1">{msg.message}</p>
            <p className="text-xs text-gray-400 mt-1">From: {msg.from}</p>
            {!msg.isRead && (
              <button
                onClick={() => markAsRead(msg.id)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
