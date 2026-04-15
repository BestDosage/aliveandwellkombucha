"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { ShinyButton } from "@/components/ui/shiny-button";

/* CSS-only orbiting botanicals — no framer-motion, no hydration cost */
function OrbitingBotanicals() {
  return (
    <div className="absolute inset-[-45%] pointer-events-none">
      {/* Orbit 1 — slow, large */}
      <div className="absolute inset-[8%] orbit-cw-slow">
        <Leaf x="50%" y="0%" size={28} color="#8BA888" rotation={-25} />
        <Leaf x="100%" y="50%" size={22} color="#B5CDB2" rotation={50} />
        <Petal x="0%" y="55%" size={18} color="#D4A5A5" rotation={-50} />
        <Petal x="55%" y="100%" size={16} color="#E8A87C" rotation={20} />
      </div>

      {/* Orbit 2 — medium, reverse */}
      <div className="absolute inset-[22%] orbit-ccw-medium">
        <Leaf x="10%" y="80%" size={20} color="#5E7D5B" rotation={-40} />
        <Petal x="88%" y="12%" size={16} color="#9B8EC4" rotation={35} />
        <Bubble x="92%" y="72%" size={10} />
        <Bubble x="12%" y="18%" size={8} />
      </div>

      {/* Orbit 3 — fast, inner */}
      <div className="absolute inset-[34%] orbit-cw-fast">
        <Sparkle x="85%" y="8%" size={10} />
        <Sparkle x="8%" y="75%" size={8} />
        <Bubble x="88%" y="60%" size={6} />
      </div>

      {/* Independent floaters — CSS animation */}
      {[
        { x: "3%", y: "12%", size: 30, color: "#B5CDB2", rot: -15, dur: "6s", delay: "0s" },
        { x: "92%", y: "18%", size: 24, color: "#D4A5A5", rot: 35, dur: "7s", delay: "0.7s" },
        { x: "90%", y: "78%", size: 26, color: "#C4A882", rot: -10, dur: "5.5s", delay: "1.4s" },
        { x: "6%", y: "82%", size: 22, color: "#8BA888", rot: 55, dur: "7.5s", delay: "2.1s" },
      ].map((f, i) => (
        <div
          key={i}
          className="absolute gentle-float"
          style={{
            left: f.x,
            top: f.y,
            "--base-rot": `${f.rot}deg`,
            "--float-dur": f.dur,
            "--float-delay": f.delay,
          } as React.CSSProperties}
        >
          {i % 2 === 0 ? (
            <Leaf size={f.size} color={f.color} rotation={f.rot} />
          ) : (
            <Petal size={f.size} color={f.color} rotation={f.rot} />
          )}
        </div>
      ))}
    </div>
  );
}

function Leaf({ x, y, size, color, rotation = 0 }: { x?: string; y?: string; size: number; color: string; rotation?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y, transform: x ? `translate(-50%,-50%) rotate(${rotation}deg)` : `rotate(${rotation}deg)` }}>
      <path d="M20 4C28 8 36 16 36 26C36 32 30 38 20 38C10 38 4 32 4 26C4 16 12 8 20 4Z" fill={color} opacity={0.55} />
      <path d="M20 10L20 32M14 18L20 22M26 16L20 20" stroke={color} strokeWidth={0.8} opacity={0.25} fill="none" />
    </svg>
  );
}

function Petal({ x, y, size, color, rotation = 0 }: { x?: string; y?: string; size: number; color: string; rotation?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y, transform: x ? `translate(-50%,-50%) rotate(${rotation}deg)` : `rotate(${rotation}deg)` }}>
      <ellipse cx="15" cy="15" rx="7" ry="13" fill={color} opacity={0.45} />
    </svg>
  );
}

function Bubble({ x, y, size }: { x?: string; y?: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      <circle cx="10" cy="10" r="7" stroke="#8BA888" strokeWidth={1} fill="none" opacity={0.3} />
    </svg>
  );
}

function Sparkle({ x, y, size }: { x?: string; y?: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      <path d="M10 3L10 17M3 10L17 10" stroke="#8BA888" strokeWidth={1.2} strokeLinecap="round" opacity={0.35} />
    </svg>
  );
}

/* CSS text reveal — word-by-word with stagger via animation-delay */
function TextRevealCSS({ children, delay = 0 }: { children: string; delay?: number }) {
  const words = children.split(" ");
  return (
    <span className="inline">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] pt-[0.05em]">
          <span
            className="text-reveal-word inline-block"
            style={{ animationDelay: `${delay + i * 0.08}s` }}
          >
            {word}
          </span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative flex h-screen w-full overflow-hidden">
      {/* Gradient */}
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(121deg, #8BA888 -20%, #B5CDB2 20%, #F5D0B5 50%, #D4CCE8 80%, #FBF7F0 120%)", backgroundSize: "200% 200%", animation: "hero-gradient 12s ease infinite" }} />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col items-center lg:flex-row">
        {/* Left — text */}
        <div className="flex shrink-0 flex-col items-center justify-center px-6 pt-20 sm:px-8 sm:pt-28 lg:flex-1 lg:items-start lg:pl-16 lg:pr-0 lg:pt-0 xl:pl-20">
          <h1 className="text-center font-heading leading-[1.05] tracking-[-0.02em] text-charcoal lg:text-left" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            <TextRevealCSS delay={0.1}>Feeling Good</TextRevealCSS>
            <br />
            <TextRevealCSS delay={0.25}>Should Taste</TextRevealCSS>
            <br />
            <TextRevealCSS delay={0.4}>Amazing</TextRevealCSS>
          </h1>

          <p
            className="mt-5 max-w-[400px] text-center text-[15px] leading-[1.7] text-charcoal/60 lg:text-left opacity-0"
            style={{ animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.7s forwards" }}
          >
            Small-batch, handcrafted kombucha from Dallas, TX — crafted with botanical infusions for your gut, brain &amp; soul.
          </p>

          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start opacity-0 sm:mt-9"
            style={{ animation: "fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.9s forwards" }}
          >
            <ShinyButton href="#products" variant="primary">Shop Now</ShinyButton>
            <ShinyButton href="#story" variant="outline">Our Story</ShinyButton>
          </div>
        </div>

        {/* Right — can with orbiting botanicals */}
        <div className="relative flex flex-1 items-center justify-center">
          <div
            className="relative opacity-0"
            style={{ animation: "scaleIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s forwards" }}
          >
            <OrbitingBotanicals />
            <div className="relative z-10 pointer-events-none">
              <Image
                src="/images/can-palo-santo.png"
                alt="Alive & Well Kombucha — Palo Santo"
                width={500}
                height={700}
                className="h-[50vh] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:h-[55vh] md:h-[65vh] lg:h-[72vh]"
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 45vw, 35vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 opacity-0 sm:bottom-8"
        style={{ animation: "fadeIn 0.6s ease 1.2s forwards" }}
      >
        <div className="animate-float">
          <ChevronDown className="h-5 w-5 text-charcoal/30" />
        </div>
      </div>
    </section>
  );
}
