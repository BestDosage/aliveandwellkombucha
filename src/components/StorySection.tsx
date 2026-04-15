"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const PREMIUM_EASE = [0.83, 0, 0.17, 1] as const;
const HOVER_EASE = [0.65, 0, 0.35, 1] as const;

function BotanicalVine() {
  return (
    <svg
      viewBox="0 0 120 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[320px] w-auto md:h-[400px]"
    >
      {/* Main vine stem */}
      <path
        d="M60 0 C60 40 55 60 58 100 C61 140 50 160 55 200 C60 240 52 270 56 320 C58 350 55 380 58 400"
        stroke="#8BA888"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaf 1 - right */}
      <path
        d="M58 60 C75 45 95 50 90 70 C85 85 65 80 58 65"
        fill="#B5CDB2"
        fillOpacity="0.3"
        stroke="#8BA888"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <path d="M58 62 C72 58 85 62 88 68" stroke="#8BA888" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
      {/* Leaf 2 - left */}
      <path
        d="M56 130 C38 115 18 122 24 142 C30 158 50 150 56 135"
        fill="#B5CDB2"
        fillOpacity="0.25"
        stroke="#8BA888"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <path d="M55 132 C42 129 28 134 25 140" stroke="#8BA888" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
      {/* Leaf 3 - right */}
      <path
        d="M56 210 C78 198 96 208 88 226 C80 242 58 232 56 215"
        fill="#B5CDB2"
        fillOpacity="0.2"
        stroke="#8BA888"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <path d="M57 213 C72 208 88 214 87 224" stroke="#8BA888" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
      {/* Leaf 4 - left, small */}
      <path
        d="M55 280 C40 268 22 276 28 292 C34 306 52 298 55 284"
        fill="#B5CDB2"
        fillOpacity="0.2"
        stroke="#8BA888"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* Small berries / buds */}
      <circle cx="80" cy="92" r="3" fill="#8BA888" fillOpacity="0.25" />
      <circle cx="30" cy="165" r="2.5" fill="#8BA888" fillOpacity="0.2" />
      <circle cx="82" cy="245" r="2" fill="#8BA888" fillOpacity="0.2" />
      {/* Tendril curls */}
      <path
        d="M58 170 C64 162 72 164 70 172 C68 178 62 176 60 170"
        stroke="#8BA888"
        strokeWidth="0.8"
        strokeOpacity="0.4"
        fill="none"
      />
      <path
        d="M56 340 C48 332 40 336 42 344 C44 350 52 348 54 342"
        stroke="#8BA888"
        strokeWidth="0.8"
        strokeOpacity="0.4"
        fill="none"
      />
    </svg>
  );
}

/* Animated gradient underline that draws on viewport entry */
function AnimatedUnderline({ inView }: { inView: boolean }) {
  return (
    <motion.span
      className="block h-[3px] rounded-full"
      style={{
        background: "linear-gradient(90deg, #5E7D5B 0%, #8BA888 50%, #B5CDB2 100%)",
        willChange: "transform",
        transformOrigin: "left center",
      }}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: PREMIUM_EASE }}
    />
  );
}

export default function StorySection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-40">
      {/* Grain overlay */}
      <div className="grain pointer-events-none absolute inset-0" />

      {/* EST. 2023 watermark */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-heading text-[10rem] font-bold leading-none text-sage opacity-[0.05] md:text-[12rem]"
        aria-hidden="true"
      >
        EST.
        <br />
        2023
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 md:gap-16 lg:grid-cols-12">
          {/* Left column — heading + botanical */}
          <motion.div
            ref={headingRef}
            className="flex flex-col items-start gap-8 lg:col-span-5"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: PREMIUM_EASE }}
            style={{ willChange: "transform" }}
          >
            {/* Eyebrow label */}
            <span className="text-xs uppercase tracking-[0.2em] text-sage-dark font-sans font-medium">
              Est. Dallas, TX · 2023
            </span>

            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-6xl font-bold tracking-tight text-charcoal md:text-7xl">
                Our
                <br />
                Story
              </h2>
              {/* Animated gradient underline */}
              <AnimatedUnderline inView={headingInView} />
            </div>

            <div className="hidden lg:block">
              <BotanicalVine />
            </div>
          </motion.div>

          {/* Right column — quote + body + CTA */}
          <div className="flex flex-col gap-10 lg:col-span-7 lg:pt-4">
            {/* Opening quote — rotateX flip entrance */}
            <motion.blockquote
              className="relative"
              initial={{ rotateX: -15, opacity: 0, y: 20 }}
              whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: PREMIUM_EASE }}
              style={{ willChange: "transform", transformPerspective: 800 }}
            >
              {/* Decorative quotation mark */}
              <span
                className="absolute -left-2 -top-8 select-none font-heading text-[6rem] leading-none text-sage opacity-30 md:-left-4 md:-top-10 md:text-[8rem]"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="relative font-heading text-2xl italic leading-snug text-charcoal md:text-3xl">
                We believe kombucha should be something you actually crave&nbsp;&mdash; not
                something you force down for the health benefits.
              </p>
            </motion.blockquote>

            {/* Body paragraphs — staggered translateY fade-in */}
            <div className="flex flex-col gap-6">
              {[
                "In May 2023, Shyler and Trevor Landry combined their passions\u00a0\u2014 nutrition science and beverage artistry\u00a0\u2014 to create something Dallas had never tasted. A kombucha that\u2019s less acidic, more approachable, and infused with botanicals that actually do something.",
                "Every batch is handcrafted in small quantities, using organic tea, live cultures, and ingredients sourced for both flavor and function\u00a0\u2014 from Sicilian botanicals to Japanese adaptogens. Two lines tell our story: the Carpenter Line for bold, grounding flavors, and the Gardener Line for gentle, floral notes.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className="text-base leading-relaxed text-charcoal-light md:text-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: PREMIUM_EASE }}
                  style={{ willChange: "transform" }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Meet the Founders link — animated underline via framer-motion whileHover */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.55, ease: PREMIUM_EASE }}
              style={{ willChange: "transform" }}
            >
              <motion.a
                href="/founders"
                className={cn(
                  "group relative inline-flex items-center gap-2 text-sm font-medium text-sage-dark",
                  "pb-0.5"
                )}
                style={{ willChange: "transform" }}
              >
                Meet the Founders
                {/* Animated underline span */}
                <motion.span
                  className="pointer-events-none absolute bottom-0 left-0 block h-[1.5px] w-full origin-left bg-sage-dark"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35, ease: HOVER_EASE }}
                  style={{ willChange: "transform" }}
                />
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
