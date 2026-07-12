'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { ShoppingBag } from 'lucide-react'
import { PRODUCTS, Product } from '@/shared/constants/products'
import { ProductCard } from '@/features/products/components/ProductCard'
import { useCart } from '@/features/cart/context/CartContext'
import { useTranslations } from 'next-intl'
import { Chapter } from '@/components/Chapter'

export function BestSellersGrid(): React.ReactElement {
  const { addToCart } = useCart()
  const t = useTranslations('Home')
  
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
    addToCart(product, 1, size)
    toast.success(`ACQUIRED: ${t(`products.${product.id}.name`, { defaultValue: product.name })} [SIZE ${size}]`, {
      className: 'gothic-toast',
      icon: <ShoppingBag className="text-blood w-4 h-4" />,
      duration: 3000,
    })
  }

  return (
    <Chapter
      id="system-components"
      number="III"
      title={t('bestSellersTitle')}
      prev={{ id: 'classification', number: 'II', title: t('categoryTitle') }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
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
    </Chapter>
  )
}

