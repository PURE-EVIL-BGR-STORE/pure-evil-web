"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  isLarge?: boolean;
}

const products: Product[] = [
  { id: 1, name: "VOID OVERSIZED TEE", category: "APPAREL", price: "$85", image: "/products/void-tee.jpg", isLarge: true },
  { id: 2, name: "SIGIL COMPRESSION", category: "GYMWEAR", price: "$120", image: "/products/sigil-compression.jpg" },
  { id: 3, name: "RITUAL HOODIE", category: "APPAREL", price: "$180", image: "/products/ritual-hoodie.jpg" },
  { id: 4, name: "ECLIPSE CHAIN", category: "JEWELRY", price: "$95", image: "/products/eclipse-chain.jpg" },
  { id: 5, name: "CONTROLLED INSANITY TEE", category: "APPAREL", price: "$85", image: "/products/ci-tee.jpg", isLarge: true },
  { id: 6, name: "BERSERK TANK", category: "GYMWEAR", price: "$65", image: "/products/berserk-tank.jpg" },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0, 1] }}
      className={`group relative ${product.isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-[#111111] overflow-hidden">
        {/* Product Image Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 border border-[#7A7A7A]/20 flex items-center justify-center">
              <span className="font-serif text-4xl text-[#7A7A7A]/30">{product.id}</span>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-[#050505]/60 flex items-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-full py-3 bg-[#EAEAEA] text-[#050505] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#d30000] hover:text-[#EAEAEA] transition-colors"
          >
            Add to Cart
          </motion.button>
        </motion.div>

        {/* Grain Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Hover Zoom Effect */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <motion.div
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-sans text-[10px] tracking-[0.3em] text-[#7A7A7A] uppercase">
            {product.category}
          </p>
          <h3 className="font-serif text-sm md:text-base tracking-[0.15em] text-[#EAEAEA] uppercase mt-1">
            {product.name}
          </h3>
          <p className="font-sans text-sm text-[#EAEAEA] mt-2">
            {product.price}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section 
      ref={sectionRef}
      id="featured"
      className="relative py-24 md:py-32 px-4 md:px-8 lg:px-16 bg-[#050505]"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="font-sans text-[10px] tracking-[0.5em] text-[#7A7A7A] uppercase mb-4">
              Featured
            </p>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] text-[#EAEAEA] uppercase">
              The Collection
            </h2>
          </div>
          <motion.a
            href="/shop"
            className="group flex items-center gap-4 font-sans text-xs tracking-[0.3em] text-[#7A7A7A] uppercase hover:text-[#EAEAEA] transition-colors"
            whileHover={{ x: 8 }}
          >
            View All
            <span className="w-12 h-px bg-[#7A7A7A] group-hover:bg-[#EAEAEA] group-hover:w-16 transition-all" />
          </motion.a>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.1, 0, 1] }}
        className="max-w-7xl mx-auto mt-24 md:mt-32 h-px bg-gradient-to-r from-transparent via-[#7A7A7A]/30 to-transparent origin-left"
      />
    </section>
  );
}
