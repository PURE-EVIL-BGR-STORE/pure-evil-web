'use client'

import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { Product } from '@/shared/constants/products'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button/button'

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
      className="group flex flex-col"
    >
      {/* Image Container with Hover Overlay */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface border border-border transition-all duration-500 group-hover:border-blood/30">
        {/* Product Image (clickable) */}
        <Link
          href={`/collection/${product.id}`}
          className="block absolute inset-0 z-[1]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.img}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        </Link>

        {/* Category Tag */}
        <div className="absolute top-3 left-3 z-10 text-[10px] font-mono tracking-widest text-foreground bg-background/70 backdrop-blur-sm border border-border/50 px-2 py-0.5 uppercase">
          {t(`${product.category.toLowerCase()}Title`, { defaultValue: product.category })}
        </div>

        {/* Hover Overlay — slides up from bottom */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <div className="bg-background/90 backdrop-blur-md border-t border-border/30 p-4 space-y-3">
            {/* Size Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.15em] mr-1">SZ</span>
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSizeSelect(product.id, size)
                  }}
                  className={`w-7 h-7 text-[10px] font-mono border transition-all duration-200 flex items-center justify-center cursor-pointer ${selectedSize === size
                    ? 'bg-blood border-blood text-white font-bold'
                    : 'bg-transparent text-muted-foreground border-border/50 hover:border-blood/40 hover:text-foreground'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Add to Bag */}
            <Button
              variant="ritual"
              size="sm"
              className="w-full rounded-none py-2.5"
              onClick={(e) => {
                e.stopPropagation()
                onAddToBag(product)
              }}
            >
              <ShoppingBag size={11} />
              <span>{t('addToBag')}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info — always visible beneath image */}
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-baseline gap-2">
          <Link href={`/collection/${product.id}`} className="hover:text-blood transition-colors duration-300 min-w-0">
            <h3 className="text-sm font-display font-black tracking-wider text-bone uppercase truncate group-hover:text-blood transition-colors duration-300">
              {t(`products.${product.id}.name`, { defaultValue: product.name })}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[10px] line-through text-muted-foreground/50 font-mono">
              ${product.originalPrice}
            </span>
            <span className="text-xs font-mono text-blood font-bold">
              ${product.price}
            </span>
          </div>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground/60 tracking-wider uppercase">
          {t(`products.${product.id}.spec`, { defaultValue: product.spec })}
        </p>
      </div>
    </motion.div>
  )
}
