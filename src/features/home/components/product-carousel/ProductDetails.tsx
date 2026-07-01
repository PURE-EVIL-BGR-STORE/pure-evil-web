'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { Product } from './product.constants'
import { Button } from '@/components/ui/button/button'

export interface ProductDetailsProps {
  activeProduct: Product
  selectedSize: string
  setSelectedSize: (size: string) => void
  handleAcquire: (product: Product) => void
  sizes: string[]
  getOriginalPrice: (id: string) => number
  getCategoryLabel: (id: string) => string
}

export const ProductDetails = ({
  activeProduct,
  selectedSize,
  setSelectedSize,
  handleAcquire,
  sizes,
  getOriginalPrice,
  getCategoryLabel,
}: ProductDetailsProps): React.ReactElement => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeProduct.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col gap-6"
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          <span className="w-6 h-[1px] bg-red-600 block" />
          <span>{getCategoryLabel(activeProduct.id)}</span>
        </div>

        {/* Main Product Name */}
        <h2 className="font-serif font-extrabold uppercase tracking-[0.05em] text-zinc-100 leading-tight mt-2 text-[clamp(32px,4.2vw,56px)]">
          {activeProduct.name}
        </h2>

        {/* Price Row */}
        <div className="flex items-baseline gap-3 mt-1">
          <span className="line-through text-zinc-600 font-mono text-base">
            ${getOriginalPrice(activeProduct.id)}
          </span>
          <span className="text-zinc-100 font-mono text-lg font-semibold">
            ${activeProduct.price} USD
          </span>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-[48ch] mt-2">
          {activeProduct.desc}
        </p>

        {/* Size Selector */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-2">
            {sizes.map((sz) => {
              const isUnavailable = sz === 'XL'
              return (
                <button
                  key={sz}
                  disabled={isUnavailable}
                  onClick={() => setSelectedSize(sz)}
                  className={`w-12 h-12 border text-xs font-mono flex items-center justify-center transition-all duration-200 relative overflow-hidden cursor-pointer ${selectedSize === sz
                      ? 'border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                      : isUnavailable
                        ? 'border-line/10 text-faint/30 cursor-not-allowed'
                        : 'border-line/30 text-muted hover:border-line hover:text-white'
                    }`}
                >
                  <span>{sz}</span>
                  {isUnavailable && (
                    <div className="absolute inset-0 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),var(--ghost)_50%,transparent_calc(50%+0.5px))] w-full h-full pointer-events-none" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Buy Action Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6 pt-6 border-t border-line/30">
          <Button
            variant="ritual"
            size="ritual"
            onClick={() => handleAcquire(activeProduct)}
            className="w-full sm:w-auto font-semibold flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag — ${activeProduct.price}</span>
          </Button>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
            Free Ritual Shipping Over $200
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
