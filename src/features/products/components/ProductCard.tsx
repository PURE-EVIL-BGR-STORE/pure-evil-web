'use client'

import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Product } from '@/shared/constants/products'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('Home')
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
        className="block relative aspect-[3/4] w-full border border-border overflow-hidden bg-surface shadow-md dark:shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:border-blood/30 group-hover:shadow-[0_0_30px_var(--red-glow)] group-hover:outline group-hover:outline-double group-hover:outline-[3px] group-hover:outline-blood/20 group-hover:outline-offset-[-4px] mb-0 cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--red-glow),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-1" />

        {/* Liquid glass light reflect overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-2 pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10 text-xs font-mono tracking-widest text-foreground bg-background/80 backdrop-blur-md border border-border px-2.5 py-1 uppercase font-semibold">
          {t(`${product.category.toLowerCase()}Title`, { defaultValue: product.category })}
        </div>

        {/* Spec Text on bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-xs font-mono tracking-wider text-muted-foreground flex justify-between items-center uppercase">
          <span>{t(`products.${product.id}.spec`, { defaultValue: product.spec })}</span>
          <span className="flex items-center gap-1.5 font-semibold text-blood">
            <span className="w-1.5 h-1.5 rounded-full bg-blood animate-pulse shadow-[0_0_8px_var(--red-glow)]" />
            {t('limited')}
          </span>
        </div>
      </Link>

      {/* Product Metadata & Controls */}
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex justify-between items-baseline">
          <Link href={`/collection/${product.id}`} className="hover:text-blood transition-colors duration-300 cursor-pointer">
            <h3 className="text-base md:text-lg font-display font-black tracking-wider text-bone uppercase group-hover:text-blood transition-colors duration-300">
              {t(`products.${product.id}.name`, { defaultValue: product.name })}
            </h3>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs line-through text-muted-foreground/60 font-mono">
              ${product.originalPrice}
            </span>
            <span className="text-sm font-mono text-blood font-bold">
              ${product.price}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground tracking-wide leading-relaxed font-light line-clamp-2 min-h-[36px]">
          {t(`products.${product.id}.desc`, { defaultValue: product.desc })}
        </p>

        {/* Size Selector */}
        <div className="flex gap-2 items-center mt-4">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-[0.15em] mr-2">SIZE:</span>
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              onClick={() => onSizeSelect(product.id, size)}
              className={`w-8 h-8 text-xs font-mono border transition-all duration-300 flex items-center justify-center cursor-pointer relative overflow-hidden ${selectedSize === size
                ? 'bg-blood border-blood text-white shadow-[0_0_12px_var(--red-glow)] font-bold'
                : 'bg-background text-muted-foreground border-border hover:border-blood/40 hover:text-foreground'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Bag CTA */}
        <button
          onClick={() => onAddToBag(product)}
          className="w-full mt-6 py-3 bg-transparent text-foreground border border-border hover:border-blood/60 hover:bg-blood/5 hover:text-foreground hover:shadow-[0_0_20px_var(--red-glow)] hover:outline hover:outline-double hover:outline-[3px] hover:outline-blood/35 hover:outline-offset-[-4px] font-mono text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer relative overflow-hidden"
        >
          <ShoppingBag size={11} className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blood" />
          <span>{t('addToBag')}</span>
        </button>
      </div>
    </motion.div>
  )
}
