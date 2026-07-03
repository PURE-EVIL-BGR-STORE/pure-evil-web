'use client'

import React from 'react'
import { ChevronRight } from 'lucide-react'
import { RevealController } from '@/features/home/components/RevealController'
import { ProductVisual } from '@/features/home/components/product-details/ProductVisual'
import { ProductMeta } from '@/features/home/components/product-details/ProductMeta'
import { PRODUCTS } from '@/shared/constants/products'
import { Link } from '@/i18n/routing'

export interface ProductDetailViewProps {
  id: string
}

export function ProductDetailView({ id }: ProductDetailViewProps): React.ReactElement {
  const product = PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return (
      <main className="flex-grow pt-12 pb-20 px-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-serif tracking-widest text-red mb-4">PRODUCT NOT FOUND</h1>
        <p className="text-faint font-mono text-xs tracking-wider mb-8">THE ARTIFACT YOU ARE SEEKING DOES NOT EXIST.</p>
        <Link href="/collection" className="btn btn--primary">
          <span>RETURN TO COLLECTION</span>
        </Link>
      </main>
    )
  }

  return (
    <>
      <RevealController />

      <main className="flex-grow shop-page w-full max-w-[1480px] mx-auto relative">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-faint font-mono text-xs uppercase tracking-[0.2em] mb-12">
          <Link href="/" className="hover:text-fg transition-colors">HOME</Link>
          <ChevronRight size={10} />
          <Link href="/collection" className="hover:text-fg transition-colors">COLLECTION</Link>
          <ChevronRight size={10} />
          <span className="text-muted">{product.name}</span>
        </div>

        {/* Reusing Product details components */}
        <div className="drop__grid mt-8">
          <ProductVisual img={product.img} alt={product.name} />
          <ProductMeta product={product} />
        </div>
      </main>
    </>
  )
}
