import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

/** CSS-only text reveal — no "use client", no framer-motion */
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
          <span
            className="text-reveal-word inline-block"
            style={{ animationDelay: `${delay + i * staggerDelay}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}
