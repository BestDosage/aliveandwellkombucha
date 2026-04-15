import { cn } from "@/lib/utils";

const ROW_1_ITEMS = [
  "PROBIOTICS",
  "BOTANICALS",
  "GUT HEALTH",
  "HANDCRAFTED",
  "SMALL BATCH",
  "DALLAS TX",
  "LIVE CULTURES",
  "FEEL AMAZING",
];

const ROW_2_ITEMS = [
  "OAK & COCONUT",
  "PASSIONFLOWER",
  "LAVENDER",
  "ROSE PETAL",
  "PALO SANTO",
  "BLUE MALLOW",
  "LYCHEE",
  "SHILAJIT",
];

function MarqueeContent({ items, dotClassName }: { items: string[]; dotClassName?: string }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6 md:gap-10 shrink-0">
          <span>{item}</span>
          <span className={cn("text-base md:text-lg", dotClassName)}>●</span>
        </span>
      ))}
    </>
  );
}

export default function MarqueeSection() {
  return (
    <section
      className="relative py-10 md:py-24 overflow-hidden group"
      aria-label="Scrolling brand highlights"
      style={{ backgroundColor: "#8BA888" }}
    >
      {/* Row 1 — filled cream text, left to right */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-4 md:gap-10 font-heading text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold animate-marquee group-hover:[animation-play-state:paused]" style={{ color: "#FBF7F0" }}>
          <MarqueeContent items={ROW_1_ITEMS} dotClassName="opacity-60" />
          <MarqueeContent items={ROW_1_ITEMS} dotClassName="opacity-60" />
        </div>
      </div>

      {/* Row 2 — outlined cream text, right to left */}
      <div className="flex overflow-hidden whitespace-nowrap mt-3 md:mt-8">
        <div
          className="flex items-center gap-4 md:gap-10 font-heading text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold animate-marquee-slow group-hover:[animation-play-state:paused]"
          style={{
            WebkitTextStroke: "2px #FBF7F0",
            color: "transparent",
            animationDirection: "reverse",
          }}
        >
          <MarqueeContent items={ROW_2_ITEMS} dotClassName="opacity-60" />
          <MarqueeContent items={ROW_2_ITEMS} dotClassName="opacity-60" />
        </div>
      </div>
    </section>
  );
}
