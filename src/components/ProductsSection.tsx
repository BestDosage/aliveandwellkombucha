"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { products } from "@/lib/data";
import Image from "next/image";

const bestSellers = products.filter((p) => p.image);

function MagneticProductCard({
  product,
  index,
}: {
  product: (typeof bestSellers)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        x: (y - 0.5) * -12,
        y: (x - 0.5) * 12,
      });
      setShinePos({ x: x * 100, y: y * 100 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group cursor-pointer perspective-[800px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card image area */}
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-2xl"
          style={{ backgroundColor: product.accentColor }}
        >
          {/* Shine sweep on hover */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-20 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            style={{
              background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
            }}
          />

          {/* Subtle inner glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              boxShadow: `inset 0 0 60px rgba(255,255,255,0.15)`,
            }}
          />

          {/* Product image — floats up on hover */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.div
              animate={{ y: isHovered ? -12 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Image
                src={product.image!}
                alt={product.name}
                width={280}
                height={400}
                className="h-[80%] w-auto object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Card info */}
        <div className="mt-5 px-1">
          <h3 className="font-heading text-xl font-semibold text-charcoal">
            {product.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-charcoal/50">
            {product.shortDescription}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-semibold text-sage-dark">
              ${product.price.toFixed(2)}
            </p>
            <span className="rounded-full border border-sage/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-sage-dark transition-colors group-hover:bg-sage-dark group-hover:text-cream">
              6-pack
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProductsSection() {
  return (
    <section className="bg-white py-24 md:py-32 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="font-heading text-5xl md:text-6xl text-charcoal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Best Sellers
          </motion.h2>
          <div className="mx-auto mt-4 h-[2px] w-[60px] bg-sage" />
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {bestSellers.map((product, i) => (
            <MagneticProductCard
              key={product.id}
              product={product}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
