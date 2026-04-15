"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Shop", href: "#products" },
  { label: "Our Story", href: "#story" },
  { label: "Benefits", href: "#benefits" },
  { label: "Find Us", href: "#find-us" },
] as const;

function LeafAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("w-4 h-4", className)}
      aria-hidden="true"
    >
      <path
        d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.5-3 9-8 .5-5-2-8-2-8s-1 1-3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 15s2-2 6-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      <motion.span
        className="block h-[1.5px] w-full bg-current origin-center"
        animate={
          open
            ? { rotate: 45, y: 7.5 }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="block h-[1.5px] w-full bg-current origin-center"
        animate={open ? { opacity: 0, x: -12 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <motion.span
        className="block h-[1.5px] w-full bg-current origin-center"
        animate={
          open
            ? { rotate: -45, y: -7.5 }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -20,
    transition: {
      delay: i * 0.04,
      duration: 0.3,
      ease: "easeIn" as const,
    },
  }),
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-cream/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300 ease-in-out",
              "h-16 md:h-20"
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              className="group relative flex items-center gap-2"
            >
              <LeafAccent
                className={cn(
                  "transition-colors duration-300 ease-in-out -mt-0.5",
                  scrolled
                    ? "text-sage-dark"
                    : "text-sage-light"
                )}
              />
              <span
                className={cn(
                  "font-heading text-lg md:text-xl tracking-[0.2em] font-semibold transition-colors duration-300 ease-in-out",
                  scrolled ? "text-charcoal" : "text-white"
                )}
              >
                ALIVE & WELL
              </span>
              {/* Hover underline */}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 ease-out",
                  scrolled ? "bg-charcoal/30" : "bg-white/40"
                )}
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-sans text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300 ease-in-out",
                    "after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 after:ease-out hover:after:w-full",
                    scrolled
                      ? "text-charcoal/70 hover:text-charcoal after:bg-charcoal/30"
                      : "text-white/80 hover:text-white after:bg-white/40"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side: CTA + Hamburger */}
            <div className="flex items-center gap-4">
              {/* Order Now — desktop only */}
              <Link
                href="#products"
                className={cn(
                  "hidden md:inline-flex items-center justify-center",
                  "rounded-full px-6 py-2.5",
                  "font-sans text-sm font-medium uppercase tracking-[0.12em]",
                  "bg-sage-dark text-cream",
                  "transition-all duration-300 ease-in-out",
                  "hover:scale-105 hover:shadow-lg hover:shadow-sage-dark/20",
                  "active:scale-[1.02]"
                )}
              >
                Order Now
              </Link>

              {/* Hamburger — mobile only */}
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className={cn(
                  "md:hidden relative z-50 p-2 -mr-2 transition-colors duration-300 ease-in-out",
                  mobileOpen
                    ? "text-charcoal"
                    : scrolled
                      ? "text-charcoal"
                      : "text-white"
                )}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Decorative background leaf */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sage-light/10"
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <svg
                viewBox="0 0 200 200"
                fill="none"
                className="w-64 h-64"
                aria-hidden="true"
              >
                <path
                  d="M100 20C60 20 20 60 20 120c0 30 20 50 40 60 20-40 60-80 120-120C160 30 130 20 100 20Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>

            <nav className="relative flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-3xl md:text-4xl tracking-[0.1em] text-charcoal hover:text-sage-dark transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* CTA in mobile menu */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  href="/shop"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "rounded-full px-10 py-3.5 mt-4",
                    "font-sans text-sm font-medium uppercase tracking-[0.15em]",
                    "bg-sage-dark text-cream",
                    "transition-all duration-300 ease-in-out",
                    "hover:scale-105 hover:shadow-lg hover:shadow-sage-dark/20",
                    "active:scale-[1.02]"
                  )}
                >
                  Order Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
