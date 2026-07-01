'use client'

import React, { useState } from 'react'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { MEDIA_QUERIES } from '@/shared/constants/breakpoints'
import { ProductDetails } from './ProductDetails'
import { ProductStage } from './ProductStage'
import { PRODUCTS, SIZES, getOriginalPrice, getCategoryLabel, Product } from './product.constants'
import { toast } from 'sonner'
import { ShoppingBag } from 'lucide-react'

export function ProductCarousel(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile)

  const handleAcquire = (product: Product): void => {
    toast.success(`${product.name} [Size ${selectedSize}] acquired successfully.`, {
      style: {
        background: 'var(--panel)',
        border: '1px solid rgba(197, 20, 27, 0.4)',
        color: 'var(--fg)',
        fontFamily: 'var(--font-mono)',
      },
      icon: <ShoppingBag className="text-red-500 w-4 h-4" />,
    })
  }

  const activeProduct = PRODUCTS[activeIndex]

  return (
    <section
      className="relative w-full lg:h-screen lg:min-h-[850px] px-[2vw] pb-12 lg:pb-8 bg-bg overflow-hidden border-b border-line/50 flex flex-col justify-start"
      id="product-carousel"
      style={{ paddingTop: isMobile ? '1vh' : '2vh' }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(197,20,27,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0"
      />

      <div className="flex justify-between items-end pb-1.5 w-full border-b border-line/50 relative z-10">
        <div>
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-red-600 block" />
            Acquisition / Drop 001
          </span>
        </div>
        <div>
          <a
            href="#collections"
            className="font-mono text-[10px] text-zinc-500 hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-colors duration-200"
          >
            <span>View All</span>
            <span className="text-xs">→</span>
          </a>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col justify-start gap-4 lg:gap-6 mt-6 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 min-w-0 flex flex-col items-center justify-center w-full order-last lg:order-first">
            <ProductStage
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              products={PRODUCTS}
              handleAcquire={handleAcquire}
            />
          </div>

          <div id="product-details-box" className="lg:col-span-5 min-w-0 flex flex-col justify-center lg:sticky lg:top-20 order-first lg:order-last min-h-[500px]">
            <ProductDetails
              activeProduct={activeProduct}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              handleAcquire={handleAcquire}
              sizes={SIZES}
              getOriginalPrice={getOriginalPrice}
              getCategoryLabel={getCategoryLabel}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
