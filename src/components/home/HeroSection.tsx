"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sigil } from "@/shared/ui/sigil/Sigil";

function NoiseOverlay() {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#7A7A7A]/30 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: "110%",
            opacity: 0,
          }}
          animate={{
            y: "-10%",
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function AnimatedSigil({ className, variant, delay = 0 }: { className: string; variant: "berserk" | "celestial" | "gothic-cross" | "eclipse"; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ 
        opacity: [0.03, 0.08, 0.03],
        scale: [0.95, 1.05, 0.95],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <Sigil variant={variant} className="w-full h-full text-[#EAEAEA]" />
    </motion.div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  
  const lightX = useTransform(smoothX, [0, 1], ["-30%", "30%"]);
  const lightY = useTransform(smoothY, [0, 1], ["-30%", "30%"]);

  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      <NoiseOverlay />
      
      {/* Mouse-follow lighting effect */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          x: lightX,
          y: lightY,
          background: "radial-gradient(circle, rgba(234,234,234,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Animated background sigils */}
      <AnimatedSigil className="absolute top-20 left-10 w-48 h-48 md:w-64 md:h-64" variant="celestial" delay={0} />
      <AnimatedSigil className="absolute bottom-20 right-10 w-40 h-40 md:w-56 md:h-56" variant="eclipse" delay={5} />
      <AnimatedSigil className="absolute top-1/3 right-1/4 w-32 h-32 md:w-48 md:h-48" variant="berserk" delay={10} />
      <AnimatedSigil className="absolute bottom-1/3 left-1/4 w-36 h-36 md:w-52 md:h-52" variant="gothic-cross" delay={15} />

      <FloatingParticles />

      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-[#050505]/70 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0, 1] }}
          className="mb-8"
        >
          <Image
            src="/PURE_EVIL_LOGO_4.png"
            alt="PURE EVIL"
            width={120}
            height={120}
            className="w-24 h-24 md:w-32 md:h-32 invert opacity-90"
            priority
          />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.3em] text-[#EAEAEA] mb-4"
        >
          PURE EVIL
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="font-sans text-sm sm:text-base md:text-lg tracking-[0.5em] text-[#7A7A7A] uppercase mb-8"
        >
          Controlled Insanity
        </motion.h2>

        {/* Manifesto text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.9 }}
          className="font-sans text-xs sm:text-sm md:text-base text-[#7A7A7A]/80 max-w-lg mb-12 leading-relaxed tracking-wider"
        >
          {"Built for the ones consumed by obsession."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          {/* Primary Button */}
          <motion.a
            href="#collection"
            onMouseEnter={() => setIsHovered("enter")}
            onMouseLeave={() => setIsHovered(null)}
            className="group relative px-10 py-4 bg-[#EAEAEA] text-[#050505] font-sans text-xs tracking-[0.3em] uppercase overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-[#d30000]"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered === "enter" ? "0%" : "-100%" }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
            />
            <span className={`relative z-10 transition-colors duration-300 ${isHovered === "enter" ? "text-[#EAEAEA]" : ""}`}>
              Enter The Void
            </span>
          </motion.a>

          {/* Secondary Button */}
          <motion.a
            href="#featured"
            onMouseEnter={() => setIsHovered("explore")}
            onMouseLeave={() => setIsHovered(null)}
            className="group relative px-10 py-4 border border-[#7A7A7A]/30 text-[#EAEAEA] font-sans text-xs tracking-[0.3em] uppercase overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-[#EAEAEA]/10"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered === "explore" ? "0%" : "-100%" }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
            />
            <span className="relative z-10">Explore Collection</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] text-[#7A7A7A] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#7A7A7A] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
