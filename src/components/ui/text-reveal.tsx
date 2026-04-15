"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.08,
}: TextRevealProps) {
  const words = children.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] pt-[0.05em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -80 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}
