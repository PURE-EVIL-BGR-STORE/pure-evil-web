'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { ShoppingBag } from 'lucide-react'
import { PRODUCTS, Product } from '@/shared/constants/products'
import { ProductCard } from '@/features/products/components/ProductCard'

export function BestSellersGrid(): React.ReactElement {
  // Select 4 representative items for the home page showcase (excluding void-hoodie if we want diversity, or including the best ones)
  const displayProducts = PRODUCTS.slice(1, 5) // ascension-parka, ritual-cloak, eclipse-bomber, obsidian-cargo

  // State to manage sizing for each individual card
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    displayProducts.reduce((acc, p) => ({ ...acc, [p.id]: 'M' }), {})
  )

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }))
  }

  const handleAddToBag = (product: Product) => {
    const size = selectedSizes[product.id] || 'M'
    toast.success(`ACQUIRED: ${product.name} [SIZE ${size}]`, {
      className: 'gothic-toast',
      icon: <ShoppingBag className="text-red-500 w-4 h-4" />,
      duration: 3000,
    })
  }

  return (
    <section className="relative w-full py-section px-gutter bg-[#020202] border-b border-line/30 overflow-hidden">
      <div className="w-full max-w-[1480px] mx-auto">
        <div className="flex flex-col mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] text-red uppercase font-bold mb-2">
            [ RUNNING STOCK ]
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold tracking-wider text-fg uppercase">
            System Components
          </h2>
          <div className="w-12 h-[2px] bg-red mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 w-full">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedSize={selectedSizes[product.id] || 'M'}
              onSizeSelect={handleSizeSelect}
              onAddToBag={handleAddToBag}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
