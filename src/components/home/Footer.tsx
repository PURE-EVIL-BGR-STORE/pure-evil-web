"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Sigil } from "@/shared/ui/sigil/Sigil";

const footerLinks = {
  shop: ["All Products", "Apparel", "Gymwear", "Accessories", "Jewelry"],
  collections: ["Void", "Ascension", "Ritual", "Controlled Insanity"],
  info: ["About", "Contact", "Size Guide", "Shipping", "Returns"],
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      ref={footerRef}
      className="relative pt-24 md:pt-32 pb-8 px-4 md:px-8 lg:px-16 bg-[#050505] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grain */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Fog gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] to-transparent" />
        
        {/* Decorative Sigil */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.02 } : {}}
          transition={{ duration: 2 }}
          className="absolute -bottom-32 -right-32 w-96 h-96"
        >
          <Sigil variant="celestial" className="w-full h-full text-[#EAEAEA]" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section: Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <h3 className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-[#EAEAEA] uppercase mb-4">
            Join The Cult
          </h3>
          <p className="font-sans text-sm text-[#7A7A7A] mb-8 max-w-md mx-auto md:mx-0">
            Subscribe for exclusive drops, ritual updates, and dark revelations.
          </p>
          
          {isSubscribed ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-sans text-sm text-[#d30000] tracking-[0.2em]"
            >
              YOU HAVE BEEN INITIATED.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-transparent border border-[#7A7A7A]/30 text-[#EAEAEA] font-sans text-sm placeholder:text-[#7A7A7A]/50 focus:outline-none focus:border-[#EAEAEA]/50 transition-colors"
                required
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#EAEAEA] text-[#050505] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#d30000] hover:text-[#EAEAEA] transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "..." : "Subscribe"}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Middle Section: Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-24"
        >
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
            <Image
              src="/PURE_EVIL_LOGO_4.png"
              alt="PURE EVIL"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 invert opacity-80 mb-4"
            />
            <p className="font-sans text-xs text-[#7A7A7A] text-center md:text-left leading-relaxed">
              {"Built for the ones consumed by obsession."}
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] text-[#EAEAEA] uppercase mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-sans text-sm text-[#7A7A7A] hover:text-[#EAEAEA] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] text-[#EAEAEA] uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-sans text-sm text-[#7A7A7A] hover:text-[#EAEAEA] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] text-[#EAEAEA] uppercase mb-4">
              Info
            </h4>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-sans text-sm text-[#7A7A7A] hover:text-[#EAEAEA] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Manifesto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-serif text-lg md:text-xl tracking-[0.15em] text-[#7A7A7A]/60 italic">
            {"\"Obsession is not a flaw. It is a gift.\""}
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-[#7A7A7A]/20 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <p className="font-sans text-xs text-[#7A7A7A]/60 tracking-wider">
            &copy; {new Date().getFullYear()} PURE EVIL. All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {["Instagram", "Twitter", "TikTok"].map((social) => (
              <a
                key={social}
                href="#"
                className="font-sans text-xs text-[#7A7A7A]/60 hover:text-[#EAEAEA] transition-colors tracking-wider uppercase"
              >
                {social}
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            {["Privacy", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-xs text-[#7A7A7A]/60 hover:text-[#EAEAEA] transition-colors tracking-wider"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
