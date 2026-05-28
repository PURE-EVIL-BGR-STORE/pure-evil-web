"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sigil } from "@/shared/ui/sigil/Sigil";

export function BrandPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  const lines = [
    "We are not a clothing brand.",
    "We are an identity.",
    "A manifestation of obsession,",
    "discipline, rage,",
    "and aesthetic violence."
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 lg:py-64 px-4 md:px-8 overflow-hidden bg-[#050505]"
    >
      {/* Background Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated Sigils */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 opacity-[0.04]"
      >
        <Sigil variant="celestial" className="w-full h-full text-[#EAEAEA]" />
      </motion.div>
      
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 -right-20 w-48 h-48 md:w-80 md:h-80 opacity-[0.04]"
      >
        <Sigil variant="eclipse" className="w-full h-full text-[#EAEAEA]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Top Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto opacity-60">
            <Sigil variant="berserk" className="w-full h-full text-[#7A7A7A]" />
          </div>
        </motion.div>

        {/* Philosophy Text */}
        <div className="space-y-2 md:space-y-4">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 1, 
                delay: 0.2 + index * 0.15, 
                ease: [0.25, 0.1, 0, 1] 
              }}
              className={`font-serif tracking-[0.1em] md:tracking-[0.15em] ${
                index === 0 || index === 1 
                  ? "text-xl sm:text-2xl md:text-4xl lg:text-5xl text-[#EAEAEA]" 
                  : "text-lg sm:text-xl md:text-3xl lg:text-4xl text-[#7A7A7A]"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1, ease: [0.25, 0.1, 0, 1] }}
          className="mt-16 md:mt-24 h-px w-32 md:w-48 mx-auto bg-gradient-to-r from-transparent via-[#d30000] to-transparent"
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-[#7A7A7A]/40 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: "100%",
            }}
            animate={{
              y: "-10%",
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  );
}
