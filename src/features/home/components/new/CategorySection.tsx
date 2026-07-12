'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { Chapter } from '@/components/Chapter'

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
    idx: '01',
  },
  {
    title: 'APPAREL',
    subtitle: 'Heavyweight fleece, raw edges, spine sigils',
    img: '/void_hoodie_studio.png',
    href: '/collection?category=APPAREL',
    idx: '02',
  },
  {
    title: 'TROUSERS',
    subtitle: 'Triple-weave canvas, modular cargo systems',
    img: '/look_hardware.png',
    href: '/collection?category=TROUSERS',
    idx: '03',
  },
]

export function CategorySection(): React.ReactElement {
  return (
    <Chapter
      id="classification"
      number="II"
      title="Classification"
      prev={{ id: 'ch-01', number: 'I', title: 'Featured' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full relative z-10">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="relative aspect-[3/4] group overflow-hidden border border-border bg-surface"
          >
            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cat.img}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.7] contrast-[1.05]"
              loading="lazy"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

            {/* Top Meta info */}
            <div className="absolute top-6 left-6 z-20 font-mono text-[10px] text-muted-foreground/60 flex items-center gap-2">
              <span>{cat.idx}</span>
              <span className="w-4 h-[1px] bg-border group-hover:bg-blood transition-colors" />
              <span className="uppercase tracking-widest text-[9px] group-hover:text-blood transition-colors">SYS_CAT</span>
            </div>

            {/* Bottom text & call-to-actions */}
            <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col justify-end">
              <h3 className="font-display text-2xl font-black tracking-wider text-bone uppercase group-hover:text-blood transition-colors duration-300">
                {cat.title}
              </h3>
              <p className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
                {cat.subtitle}
              </p>

              {/* Arrow indicator */}
              <div className="mt-6 flex items-center gap-2 text-muted-foreground group-hover:text-bone transition-colors duration-300">
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-semibold">
                  ENTER ARCHIVE
                </span>
                <span className="text-xs transition-transform group-hover:translate-x-1.5 duration-300">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Chapter>
  )
}
