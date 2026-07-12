'use client'

import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Product } from '@/shared/constants/products'

export interface ProductCardProps {
  product: Product
  selectedSize: string
  onSizeSelect: (productId: string, size: string) => void
  onAddToBag: (product: Product) => void
}

export function ProductCard({
  product,
  selectedSize,
  onSizeSelect,
  onAddToBag
}: ProductCardProps): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col justify-between"
    >
      {/* Product Image Link */}
      <Link
        href={`/collection/${product.id}`}
        className="block relative aspect-[3/4] w-full border border-fg/10 overflow-hidden bg-[#0a0a0a] shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:border-red/30 group-hover:shadow-[0_0_30px_rgba(197,20,27,0.12)] group-hover:outline group-hover:outline-double group-hover:outline-[3px] group-hover:outline-red/20 group-hover:outline-offset-[-4px] mb-0 cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,20,27,0.04),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-1" />

        {/* Liquid glass light reflect overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-2 pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10 text-xs font-mono tracking-widest text-fg bg-black/80 backdrop-blur-md border border-fg/10 px-2.5 py-1 uppercase font-semibold">
          {product.category}
        </div>

        {/* Spec Text on bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-xs font-mono tracking-wider text-faint flex justify-between items-center uppercase">
          <span>{product.spec}</span>
          <span className="flex items-center gap-1.5 font-semibold text-red">
            <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse shadow-[0_0_8px_rgba(197,20,27,0.8)]" />
            LIMITED
          </span>
        </div>
      </Link>

      {/* Product Metadata & Controls */}
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex justify-between items-baseline">
          <Link href={`/collection/${product.id}`} className="hover:text-red transition-colors duration-300 cursor-pointer">
            <h3 className="text-lg font-serif font-medium tracking-[0.16em] text-fg uppercase group-hover:text-red transition-colors duration-300">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs line-through text-faint/60 font-mono">
              ${product.originalPrice}
            </span>
            <span className="text-sm font-mono text-red font-bold">
              ${product.price}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted tracking-wide leading-relaxed font-light line-clamp-2 min-h-[36px]">
          {product.desc}
        </p>

        {/* Size Selector */}
        <div className="flex gap-2 items-center mt-4">
          <span className="text-xs font-mono text-faint uppercase tracking-[0.15em] mr-2">SIZE:</span>
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              onClick={() => onSizeSelect(product.id, size)}
              className={`w-8 h-8 text-xs font-mono border transition-all duration-300 flex items-center justify-center cursor-pointer relative overflow-hidden ${selectedSize === size
                ? 'bg-red border-red text-white shadow-[0_0_12px_rgba(197,20,27,0.4)] font-bold'
                : 'bg-[#050505] text-faint border-fg/10 hover:border-red/40 hover:text-fg'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Bag CTA */}
        <button
          onClick={() => onAddToBag(product)}
          className="w-full mt-6 py-3 bg-transparent text-fg border border-fg/20 hover:border-red/60 hover:bg-red/5 hover:text-white hover:shadow-[0_0_20px_rgba(197,20,27,0.15)] hover:outline hover:outline-double hover:outline-[3px] hover:outline-red/35 hover:outline-offset-[-4px] font-mono text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer relative overflow-hidden"
        >
          <ShoppingBag size={11} className="transition-transform duration-300 group-hover:scale-110 group-hover:text-red" />
          <span>ADD TO BAG</span>
        </button>
      </div>
    </motion.div>
  )
}
