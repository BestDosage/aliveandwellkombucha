"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

/** Lightweight counter using requestAnimationFrame — no framer-motion */
export function AnimatedCounter({
  value,
  suffix = "",
  className,
  duration = 1.6,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const start = performance.now();
        const durationMs = duration * 1000;

        function tick(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / durationMs, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {current}
      {suffix}
    </span>
  );
}
