"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface Collection {
  id: number;
  name: string;
  tagline: string;
  image: string;
}

const collections: Collection[] = [
  { id: 1, name: "VOID", tagline: "Embrace the emptiness", image: "/images/collections/void.png" },
  { id: 2, name: "ASCENSION", tagline: "Rise beyond mortality", image: "/images/collections/ascension.png" },
  { id: 3, name: "RITUAL", tagline: "Sacred darkness", image: "/images/collections/ritual.png" },
  { id: 4, name: "CONTROLLED INSANITY", tagline: "Order in chaos", image: "/images/collections/controlled-insanity.png" },
  { id: 5, name: "ECLIPSE", tagline: "Mark of the devoted", image: "/images/collections/eclipse.png" },
];

export function CollectionShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative py-24 md:py-32 bg-[#050505] overflow-hidden"
    >
      {/* Section Header */}
      <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
        >
          <p className="font-sans text-[10px] tracking-[0.5em] text-[#7A7A7A] uppercase mb-4">
            Collections
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] text-[#EAEAEA] uppercase">
            Enter The Void
          </h2>
        </motion.div>
      </div>

      {/* Collection Slider */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Collection Slides */}
        <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 md:gap-6 px-4 md:px-8 lg:px-16 pb-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0, 1] }}
              className={`flex-shrink-0 snap-center ${
                index === 0 ? "w-[85vw] md:w-[70vw] lg:w-[60vw]" : "w-[75vw] md:w-[50vw] lg:w-[40vw]"
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="relative aspect-[16/10] md:aspect-[16/9] bg-[#111111] overflow-hidden group cursor-pointer">
                {/* Collection Image */}
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 60vw"
                />

                {/* Overlay on Hover */}
                <motion.div
                  className="absolute inset-0 bg-[#050505]/40"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Collection Info */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-[#7A7A7A] uppercase mb-2">
                      {collection.tagline}
                    </p>
                    <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl tracking-[0.2em] text-[#EAEAEA] uppercase">
                      {collection.name}
                    </h3>
                  </motion.div>

                  {/* Explore Button */}
                  <motion.button
                    className="mt-6 self-start px-6 py-3 border border-[#7A7A7A]/30 text-[#EAEAEA] font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#EAEAEA] hover:text-[#050505]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore
                  </motion.button>
                </div>

                {/* Grain */}
                <div 
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 justify-center mt-8">
          {collections.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-0.5 transition-all duration-500 ${
                index === activeIndex 
                  ? "w-12 bg-[#EAEAEA]" 
                  : "w-6 bg-[#7A7A7A]/30 hover:bg-[#7A7A7A]/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
