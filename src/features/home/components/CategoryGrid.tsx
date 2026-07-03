'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'

interface Category {
  title: string
  subtitle: string
  img: string
  href: string
  idx: string
}

const CATEGORIES: Category[] = [
  {
    title: 'OUTERWEAR',
    subtitle: 'Technical cowls, modular shells, knit drapes',
    img: '/look_ascension.png',
    href: '/collection?category=OUTERWEAR',
    idx: '01'
  },
  {
    title: 'APPAREL',
    subtitle: 'Heavyweight fleece, raw edges, spine sigils',
    img: '/void_hoodie_studio.png',
    href: '/collection?category=APPAREL',
    idx: '02'
  },
  {
    title: 'TROUSERS',
    subtitle: 'Triple-weave canvas, modular cargo systems',
    img: '/look_hardware.png',
    href: '/collection?category=TROUSERS',
    idx: '03'
  }
]

export function CategoryGrid(): React.ReactElement {
  return (
    <section className="relative w-full py-section px-gutter bg-[#020202] border-b border-line/30 overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(197,20,27,0.015),transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-[1480px] mx-auto">
        <div className="flex flex-col mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] text-red uppercase font-bold mb-2">
            [ CLASSIFICATION SYSTEM ]
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold tracking-wider text-fg uppercase">
            Browse Archive
          </h2>
          <div className="w-12 h-[2px] bg-red mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative aspect-[3/4] group overflow-hidden border border-fg/10 bg-[#050505] shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Image */}
              <img
                src={cat.img}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.7] contrast-[1.05]"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-95 duration-500 z-1" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(197,20,27,0.12),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-1" />

              {/* Top Meta info */}
              <div className="absolute top-6 left-6 z-10 font-mono text-xs text-zinc-500 flex items-center gap-2">
                <span>{cat.idx}</span>
                <span className="w-4 h-[1px] bg-line/40 group-hover:bg-red-600 transition-colors" />
                <span className="uppercase tracking-widest text-[9px] group-hover:text-red-500 transition-colors">SYS_CAT</span>
              </div>

              {/* Bottom text & call-to-actions */}
              <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col justify-end h-1/2">
                <h3 className="font-serif text-2xl font-bold tracking-wider text-fg uppercase group-hover:text-red-500 transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="text-[10px] font-mono tracking-wider text-faint uppercase mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {cat.subtitle}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-2 text-faint group-hover:text-white transition-colors duration-300">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-semibold">
                    ENTER ARCHIVE
                  </span>
                  <span className="text-xs transition-transform group-hover:translate-x-1.5 duration-300">
                    →
                  </span>
                </div>
              </div>

              {/* Clickable cover link */}
              <Link href={cat.href} className="absolute inset-0 z-20 cursor-pointer" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
