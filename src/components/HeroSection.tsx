"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { ShinyButton } from "@/components/ui/shiny-button";
import { TextReveal } from "@/components/ui/text-reveal";

/* Orbiting botanical elements around the can */
function OrbitingBotanicals() {
  return (
    <div className="absolute inset-[-45%] pointer-events-none">
      {/* Orbit 1 — slow, large */}
      <motion.div
        className="absolute inset-[8%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <Leaf x="50%" y="0%" size={28} color="#8BA888" rotation={-25} />
        <Leaf x="100%" y="50%" size={22} color="#B5CDB2" rotation={50} />
        <Petal x="0%" y="55%" size={18} color="#D4A5A5" rotation={-50} />
        <Petal x="55%" y="100%" size={16} color="#E8A87C" rotation={20} />
      </motion.div>

      {/* Orbit 2 — medium, reverse */}
      <motion.div
        className="absolute inset-[22%]"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Leaf x="10%" y="80%" size={20} color="#5E7D5B" rotation={-40} />
        <Petal x="88%" y="12%" size={16} color="#9B8EC4" rotation={35} />
        <Bubble x="92%" y="72%" size={10} />
        <Bubble x="12%" y="18%" size={8} />
      </motion.div>

      {/* Orbit 3 — fast, inner */}
      <motion.div
        className="absolute inset-[34%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <Sparkle x="85%" y="8%" size={10} />
        <Sparkle x="8%" y="75%" size={8} />
        <Bubble x="88%" y="60%" size={6} />
      </motion.div>

      {/* Independent floaters */}
      {[
        { x: "3%", y: "12%", size: 30, color: "#B5CDB2", rot: -15, dur: 6 },
        { x: "92%", y: "18%", size: 24, color: "#D4A5A5", rot: 35, dur: 7 },
        { x: "90%", y: "78%", size: 26, color: "#C4A882", rot: -10, dur: 5.5 },
        { x: "6%", y: "82%", size: 22, color: "#8BA888", rot: 55, dur: 7.5 },
      ].map((f, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: f.x, top: f.y }}
          animate={{ y: [-8, 8, -8], rotate: [f.rot - 5, f.rot + 5, f.rot - 5] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
        >
          {i % 2 === 0 ? (
            <Leaf size={f.size} color={f.color} rotation={f.rot} />
          ) : (
            <Petal size={f.size} color={f.color} rotation={f.rot} />
          )}
        </motion.div>
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

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const canX = useSpring(mouseX, { stiffness: 50, damping: 25, mass: 1 });
  const canY = useSpring(mouseY, { stiffness: 50, damping: 25, mass: 1 });

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.06);
      mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.06);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} className="relative flex h-screen w-full overflow-hidden">
      {/* Gradient */}
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(121deg, #8BA888 -20%, #B5CDB2 20%, #F5D0B5 50%, #D4CCE8 80%, #FBF7F0 120%)", backgroundSize: "200% 200%", animation: "hero-gradient 12s ease infinite" }} />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col items-center lg:flex-row">
        {/* Left — text with TextReveal */}
        <div className="flex flex-1 flex-col items-center justify-center px-8 pt-28 lg:items-start lg:pl-16 lg:pr-0 lg:pt-0 xl:pl-20">
          <h1 className="text-center font-heading leading-[1.05] tracking-[-0.02em] text-charcoal lg:text-left" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
            <TextReveal delay={0.1}>Feeling Good</TextReveal>
            <br />
            <TextReveal delay={0.25}>Should Taste</TextReveal>
            <br />
            <TextReveal delay={0.4}>Amazing</TextReveal>
          </h1>

          <motion.p
            className="mt-7 max-w-[400px] text-center text-[15px] leading-[1.7] text-charcoal/60 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Small-batch, handcrafted kombucha from Dallas, TX — crafted with botanical infusions for your gut, brain &amp; soul.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <ShinyButton href="#products" variant="primary">Shop Now</ShinyButton>
            <ShinyButton href="#story" variant="outline">Our Story</ShinyButton>
          </motion.div>
        </div>

        {/* Right — can with orbiting botanicals */}
        <div className="relative flex flex-1 items-center justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <OrbitingBotanicals />
            <motion.div className="relative z-10 pointer-events-none" style={hasLoaded ? { x: canX, y: canY } : undefined}>
              <Image
                src="/images/can-palo-santo.png"
                alt="Alive & Well Kombucha — Palo Santo"
                width={500}
                height={700}
                className="h-[45vh] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:h-[55vh] md:h-[65vh] lg:h-[72vh]"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5 text-charcoal/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
