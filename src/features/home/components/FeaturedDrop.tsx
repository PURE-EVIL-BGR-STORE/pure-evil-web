'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS } from '@/shared/constants/products'
import { ProductVisual } from './product-details/ProductVisual'
import { ProductMeta } from './product-details/ProductMeta'

export function FeaturedDrop(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProduct = PRODUCTS[activeIndex]

  const nextProduct = () => {
    setActiveIndex((prev) => (prev + 1) % PRODUCTS.length)
  }

  const prevProduct = () => {
    setActiveIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length)
  }

  return (
    <section className="section drop" id="drop" data-screen-label="featured-drop">
      <div className="shell">
        <div className="section__head flex justify-between items-end w-full border-b border-line/10 pb-4">
          <div>
            <div data-reveal>
              <span className="eyebrow">Featured Drop / 001</span>
            </div>
            <span className="section__index" data-reveal data-reveal-delay="1">
              Limited — 200 Units
            </span>
          </div>

          {/* Minimalist Gothic Switcher Controls */}
          <div className="flex items-center gap-4 z-10">
            <button
              onClick={prevProduct}
              className="w-10 h-10 border border-line/30 hover:border-red-600 flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-300 font-mono cursor-pointer"
              aria-label="Previous product"
            >
              ←
            </button>
            <span className="font-mono text-xs text-zinc-500 tracking-widest min-w-[45px] text-center">
              {String(activeIndex + 1).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')}
            </span>
            <button
              onClick={nextProduct}
              className="w-10 h-10 border border-line/30 hover:border-red-600 flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-300 font-mono cursor-pointer"
              aria-label="Next product"
            >
              →
            </button>
          </div>
        </div>

        <div className="drop__grid mt-8 relative">
          {/* LEFT COLUMN: VISUAL WITH SLIDING TRANSITION */}
          <div className="overflow-hidden relative flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${activeProduct.id}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full flex justify-center"
              >
                <ProductVisual
                  img={activeProduct.img}
                  alt={activeProduct.name}
                  stamp={activeIndex === 0 ? "New Arrival" : undefined}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: META WITH FADE TRANSITION */}
          <div className="flex flex-col justify-center min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${activeProduct.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <ProductMeta product={activeProduct} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
