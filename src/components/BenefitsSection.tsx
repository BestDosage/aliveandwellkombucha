"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { SparklesCore } from "@/components/ui/sparkles";

const PREMIUM_EASE = [0.83, 0, 0.17, 1] as const;

/* ------------------------------------------------------------------ */
/*  Inline SVG Icons                                                   */
/* ------------------------------------------------------------------ */

function GutHealthIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 8c-3 1-5 4-5 8 0 5 3 9 8 10 2 .5 4 0 5-1" />
      <path d="M18 8c3 1 5 4 5 8 0 3-1 5.5-3 7.5" />
      <path d="M10 8c1-2 4-3 8-3s5 1 5 3" />
      <path d="M14 15c0-3 2-5 5-6" />
      <path d="M14 15c2 0 4-1 5-3" />
      <circle cx="16" cy="20" r="1.2" fill={color} stroke="none" />
      <circle cx="13" cy="18" r="0.8" fill={color} stroke="none" />
      <circle cx="19" cy="18.5" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

function BrainClarityIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 28V18" />
      <path d="M12 6c-3 0-5 2.5-5 5.5 0 1.5.5 3 1.5 4C7 17 6 19 6 21c0 3 2.5 5 5 5h5" />
      <path d="M20 6c3 0 5 2.5 5 5.5 0 1.5-.5 3-1.5 4 1.5 1.5 2.5 3.5 2.5 5.5 0 3-2.5 5-5 5h-5" />
      <path d="M9 16h14" />
      <path d="M16 2v3" />
      <path d="M22 4l-1.5 2.5" />
      <path d="M10 4l1.5 2.5" />
    </svg>
  );
}

function ImmuneShieldIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 3L5 8v7c0 7.5 4.7 14.5 11 17 6.3-2.5 11-9.5 11-17V8L16 3z" />
      <path d="M16 12v8" />
      <path d="M12 16h8" />
    </svg>
  );
}

function LessAcidicIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 3C12 10 7 15 7 20a9 9 0 0018 0c0-5-5-10-9-17z" />
      <path d="M12 21c0-2.5 1.8-5 4-7" opacity={0.6} />
      <path d="M13.5 24a5 5 0 004.5-3" opacity={0.4} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Botanical Silhouette (decorative fern frond)                       */
/* ------------------------------------------------------------------ */

function FernSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 600" fill="#FBF7F0" className={className}>
      <path
        d="M100 600 C100 500 98 400 100 50"
        fill="none"
        stroke="#FBF7F0"
        strokeWidth={2}
        opacity={0.5}
      />
      {/* Left fronds */}
      <path d="M100 520 C80 510 50 500 30 510 C50 505 80 500 100 510Z" />
      <path d="M100 470 C75 455 40 445 15 460 C40 450 75 448 100 458Z" />
      <path d="M100 420 C70 400 35 390 10 405 C35 395 70 395 100 408Z" />
      <path d="M100 370 C72 348 40 335 18 348 C40 340 72 342 100 358Z" />
      <path d="M100 320 C75 298 45 285 25 295 C45 288 75 292 100 308Z" />
      <path d="M100 270 C78 250 50 238 32 248 C50 242 78 246 100 260Z" />
      <path d="M100 220 C80 202 55 192 40 200 C55 196 80 200 100 214Z" />
      <path d="M100 175 C82 160 62 152 50 158 C62 155 82 158 100 170Z" />
      <path d="M100 135 C86 122 70 118 62 122 C70 120 86 124 100 134Z" />
      <path d="M100 100 C90 90 78 88 72 92 C78 90 90 92 100 100Z" />
      {/* Right fronds */}
      <path d="M100 500 C120 488 150 480 170 492 C150 484 120 484 100 492Z" />
      <path d="M100 445 C125 428 155 420 175 434 C155 425 125 426 100 438Z" />
      <path d="M100 395 C128 375 160 365 180 378 C160 370 128 372 100 386Z" />
      <path d="M100 345 C125 325 155 315 172 325 C155 318 125 322 100 336Z" />
      <path d="M100 295 C122 278 148 270 165 280 C148 274 122 276 100 288Z" />
      <path d="M100 248 C120 232 145 225 158 234 C145 228 120 232 100 242Z" />
      <path d="M100 202 C118 188 138 184 148 190 C138 186 118 190 100 200Z" />
      <path d="M100 160 C115 150 130 148 138 152 C130 150 115 152 100 160Z" />
      <path d="M100 122 C112 114 122 114 128 118 C122 116 112 116 100 122Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type IconComponent = typeof GutHealthIcon;

interface Benefit {
  title: string;
  description: string;
  accent: string;
  Icon: IconComponent;
}

const BENEFITS: Benefit[] = [
  {
    title: "Gut Health",
    description:
      "Packed with live probiotics and organic acids that support digestion, strengthen your microbiome, and keep your gut in balance — naturally.",
    accent: "#8BA888",
    Icon: GutHealthIcon,
  },
  {
    title: "Brain Clarity",
    description:
      "B-vitamins and antioxidants work together to sharpen focus, lift brain fog, and sustain clean mental energy throughout your day.",
    accent: "#9B8EC4",
    Icon: BrainClarityIcon,
  },
  {
    title: "Immune Support",
    description:
      "A potent blend of beneficial acids, enzymes, and polyphenols that reinforce your body's natural defenses from the inside out.",
    accent: "#E8A87C",
    Icon: ImmuneShieldIcon,
  },
  {
    title: "Less Acidic",
    description:
      "Our gentle, slow-brew process creates a smooth, easy-on-the-stomach kombucha — bold flavor without the harsh bite.",
    accent: "#D4A5A5",
    Icon: LessAcidicIcon,
  },
];

/* ------------------------------------------------------------------ */
/*  Floating Dots (decorative)                                         */
/* ------------------------------------------------------------------ */

interface Dot {
  top: string;
  left?: string;
  right?: string;
  size: number;
  color: string;
}

const DOTS: Dot[] = [
  { top: "8%", left: "12%", size: 6, color: "#8BA888" },
  { top: "15%", right: "18%", size: 4, color: "#E8A87C" },
  { top: "35%", left: "6%", size: 5, color: "#9B8EC4" },
  { top: "55%", right: "10%", size: 7, color: "#8BA888" },
  { top: "70%", left: "15%", size: 4, color: "#D4A5A5" },
  { top: "80%", right: "22%", size: 5, color: "#9B8EC4" },
  { top: "25%", left: "85%", size: 3, color: "#E8A87C" },
  { top: "45%", left: "4%", size: 5, color: "#D4A5A5" },
  { top: "90%", left: "50%", size: 4, color: "#8BA888" },
];

/* ------------------------------------------------------------------ */
/*  BenefitCard                                                        */
/* ------------------------------------------------------------------ */

function BenefitCard({ benefit, index, inView }: { benefit: Benefit; index: number; inView: boolean }) {
  return (
    <motion.div
      key={benefit.title}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: PREMIUM_EASE,
      }}
      className={cn(
        "group rounded-2xl p-8 md:p-10",
        "transition-all duration-[400ms]",
      )}
      style={{
        backgroundColor: "#3A3A3A",
        borderLeft: `4px solid ${benefit.accent}`,
        borderTop: `1px solid ${benefit.accent}22`,
        borderRight: `1px solid ${benefit.accent}22`,
        borderBottom: `1px solid ${benefit.accent}22`,
        boxShadow: `0 4px 0 0 ${benefit.accent}20`,
        willChange: "transform",
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.25, ease: [0.65, 0, 0.35, 1] },
      }}
    >
      {/* Hover: expand left border + shadow via CSS group */}
      <style>{`
        .benefit-card-${index}:hover {
          border-left-width: 6px !important;
          box-shadow: 0 8px 24px 0 ${benefit.accent}30 !important;
        }
      `}</style>

      {/* Icon circle with bounce on hover */}
      <motion.div
        className={`benefit-card-${index} flex h-16 w-16 items-center justify-center rounded-full`}
        style={{ backgroundColor: `${benefit.accent}26`, willChange: "transform" }}
        whileHover={{
          scale: [1, 1.15, 1],
          transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
        }}
      >
        <benefit.Icon className="h-8 w-8" color={benefit.accent} />
      </motion.div>

      {/* Title */}
      <h3
        className="mt-6 font-heading text-xl font-semibold"
        style={{ color: "#FBF7F0" }}
      >
        {benefit.title}
      </h3>

      {/* Description */}
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: "#B5CDB2" }}
      >
        {benefit.description}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="grain relative overflow-hidden py-24 md:py-40"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      {/* Animated radial gradient background — sage green tones, 15s loop */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, #5E7D5B30 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #8BA88825 0%, transparent 55%), radial-gradient(ellipse at 60% 80%, #B5CDB218 0%, transparent 50%)",
          animation: "benefits-bg-drift 15s ease-in-out infinite alternate",
        }}
      />
      <style>{`
        @keyframes benefits-bg-drift {
          0%   { opacity: 0.6; transform: scale(1) translateX(0px); }
          33%  { opacity: 0.9; transform: scale(1.04) translateX(20px); }
          66%  { opacity: 0.7; transform: scale(0.98) translateX(-15px); }
          100% { opacity: 1;   transform: scale(1.02) translateX(10px); }
        }
      `}</style>

      {/* Ambient particles */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="benefits-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={40}
          className="h-full w-full"
          particleColor="#8BA888"
          speed={0.5}
        />
      </div>

      {/* Decorative botanical silhouette */}
      <FernSilhouette className="pointer-events-none absolute right-0 top-[10%] h-[80%] w-auto opacity-5" />

      {/* Floating dots */}
      {DOTS.map((dot, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            opacity: 0.1,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6" ref={ref}>
        {/* Header */}
        <div className="mb-16 text-center md:mb-20">
          {/* Eyebrow */}
          <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium" style={{ color: "#8BA888" }}>
            The Science of Feel-Good
          </span>
          <h2
            className="mt-3 font-heading text-5xl font-bold md:text-6xl"
            style={{ color: "#FBF7F0" }}
          >
            Why Kombucha?
          </h2>
          {/* Animated underline */}
          <div className="mx-auto mt-4 flex justify-center">
            <motion.span
              className="block h-[2px] w-16 rounded-full"
              style={{
                background: "linear-gradient(90deg, #5E7D5B, #8BA888, #B5CDB2)",
                transformOrigin: "left center",
                willChange: "transform",
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: PREMIUM_EASE }}
            />
          </div>
          <p
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed"
            style={{ color: "#B5CDB2" }}
          >
            More than a drink. A daily ritual for your body and mind.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {BENEFITS.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
