"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const socialImages = [
  { id: 1, span: "col-span-2 row-span-2" },
  { id: 2, span: "col-span-1 row-span-1" },
  { id: 3, span: "col-span-1 row-span-2" },
  { id: 4, span: "col-span-1 row-span-1" },
  { id: 5, span: "col-span-2 row-span-1" },
  { id: 6, span: "col-span-1 row-span-1" },
];

function SocialCard({ image, index }: { image: typeof socialImages[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0, 1] }}
      className={`${image.span} group relative overflow-hidden cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Placeholder Image */}
      <div className="absolute inset-0 bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <span className="font-serif text-4xl md:text-6xl text-[#7A7A7A]/20">
            {String(image.id).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Hover Overlay with Glitch Effect */}
      <motion.div
        className="absolute inset-0 bg-[#050505]/60 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="w-8 h-8 md:w-10 md:h-10 text-[#EAEAEA] mx-auto"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="18" cy="6" r="1.5" fill="currentColor" />
          </svg>
          <p className="font-sans text-[10px] tracking-[0.3em] text-[#7A7A7A] uppercase mt-3">
            @pureevil
          </p>
        </motion.div>
      </motion.div>

      {/* Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glitch Lines on Hover */}
      {isHovered && (
        <>
          <motion.div
            className="absolute inset-x-0 h-px bg-[#d30000]/50"
            initial={{ top: "30%", opacity: 0 }}
            animate={{ top: ["30%", "70%", "30%"], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-x-0 h-px bg-[#EAEAEA]/30"
            initial={{ top: "60%", opacity: 0 }}
            animate={{ top: ["60%", "20%", "60%"], opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
        </>
      )}
    </motion.div>
  );
}

export function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8 lg:px-16 bg-[#050505]"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="font-sans text-[10px] tracking-[0.5em] text-[#7A7A7A] uppercase mb-4">
              The Cult
            </p>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] text-[#EAEAEA] uppercase">
              Join The Movement
            </h2>
          </div>
          <motion.a
            href="https://instagram.com/pureevil"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 font-sans text-xs tracking-[0.3em] text-[#7A7A7A] uppercase hover:text-[#EAEAEA] transition-colors"
            whileHover={{ x: 8 }}
          >
            @pureevil
            <span className="w-12 h-px bg-[#7A7A7A] group-hover:bg-[#EAEAEA] group-hover:w-16 transition-all" />
          </motion.a>
        </motion.div>
      </div>

      {/* Social Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {socialImages.map((image, index) => (
            <SocialCard key={image.id} image={image} index={index} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0, 1] }}
        className="max-w-7xl mx-auto mt-12 md:mt-16 text-center"
      >
        <p className="font-sans text-sm md:text-base text-[#7A7A7A] mb-6 leading-relaxed">
          {"Share your darkness. Tag us to be featured."}
        </p>
        <p className="font-serif text-lg md:text-xl tracking-[0.2em] text-[#EAEAEA]">
          #PUREEVIL #CONTROLLEDINSANITY
        </p>
      </motion.div>
    </section>
  );
}
