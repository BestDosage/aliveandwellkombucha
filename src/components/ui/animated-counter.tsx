"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  className,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);

  useEffect(() => {
    return display.on("change", (v) => setCurrent(v));
  }, [display]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {current}
      {suffix}
    </span>
  );
}
