"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.83, 0, 0.17, 1] as const;

/* ------------------------------------------------------------------ */
/*  Floating botanical leaf SVG                                        */
/* ------------------------------------------------------------------ */

function FloatingLeaf({
  style,
  animDelay,
  size = 48,
  rotate = 0,
}: {
  style?: React.CSSProperties;
  animDelay?: number;
  size?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute select-none"
      style={{ ...style, willChange: "transform" }}
      animate={{
        y: [0, -18, 4, -12, 0],
        x: [0, 8, -6, 10, 0],
        rotate: [rotate, rotate + 8, rotate - 4, rotate + 5, rotate],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: animDelay ?? 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.25 }}
      >
        <path
          d="M10 90 C10 90 5 40 50 10 C50 10 30 50 10 90Z"
          fill="#5E7D5B"
        />
        <path
          d="M10 90 C10 90 5 40 50 10"
          stroke="#5E7D5B"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
      </svg>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shimmer button                                                      */
/* ------------------------------------------------------------------ */

function ShimmerButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      className={cn(
        "relative overflow-hidden whitespace-nowrap rounded-full bg-sage-dark px-8 py-4 font-semibold text-cream",
        "transition-transform duration-200 hover:scale-[1.02]",
        "w-full sm:w-auto sm:rounded-l-none",
        className,
      )}
      style={{ willChange: "transform" }}
    >
      {/* Shimmer sweep */}
      <span
        className="pointer-events-none absolute inset-0 block"
        style={{
          background:
            "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-sweep 2.4s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Focus-ring email input                                              */
/* ------------------------------------------------------------------ */

function AnimatedEmailInput() {
  return (
    <div className="relative w-full sm:flex-1">
      <input
        type="email"
        placeholder="Enter your email"
        className={cn(
          "w-full rounded-full border-2 border-transparent bg-white px-6 py-4 font-sans text-charcoal",
          "placeholder:text-charcoal-light/50 outline-none",
          "transition-all duration-300",
          "focus:border-sage-dark/40 focus:shadow-[0_0_0_4px_rgba(94,125,91,0.15)]",
          "sm:rounded-r-none",
        )}
        style={{ willChange: "box-shadow" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      className="py-24 px-6 md:py-32"
      style={{ backgroundColor: "#FBF7F0" }}
    >
      {/* Shimmer keyframe injected once */}
      <style>{`
        @keyframes shimmer-sweep {
          0%   { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes cta-gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <motion.div
        ref={containerRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.7, ease: PREMIUM_EASE }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl p-12 md:p-20"
        style={{
          background: "linear-gradient(135deg, #8BA888, #B5CDB2, #F5D0B5, #D4CCE8, #8BA888)",
          backgroundSize: "300% 300%",
          animation: "gradient-shift 8s ease infinite",
          willChange: "transform",
        }}
      >
        {/* Floating botanical leaves */}
        <FloatingLeaf
          style={{ top: "10%", left: "4%", rotate: "-20deg" }}
          size={64}
          rotate={-20}
          animDelay={0}
        />
        <FloatingLeaf
          style={{ top: "8%", right: "5%", rotate: "90deg" }}
          size={44}
          rotate={90}
          animDelay={3.5}
        />
        <FloatingLeaf
          style={{ bottom: "8%", right: "6%", rotate: "180deg" }}
          size={72}
          rotate={180}
          animDelay={1.8}
        />
        <FloatingLeaf
          style={{ bottom: "10%", left: "5%", rotate: "-90deg" }}
          size={36}
          rotate={-90}
          animDelay={5}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.span
            className="text-xs uppercase tracking-[0.2em] text-sage-dark font-sans font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.05, ease: PREMIUM_EASE }}
          >
            Limited Time Offer
          </motion.span>

          <motion.h2
            className="mt-3 font-heading text-4xl text-charcoal md:text-5xl"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: PREMIUM_EASE }}
            style={{ willChange: "transform" }}
          >
            Ready to Feel the Difference?
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-lg font-sans text-lg text-charcoal-light"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: PREMIUM_EASE }}
            style={{ willChange: "transform" }}
          >
            Join 2,000+ Texans who&apos;ve made the switch. Get 15% off your
            first order.
          </motion.p>

          <motion.form
            className="mt-8 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:gap-0"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: PREMIUM_EASE }}
            onSubmit={(e) => e.preventDefault()}
            style={{ willChange: "transform" }}
          >
            <AnimatedEmailInput />
            <ShimmerButton>Get 15% Off</ShimmerButton>
          </motion.form>

          <motion.p
            className="mt-4 text-xs text-charcoal-light opacity-60"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            No spam, ever. Unsubscribe anytime.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
