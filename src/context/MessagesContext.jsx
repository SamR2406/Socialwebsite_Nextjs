"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { messages as initialMessages } from "../app/messages";

const MessagesContext = createContext();

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("messages");
      if (stored) return JSON.parse(stored);
    }
    return initialMessages;
  });

  // Save to localStorage when messages change
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <MessagesContext.Provider value={{ messages, setMessages, unreadCount }}>
      {children}
    </MessagesContext.Provider>
  );
}

// Custom hook for convenience
export function useMessages() {
  return useContext(MessagesContext);
}
