import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Benefits", href: "/benefits" },
  { label: "Find Us", href: "/find-us" },
  { label: "FAQ", href: "/faq" },
];

const productLinks = [
  { label: "Oak & Coconut", href: "/products/oak-coconut" },
  { label: "Passionflower & Aloe", href: "/products/passionflower-aloe" },
  { label: "Lavender & Blue Mallow", href: "/products/lavender-blue-mallow" },
  { label: "Rose Petal & Lychee", href: "/products/rose-petal-lychee" },
  { label: "Palo Santo", href: "/products/palo-santo" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/aliveandwellkombucha" },
  { label: "TikTok", href: "https://tiktok.com/@aliveandwellkombucha" },
  { label: "Facebook", href: "https://facebook.com/aliveandwellkombucha" },
];

/* Animated underline link — scaleX 0→1 from left on hover */
function AnimatedLink({
  href,
  children,
  target,
  rel,
  className,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group relative inline-block font-sans text-sm text-sage-light",
        "transition-colors duration-200 hover:text-cream",
        className,
      )}
      style={{ willChange: "color" }}
    >
      {children}
      {/* Animated underline */}
      <span
        className="absolute bottom-0 left-0 block h-[1px] w-full origin-left scale-x-0 bg-cream transition-transform duration-300 group-hover:scale-x-100"
        style={{
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-charcoal px-6 pt-16 pb-8 overflow-hidden">
      {/* Animated gradient line above footer */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: "linear-gradient(90deg, #8BA888, #E8A87C, #9B8EC4, #D4A5A5, #8BA888)",
          backgroundSize: "200% 100%",
          animation: "color-sweep 6s linear infinite",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <span className="font-heading text-2xl tracking-wide text-cream">
              ALIVE &amp; WELL
            </span>
            <p className="mt-4 font-sans text-sm text-sage-light">
              Feeling good should taste amazing.
            </p>
            <p className="mt-2 text-xs text-charcoal-light">Dallas, TX</p>
          </div>

          {/* Column 2: Navigate */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-cream/60">
              Navigate
            </h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <AnimatedLink href={link.href}>{link.label}</AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-cream/60">
              Products
            </h4>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <AnimatedLink href={link.href}>{link.label}</AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-cream/60">
              Connect
            </h4>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <AnimatedLink
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
            <AnimatedLink
              href="mailto:thirsty@aliveandwellkombucha.com"
              className="mt-4 block !text-sage hover:!text-cream"
            >
              thirsty@aliveandwellkombucha.com
            </AnimatedLink>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-charcoal-light" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-charcoal-light">
            &copy; 2024 Alive &amp; Well Kombucha. All rights reserved.
          </p>
          <p className="text-xs text-charcoal-light">
            Handcrafted in Dallas, TX
          </p>
        </div>
      </div>
    </footer>
  );
}
