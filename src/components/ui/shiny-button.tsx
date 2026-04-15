"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

export function ShinyButton({
  children,
  className,
  variant = "primary",
  ...props
}: ShinyButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [overlayPos, setOverlayPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setOverlayPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  return (
    <a
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-4 text-sm font-extrabold uppercase tracking-widest",
        "transition-all duration-200 ease-[cubic-bezier(0.65,0,0.35,1)]",
        "active:scale-[0.96] active:shadow-none",
        variant === "primary" &&
          "bg-sage-dark text-cream shadow-[0_4px_0_0_#3d5a3a] hover:shadow-[0_6px_0_0_#3d5a3a] hover:-translate-y-[2px]",
        variant === "outline" &&
          "border-2 border-charcoal text-charcoal shadow-[0_4px_0_0_#1C1C1C20] hover:shadow-[0_6px_0_0_#1C1C1C30] hover:-translate-y-[2px] hover:bg-charcoal hover:text-cream",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Cursor glow */}
      <span
        className={cn(
          "pointer-events-none absolute h-32 w-32 rounded-full transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0",
          variant === "primary" && "bg-white/25 blur-xl",
          variant === "outline" && "bg-sage/15 blur-xl"
        )}
        style={{ left: overlayPos.x - 64, top: overlayPos.y - 64 }}
      />

      {/* Shimmer */}
      <span
        className={cn(
          "absolute inset-0 -translate-x-full skew-x-[-20deg] animate-[shimmer_3s_ease-in-out_infinite]",
          variant === "primary" && "bg-gradient-to-r from-transparent via-white/20 to-transparent",
          variant === "outline" && "bg-gradient-to-r from-transparent via-sage/10 to-transparent"
        )}
      />

      <span className="relative z-10">{children}</span>
    </a>
  );
}
