"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className = "", children }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
