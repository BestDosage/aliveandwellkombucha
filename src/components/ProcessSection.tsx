"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    name: "Source",
    description:
      "We source organic tea, botanicals, and adaptogens from trusted growers worldwide — from Sicilian herbs to Japanese matcha.",
    gradientFrom: "#B5CDB2",
    gradientTo: "#8BA888",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path d="M24 6C30 10 40 18 40 30C40 38 33 44 24 44C15 44 8 38 8 30C8 18 18 10 24 6Z" stroke="currentColor" strokeWidth={1.5} fill="none" />
        <path d="M24 14L24 38M18 22L24 26M30 20L24 24" stroke="currentColor" strokeWidth={1} opacity={0.5} />
      </svg>
    ),
  },
  {
    number: "02",
    name: "Brew",
    description:
      "Our signature slow-brew process takes 21+ days, creating a smoother, less acidic kombucha packed with live cultures.",
    gradientFrom: "#F5D0B5",
    gradientTo: "#E8A87C",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <circle cx="24" cy="28" r="14" stroke="currentColor" strokeWidth={1.5} />
        <path d="M24 14V8M18 10L24 14L30 10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        <circle cx="20" cy="26" r="2" fill="currentColor" opacity={0.3} />
        <circle cx="28" cy="30" r="1.5" fill="currentColor" opacity={0.3} />
        <circle cx="24" cy="34" r="1" fill="currentColor" opacity={0.3} />
      </svg>
    ),
  },
  {
    number: "03",
    name: "Infuse",
    description:
      "Each flavor is infused with carefully chosen botanicals — passionflower for calm, shilajit for grounding, rose for delight.",
    gradientFrom: "#D4CCE8",
    gradientTo: "#9B8EC4",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path d="M24 42V24" stroke="currentColor" strokeWidth={1.5} />
        <path d="M24 24C18 20 14 14 18 8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M24 24C30 20 34 14 30 8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        <circle cx="18" cy="8" r="3" fill="currentColor" opacity={0.3} />
        <circle cx="30" cy="8" r="3" fill="currentColor" opacity={0.3} />
        <circle cx="24" cy="18" r="2" fill="currentColor" opacity={0.2} />
      </svg>
    ),
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    []
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.7,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Connecting line between cards (hidden on mobile, between 1-2 and 2-3) */}
      {index < 2 && (
        <div className="absolute right-0 top-1/3 z-20 hidden translate-x-1/2 md:block">
          <motion.div
            className="h-[1px] w-8 bg-charcoal/10"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
          />
        </div>
      )}

      <motion.div
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${step.gradientFrom}40 0%, ${step.gradientFrom}20 50%, transparent 100%)`,
        }}
      >
        {/* Cursor glow */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, ${step.gradientFrom}50, transparent 60%)`,
          }}
        />

        {/* Top gradient area */}
        <div className="relative px-8 pt-10 pb-6">
          {/* Step number — large, faded */}
          <motion.span
            className="absolute right-6 top-4 font-heading text-[7rem] font-bold leading-none select-none"
            style={{ color: step.gradientTo, opacity: 0.08 }}
            animate={isHovered ? { scale: 1.05, opacity: 0.12 } : { scale: 1, opacity: 0.08 }}
            transition={{ duration: 0.4 }}
          >
            {step.number}
          </motion.span>

          {/* Icon */}
          <motion.div
            className="relative z-10 mb-6 inline-flex items-center justify-center rounded-2xl p-3"
            style={{ backgroundColor: `${step.gradientFrom}60`, color: step.gradientTo }}
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {step.icon}
          </motion.div>

          {/* Name */}
          <h3 className="relative z-10 font-heading text-3xl font-semibold text-charcoal">
            {step.name}
          </h3>
        </div>

        {/* Description */}
        <div className="relative z-10 px-8 pb-10">
          <p className="text-[15px] leading-[1.7] text-charcoal/55">
            {step.description}
          </p>

          {/* Animated progress indicator */}
          <div className="mt-6 flex items-center gap-2">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="h-1.5 rounded-full"
                style={{
                  backgroundColor: dot === index ? step.gradientTo : `${step.gradientFrom}60`,
                  width: dot === index ? 24 : 6,
                }}
                animate={
                  dot === index && isHovered
                    ? { width: 32, backgroundColor: step.gradientTo }
                    : {}
                }
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-cream py-28 md:py-40">
      {/* Subtle parallax background texture */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{ y: bgY }}
      >
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #8BA888 1px, transparent 1px), radial-gradient(circle at 75% 75%, #8BA888 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.p
            className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-sage-dark"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Process
          </motion.p>
          <motion.h2
            className="font-heading text-4xl text-charcoal md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The Craft Behind Every Sip
          </motion.h2>
          <motion.div
            className="mx-auto mt-5 h-[2px] w-[60px] bg-sage"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
