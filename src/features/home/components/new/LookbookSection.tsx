'use client'

import React, { useState, useMemo } from 'react'
import { Chapter } from '@/components/Chapter'
import { PRODUCTS } from '@/shared/constants/products'

type Shot = {
  size: 't' | 's' | 'w' | 'xt'
  caption: string
  spec: string
  name: string
  idx: string
  img: string
}

const SHOTS: Shot[] = [
  {
    size: 't',
    caption: 'Look 01 — full-figure obsidian',
    spec: 'editorial · 900×1200',
    name: 'Void Set',
    idx: '01 / 09',
    img: '/look_obsidian.png',
  },
  {
    size: 's',
    caption: 'Look 02 — hood detail',
    spec: 'editorial · 1000×1000',
    name: 'Monastic Hood',
    idx: '02 / 09',
    img: '/look_ritual.png',
  },
  {
    size: 'xt',
    caption: 'Look 03 — back sigil',
    spec: 'editorial · 900×1350',
    name: 'Spine Sigil',
    idx: '03 / 09',
    img: '/look_ritual.png',
  },
  {
    size: 'w',
    caption: 'Look 04 — layered fits',
    spec: 'editorial · 1000×1250',
    name: 'Ritual Layers',
    idx: '04 / 09',
    img: '/look_eclipse.png',
  },
  {
    size: 't',
    caption: 'Look 05 — motion blur',
    spec: 'editorial · 900×1200',
    name: 'Aesthetic Violence',
    idx: '05 / 09',
    img: '/look_ascension.png',
  },
  {
    size: 's',
    caption: 'Look 06 — hardware macro',
    spec: 'editorial · 1000×1000',
    name: 'Oxidised Hardware',
    idx: '06 / 09',
    img: '/look_hardware.png',
  },
  {
    size: 'w',
    caption: 'Look 07 — group cult shot',
    spec: 'editorial · 1000×1250',
    name: 'The Congregation',
    idx: '07 / 09',
    img: '/look_obsidian.png',
  },
  {
    size: 'xt',
    caption: 'Look 08 — silhouette',
    spec: 'editorial · 900×1350',
    name: 'Obsidian Silhouette',
    idx: '08 / 09',
    img: '/look_eclipse.png',
  },
  {
    size: 't',
    caption: 'Look 09 — ascension transition',
    spec: 'editorial · 900×1200',
    name: 'Ascension Form',
    idx: '09 / 09',
    img: '/look_ascension.png',
  },
]

interface FlipCardProps {
  shot: Shot
  product: typeof PRODUCTS[0]
  flipped: boolean
  index: number
}

function FlipCard({ shot, product, flipped, index }: FlipCardProps): React.ReactElement {
  // Deterministic Latin Square delay matrix to ensure that no two adjacent cards
  // in the same row rotate at the exact same time.
  // Col 0: items 0,1,2 | Col 1: items 3,4,5 | Col 2: items 6,7,8
  const delay = useMemo(() => {
    const col = Math.floor(index / 3) // 0, 1, 2
    const row = index % 3             // 0, 1, 2

    const matrix = [
      [0.0, 0.6, 1.2], // Row 0
      [0.6, 1.2, 0.0], // Row 1
      [1.2, 0.0, 0.6], // Row 2
    ]
    return matrix[row][col]
  }, [index])

  const transitionStyle = {
    transitionProperty: 'transform',
    transitionDuration: '0.6s', // Snappy 3D flip
    transitionDelay: flipped ? `${delay}s` : `${(1.2 - delay) * 0.6}s`, // clean sequence roll-back
    transformStyle: 'preserve-3d' as const,
  }

  return (
    <div className="relative break-inside-avoid mb-4 [perspective:1000px] group cursor-pointer">
      <div
        className="relative w-full transition-transform"
        style={{
          ...transitionStyle,
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side: Lookbook Photo */}
        <div
          className="w-full h-full [backface-visibility:hidden] relative z-20"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div className={
            shot.size === 't' ? 'aspect-[3/4]' :
            shot.size === 's' ? 'aspect-[1/1]' :
            shot.size === 'w' ? 'aspect-[4/5]' :
            'aspect-[2/3]'
          }>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.img}
              alt={shot.caption}
              className="w-full h-full object-cover border border-border"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-5 justify-between">
              <b className="font-display text-sm tracking-widest text-bone uppercase">{shot.name}</b>
              <span className="font-mono text-xs tracking-wider text-muted-foreground">{shot.idx}</span>
            </div>
          </div>
        </div>

        {/* Back Side: Product Card */}
        <div
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] z-10"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-full h-full bg-[#070707] border border-border flex flex-col justify-between p-5 relative overflow-hidden group">
            {/* Background Sigil decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,20,27,0.06),transparent_80%)] pointer-events-none" />

            {/* Product image crop */}
            <div className="flex-grow w-full relative overflow-hidden bg-surface mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.img}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-1 z-10 mt-auto">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[9px] text-blood uppercase tracking-widest">{product.category}</span>
                <span className="font-mono text-[9px] text-muted-foreground">{product.code}</span>
              </div>
              <h4 className="font-display text-sm font-bold text-bone uppercase group-hover:text-blood transition-colors truncate">
                {product.name}
              </h4>
              <div className="flex justify-between items-baseline mt-1">
                <span className="font-mono text-xs text-bone">${product.price} USD</span>
                {product.originalPrice > product.price && (
                  <span className="text-[9px] font-mono text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LookbookSection(): React.ReactElement {
  const [flipped, setFlipped] = useState(false)

  return (
    <Chapter
      id="lookbook"
      number="IV"
      title="The Ritual"
      prev={{ id: 'manifesto', number: 'III', title: 'Manifesto' }}
    >
      <div
        className="max-w-5xl mx-auto w-full"
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        {/* Toggle Button for mobile / quick click */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setFlipped(!flipped)}
            className="border border-border hover:border-blood px-4 py-2 text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-bone transition-colors duration-300 flex items-center gap-2 select-none cursor-pointer"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${flipped ? 'bg-blood animate-pulse' : 'bg-muted-foreground/30'}`} />
            {flipped ? 'VIEW IMAGES' : 'REVEAL RELICS'}
          </button>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance] w-full">
          {SHOTS.map((shot, i) => {
            const product = PRODUCTS[i % PRODUCTS.length]
            return (
              <FlipCard
                key={i}
                shot={shot}
                product={product}
                flipped={flipped}
                index={i}
              />
            )
          })}
        </div>
      </div>
    </Chapter>
  )
}
