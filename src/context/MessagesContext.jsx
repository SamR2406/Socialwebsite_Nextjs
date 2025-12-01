"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { messages as initialMessages } from "../app/messages";

const MessagesContext = createContext();

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState(initialMessages);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load any stored messages on the client after first render to avoid SSR/CSR mismatch
  useEffect(() => {
    const stored = localStorage.getItem("messages");
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (err) {
        console.warn("Failed to parse stored messages", err);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when messages change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages, isHydrated]);

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
