"use client";

import Spline from "@splinetool/react-spline";
import { cn } from "./utils";

export function SplineScene({ scene, className }) {
  return (
    <div className={cn("relative", className)}>
      <Spline scene={scene} />
    </div>
  );
}
