"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

export default function HelpPage() {
  const [rolling, setRolling] = useState(false);
  const rollTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (rollTimer.current) clearTimeout(rollTimer.current);
      document.documentElement.classList.remove("barrel-roll-active");
    };
  }, []);

  const triggerRoll = () => {
    setRolling(true);
    document.documentElement.classList.add("barrel-roll-active");
    if (rollTimer.current) clearTimeout(rollTimer.current);
    rollTimer.current = setTimeout(() => {
      document.documentElement.classList.remove("barrel-roll-active");
      setRolling(false);
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-10 sm:px-8">
        <header className="mb-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Help
          </p>
          <h1 className="text-3xl font-bold text-slate-900">The Helping Robot</h1>
          <p className="text-sm text-slate-600">
            Tell us what you need and we’ll jump in—reach the team any time at{" "}
            <a href="mailto:example@example.com" className="font-semibold text-emerald-700">
              example@example.com
            </a>
            .
          </p>
        </header>

        <Card className="relative h-[500px] w-full overflow-hidden bg-black/[0.96]">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
          <div className="flex h-full">
            <div className="relative z-10 flex flex-1 flex-col justify-center p-8">
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                Interactive 3D
              </h2>
              <p className="mt-4 max-w-lg text-neutral-300">
                The helping robot can help you while you explore the scene. Use the tabs above to
                reach the right page or drop us a note if you need anything.
              </p>
              <p className="mt-3 text-sm text-neutral-400">
                Page under construction :)
              </p>
            </div>
            <div className="relative flex-1">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className={`h-full w-full ${rolling ? "animate-[barrel-roll_1s_ease-in-out]" : ""}`}
              />
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <button
                  type="button"
                  aria-label="Do a barrel roll"
                  onClick={triggerRoll}
                  className="pointer-events-auto h-24 w-24 rounded-full bg-transparent"
                  title="Click the robot"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
