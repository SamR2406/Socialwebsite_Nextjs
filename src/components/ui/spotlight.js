"use client";

import { cn } from "./utils";

export function Spotlight({ className = "", fill = "white" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-[400px] w-[400px] rounded-full blur-3xl",
        className
      )}
      style={{
        background: `radial-gradient(circle, ${fill} 0%, transparent 60%)`,
        opacity: 0.35,
      }}
    />
  );
}
