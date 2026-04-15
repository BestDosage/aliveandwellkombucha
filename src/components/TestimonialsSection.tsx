"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.83, 0, 0.17, 1] as const;

const testimonials = [
  {
    quote:
      "I've tried every kombucha on the market and nothing comes close. The Lavender & Blue Mallow is my daily wind-down ritual.",
    name: "Sarah M.",
    location: "Dallas, TX",
  },
  {
    quote:
      "Finally, a kombucha that doesn't make you pucker. My whole office is hooked on the Palo Santo.",
    name: "James K.",
    location: "Fort Worth, TX",
  },
  {
    quote:
      "The Rose Petal & Lychee tastes like something from a high-end spa. I bring it to every dinner party now.",
    name: "Maria L.",
    location: "Plano, TX",
  },
];

function StarIcon({ className, filled }: { className?: string; filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      className={cn("h-4 w-4", className)}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateX: -8, y: 24 }}
      animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : { opacity: 0, rotateX: -8, y: 24 }}
      transition={{
        duration: 0.65,
        delay: index * 0.14,
        ease: PREMIUM_EASE,
      }}
      style={{ willChange: "transform", transformPerspective: 900 }}
      whileHover={{
        y: -4,
        boxShadow: "0 16px 40px 0 rgba(139, 168, 136, 0.18)",
        transition: { duration: 0.28, ease: [0.65, 0, 0.35, 1] },
      }}
    >
      <div
        className="relative rounded-2xl bg-white p-8 shadow-sm"
        style={{ willChange: "transform" }}
      >
        {/* Quotation mark — subtle pulse */}
        <motion.span
          className="pointer-events-none absolute top-4 left-6 font-heading text-6xl text-sage select-none"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          &ldquo;
        </motion.span>

        {/* Quote */}
        <p className="relative mt-6 font-sans text-base italic leading-relaxed text-charcoal">
          {testimonial.quote}
        </p>

        {/* Stars — fill one by one with 100ms stagger on viewport entry */}
        <div className="mt-5 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              className="text-sage"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{
                duration: 0.3,
                delay: index * 0.14 + 0.4 + i * 0.1,
                ease: PREMIUM_EASE,
              }}
              style={{ willChange: "transform" }}
            >
              <StarIcon filled={true} className="text-sage" />
            </motion.span>
          ))}
        </div>

        {/* Reviewer */}
        <div className="mt-4">
          <p className="font-sans text-sm font-semibold text-charcoal">
            {testimonial.name}
          </p>
          <p className="font-sans text-sm text-muted-foreground">
            {testimonial.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-cream-dark py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center" ref={headerRef}>
          {/* Eyebrow */}
          <span className="text-xs uppercase tracking-[0.2em] text-sage-dark font-sans font-medium">
            Real People, Real Results
          </span>
          <h2 className="mt-3 font-heading text-4xl text-charcoal md:text-5xl">
            What People Are Saying
          </h2>
          {/* Animated underline */}
          <div className="mx-auto mt-4 flex justify-center">
            <motion.span
              className="block h-[2px] rounded-full"
              style={{
                width: "3rem",
                background: "linear-gradient(90deg, #5E7D5B, #8BA888, #B5CDB2)",
                transformOrigin: "left center",
                willChange: "transform",
              }}
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: PREMIUM_EASE }}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
