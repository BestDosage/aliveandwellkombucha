"use client";

import { useRef } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  { value: 255, suffix: "+", label: "Retail Locations" },
  { value: 5, suffix: "", label: "Unique Flavors" },
  { value: 21, suffix: "+ Days", label: "Slow-Brewed" },
  { value: 2023, suffix: "", label: "Est. Dallas, TX" },
];

export default function StatsBar() {
  return (
    <section
      className="relative py-8 md:py-14 overflow-hidden"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      {/* Animated gradient line at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, #8BA888, #F5D0B5, #D4CCE8, #E8A87C, #8BA888)",
          backgroundSize: "200% 200%",
          animation: "color-sweep 6s linear infinite",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-sage/20">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center opacity-0"
            style={{ animation: `fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s forwards` }}
          >
            <span className="font-heading text-4xl font-bold md:text-6xl" style={{ color: "#FBF7F0" }}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-widest md:text-xs" style={{ color: "#B5CDB2" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
