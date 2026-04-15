export interface Product {
  id: string;
  name: string;
  handle: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  line: "carpenter" | "gardener" | "bundle";
  color: string;
  accentColor: string;
  tags: string[];
  image?: string;
}

export const products: Product[] = [
  {
    id: "oak-coconut",
    name: "Oak & Coconut with Shilajit",
    handle: "alive-well-oak-coconut-with-shilajit",
    price: 22.49,
    compareAtPrice: 24.0,
    description:
      "Bold, grounded, quietly powerful blend combining oak warmth, coconut creaminess, and shilajit earthiness.",
    shortDescription: "Bold warmth meets quiet power",
    line: "carpenter",
    color: "#8B7355",
    accentColor: "#C4A882",
    tags: ["grounding", "bold", "earthy"],
  },
  {
    id: "passionflower-aloe",
    name: "Passionflower & Aloe",
    handle: "alive-well-passionflower-aloe",
    price: 22.49,
    compareAtPrice: 24.0,
    description:
      "Designed to bridge refreshment and calm with floral softness and cooling aloe essence for tranquility.",
    shortDescription: "Floral calm, cooling refresh",
    line: "gardener",
    color: "#8BA888",
    accentColor: "#B5CDB2",
    tags: ["calming", "floral", "refreshing"],
  },
  {
    id: "lavender-blue-mallow",
    name: "Lavender & Blue Mallow",
    handle: "alive-well-lavender-blue-mallow-kombucha",
    price: 22.49,
    compareAtPrice: 24.0,
    description:
      "A gentle whisper offering subtle, soothing, exquisitely calming ritual for quiet reflection moments.",
    shortDescription: "Gentle whisper of calm",
    line: "gardener",
    color: "#9B8EC4",
    accentColor: "#D4CCE8",
    tags: ["soothing", "lavender", "calm"],
    image: "/images/can-lavender-blue-mallow.png",
  },
  {
    id: "rose-petal-lychee",
    name: "Rose Petal & Lychee",
    handle: "alive-well-rose-petal-lychee-kombucha-6pk",
    price: 22.49,
    compareAtPrice: 24.0,
    description:
      "Perfect marriage of delicate floral notes and exotic fruit combining rose essence with tropical lychee sweetness.",
    shortDescription: "Delicate florals meet tropical fruit",
    line: "gardener",
    color: "#D4A5A5",
    accentColor: "#F0D5D5",
    tags: ["floral", "tropical", "sweet"],
    image: "/images/can-rose-petal-lychee.png",
  },
  {
    id: "palo-santo",
    name: "Palo Santo",
    handle: "alive-well-palo-santo",
    price: 19.99,
    compareAtPrice: 24.0,
    description:
      "A grounding ritual featuring sacred wood character, ancient and surprisingly refreshing balance.",
    shortDescription: "Sacred wood, grounding ritual",
    line: "carpenter",
    color: "#C4A882",
    accentColor: "#E8D4B8",
    tags: ["grounding", "ritual", "wood"],
    image: "/images/can-palo-santo.png",
  },
];

export const bundles = [
  {
    id: "sampler-10",
    name: "10 Pack Sampler",
    price: 37.5,
    compareAtPrice: 39.99,
    description:
      "An invitation to explore all our carefully crafted blends and discover your personal favorites.",
  },
  {
    id: "carpenter-6pk",
    name: "Carpenter Line 6pk",
    price: 22.49,
    compareAtPrice: 23.99,
    description:
      "Curated selection featuring vibrant, flavorful kombucha blends emphasizing artisanal craft and wellness.",
  },
  {
    id: "gardener-6pk",
    name: "Gardener Line 6pk",
    price: 22.49,
    compareAtPrice: 23.99,
    description:
      "Curated tasting experience with botanicals and garden-inspired flavors offering balanced introduction.",
  },
];

export const benefits = [
  {
    title: "Gut Health",
    description:
      "Live probiotics and prebiotics nourish your microbiome, supporting digestive balance with every sip.",
    icon: "gut",
  },
  {
    title: "Brain Clarity",
    description:
      "Functional botanicals like passionflower and palo santo promote focus, calm, and mental clarity.",
    icon: "brain",
  },
  {
    title: "Immune Support",
    description:
      "Naturally fermented with organic tea and adaptogens that fortify your body's defenses.",
    icon: "shield",
  },
  {
    title: "Less Acidic",
    description:
      "Our signature slow-brew process creates a smoother, more approachable kombucha that won't bite back.",
    icon: "drop",
  },
];

export const socialLinks = {
  instagram: "https://instagram.com/aliveandwellkombucha",
  facebook: "https://facebook.com/aliveandwellkombucha",
  tiktok: "https://tiktok.com/@alive.well.kombucha",
};
