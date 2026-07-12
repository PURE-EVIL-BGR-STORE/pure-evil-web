'use client'

import React, { useState } from 'react'
import { Link } from '@/i18n/routing'
import { PRODUCTS, Product } from '@/shared/constants/products'
import { ProductCard } from '@/features/products/components/ProductCard'
import { CollectionFilters } from '@/features/products/components/CollectionFilters'
import { SearchInput } from '@/components/SearchInput'
import { SectionContainer } from '@/components/SectionContainer'
import { useCart } from '@/features/cart/context/CartContext'

export function CollectionView(): React.ReactElement {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [sortBy, setSortBy] = useState('default')

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }))
  }

  const { addToCart } = useCart()

  const handleAddToBag = (product: Product) => {
    const size = selectedSizes[product.id] || 'M'
    addToCart(product, 1, size)
  }

  // Filter and Sort Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'ALL' || product.category.toUpperCase() === selectedCategory.toUpperCase()
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice
    return matchesSearch && matchesCategory && matchesPrice
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return 0 // default sorting (preserve products.ts order)
  })

  const hasActiveFilters = searchQuery !== '' ||
    selectedCategory !== 'ALL' ||
    minPrice !== 0 ||
    maxPrice !== 1000 ||
    sortBy !== 'default'

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('ALL')
    setMinPrice(0)
    setMaxPrice(1000)
    setSortBy('default')
  }

  return (
    <main className="flex-grow w-full relative pt-8 pb-24">
      {/* Background Decorative Glow and Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(197,20,27,0.05),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Safe container centered using SectionContainer */}
      <SectionContainer className="relative z-10">
        {/* Header Section */}
        <div className="mb-8 border-b border-fg/10 pb-5 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="flex items-center gap-2 text-faint font-mono text-xs uppercase tracking-[0.3em] mb-6">
              <Link href="/" className="hover:text-red transition-colors duration-300">HOME</Link>
              <span className="text-faint/30">{'//'}</span>
              <span className="text-muted">COLLECTION</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold tracking-[0.15em] text-fg uppercase">
              THE <span className="text-red bg-clip-text text-transparent bg-gradient-to-r from-red to-red-500 [text-shadow:0_0_20px_rgba(197,20,27,0.3)]">COLLECTION</span>
            </h1>
            <p className="text-faint text-xs font-mono tracking-widest mt-5 uppercase opacity-75">
              DROP 07 // OBSIDIAN ELEMENTS & RITUAL GARMENTS
            </p>
          </div>

          <div className="text-right text-xs font-mono tracking-[0.18em] text-faint max-w-xs leading-relaxed uppercase opacity-80">
            CUSTOM HEAVYWEIGHT FABRICS DECORATED WITH SYMBOLIC DETAILS. LIMITED RELEASE.
          </div>
        </div>

        {/* Sidebar + Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 pt-0">
          {/* Main Grid Area (Left 3 columns on desktop) */}
          <div className="lg:col-span-3 order-1 lg:order-none">
            {/* Search Bar */}
            <div className="mb-6">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-10 md:gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    selectedSize={selectedSizes[product.id] || 'M'}
                    onSizeSelect={handleSizeSelect}
                    onAddToBag={handleAddToBag}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 border border-dashed border-fg/10 bg-[#040404] rounded-none">
                <span className="font-mono text-xs text-faint tracking-widest uppercase opacity-60">NO GARMENTS FOUND</span>
              </div>
            )}
          </div>

          {/* Sidebar Area (Right 1 column on desktop) */}
          <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-fg/10 pt-12 lg:pt-0 lg:pl-10 relative">
            <CollectionFilters
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceSelect={(min, max) => {
                setMinPrice(min)
                setMaxPrice(max)
              }}
              sortBy={sortBy}
              onSortBySelect={setSortBy}
              onReset={handleResetFilters}
              showReset={hasActiveFilters}
            />
          </div>
        </div>
      </SectionContainer>
    </main>
  )
}
