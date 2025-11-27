"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { messages as initialMessages } from "../app/messages";

const MessagesContext = createContext();

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState(initialMessages);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("messages");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  // Save to localStorage
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
