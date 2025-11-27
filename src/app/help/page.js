"use client";

import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

export default function HelpPage() {
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
                Bring your UI to life with beautiful 3D scenes. Create immersive experiences
                that capture attention and enhance your design.
              </p>
              <p className="mt-3 text-sm text-neutral-400">
                This embed uses the Splite component you shared.
              </p>
            </div>
            <div className="relative flex-1">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
