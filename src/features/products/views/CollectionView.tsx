'use client'

import React, { useState } from 'react'
import { ShoppingBag, Search } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { PRODUCTS, Product } from '@/shared/constants/products'

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

  const handleAddToBag = (product: Product) => {
    const size = selectedSizes[product.id] || 'M'
    toast.success(`ADDED TO BAG: ${product.name} (SIZE ${size})`, {
      style: {
        background: '#0c0c0c',
        border: '1px solid var(--red)',
        color: '#f5f3f1',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.15em',
        borderRadius: '0px',
      },
      duration: 3000,
    })
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

  return (
    <main className="flex-grow pt-24 md:pt-32 lg:pt-36 pb-24 w-full relative">
      {/* Background Decorative Glow and Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(197,20,27,0.05),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      <div className="relative z-1 max-w-[1480px] mx-auto w-full px-6 md:px-12 lg:px-16 xl:px-24">
        {/* Header Section */}
        <div className="mb-20 border-b border-fg/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 text-faint font-mono text-[10px] uppercase tracking-[0.3em] mb-4">
              <Link href="/" className="hover:text-red transition-colors duration-300">HOME</Link>
              <span className="text-faint/30">//</span>
              <span className="text-muted">COLLECTION</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold tracking-[0.15em] text-fg uppercase">
              THE <span className="text-red bg-clip-text text-transparent bg-gradient-to-r from-red to-red-500 [text-shadow:0_0_20px_rgba(197,20,27,0.3)]">COLLECTION</span>
            </h1>
            <p className="text-faint text-xs font-mono tracking-widest mt-3 uppercase opacity-75">
              DROP 07 // OBSIDIAN ELEMENTS & RITUAL GARMENTS
            </p>
          </div>

          <div className="text-right text-[10px] font-mono tracking-[0.18em] text-faint max-w-xs leading-relaxed uppercase opacity-80">
            CUSTOM HEAVYWEIGHT FABRICS DECORATED WITH SYMBOLIC DETAILS. LIMITED RELEASE.
          </div>
        </div>

        {/* Sidebar + Product Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-8 md:pt-12">
          {/* Main Grid Area (Left side on desktop) */}
          <div className="flex-grow lg:w-[72%]">
            {/* Search Bar at the top of the main area */}
            <div className="relative mb-12 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
                <Search size={14} className="text-faint group-focus-within:text-red transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="SEARCH ARCHIVE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#060606] border border-fg/10 text-fg placeholder:text-faint/40 font-mono text-xs tracking-widest py-4 pl-12 pr-28 focus:outline-none focus:border-red/30 focus:shadow-[0_0_25px_rgba(197,20,27,0.06)] transition-all duration-300 rounded-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none select-none">
                <span className="text-[9px] font-mono tracking-widest text-faint/50 bg-[#0c0c0c] border border-fg/5 px-2 py-0.5 rounded-none uppercase">
                  PE-ARCHIVE-L07
                </span>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-20">
                {filteredProducts.map((product, index) => {
                  const selectedSize = selectedSizes[product.id] || 'M'
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                      className="group flex flex-col justify-between"
                    >
                      {/* Product Card Graphic */}
                      <Link href={`/collection/${product.id}`} className="block relative aspect-[3/4] w-full border border-fg/10 overflow-hidden bg-[#0a0a0a] shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:border-red/25 group-hover:shadow-[0_0_30px_rgba(197,20,27,0.12)] mb-0 cursor-pointer">
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
                        <div className="absolute top-4 left-4 z-10 text-[9px] font-mono tracking-widest text-fg bg-black/80 backdrop-blur-md border border-fg/10 px-2.5 py-1 uppercase font-semibold">
                          {product.category}
                        </div>

                        {/* Spec Text on bottom */}
                        <div className="absolute bottom-4 left-4 right-4 z-10 text-[9px] font-mono tracking-wider text-faint flex justify-between items-center uppercase">
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
                            <h3 className="text-lg font-serif font-semibold tracking-wider text-fg uppercase group-hover:text-red transition-colors duration-300">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2">
                            <span className="text-xs line-through text-faint/40 font-mono">
                              ${product.originalPrice}
                            </span>
                            <span className="text-sm font-mono text-red font-bold">
                              ${product.price}
                            </span>
                          </div>
                        </div>

                        <p className="text-[12px] text-muted tracking-wide leading-relaxed font-light line-clamp-2 min-h-[36px]">
                          {product.desc}
                        </p>

                        {/* Size Selector */}
                        <div className="flex gap-2 items-center mt-4">
                          <span className="text-[9px] font-mono text-faint uppercase tracking-[0.15em] mr-2">SIZE:</span>
                          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeSelect(product.id, size)}
                              className={`w-8 h-8 text-[10px] font-mono border transition-all duration-300 flex items-center justify-center cursor-pointer relative overflow-hidden ${selectedSize === size
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
                          onClick={() => handleAddToBag(product)}
                          className="w-full mt-6 py-3 bg-transparent text-fg border border-fg/20 hover:border-red/60 hover:bg-red/5 hover:text-white hover:shadow-[0_0_20px_rgba(197,20,27,0.15)] font-mono text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer relative overflow-hidden"
                        >
                          <ShoppingBag size={11} className="transition-transform duration-300 group-hover:scale-110 group-hover:text-red" />
                          <span>ADD TO BAG</span>
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-24 border border-dashed border-fg/10 bg-[#040404] rounded-none">
                <span className="font-mono text-xs text-faint tracking-widest uppercase opacity-60">NO GARMENTS FOUND</span>
              </div>
            )}
          </div>

          {/* Sidebar Area (Right side on desktop, bottom on mobile) */}
          <div className="lg:w-[28%] lg:shrink-0 flex flex-col gap-8 border-t lg:border-t-0 lg:border-l border-fg/10 pt-16 lg:pt-0 lg:pl-10 mt-16 lg:mt-0 relative">

            {/* Filter Section: Categories */}
            <div className="flex flex-col gap-4 bg-[#050505]/40 border border-fg/5 p-6 rounded-none relative">
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-fg uppercase font-bold border-b border-fg/5 pb-3">
                CATEGORIES
              </h4>
              <div className="flex flex-col gap-3">
                {['ALL', 'APPAREL', 'OUTERWEAR', 'TROUSERS'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-mono text-xs tracking-wider text-left transition-all duration-300 cursor-pointer flex items-center gap-3 w-full py-1 group ${selectedCategory === cat ? 'text-red font-semibold' : 'text-faint hover:text-fg'
                      }`}
                  >
                    <span className={`w-3.5 h-3.5 border flex items-center justify-center text-[7px] transition-all duration-300 ${selectedCategory === cat ? 'border-red/60 text-red bg-red/5 shadow-[0_0_8px_rgba(197,20,27,0.3)]' : 'border-fg/15 group-hover:border-fg/30'
                      }`}>
                      {selectedCategory === cat ? '✦' : ''}
                    </span>
                    <span className="uppercase">{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Section: Price Range */}
            <div className="flex flex-col gap-4 bg-[#050505]/40 border border-fg/5 p-6 rounded-none relative">
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-fg uppercase font-bold border-b border-fg/5 pb-3">
                PRICE RANGE
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'ALL PRICES', min: 0, max: 1000 },
                  { label: 'UNDER $200', min: 0, max: 200 },
                  { label: '$200 - $300', min: 200, max: 300 },
                  { label: 'OVER $300', min: 300, max: 1000 },
                ].map((priceOpt) => {
                  const isActive = maxPrice === priceOpt.max && minPrice === priceOpt.min
                  return (
                    <button
                      key={priceOpt.label}
                      onClick={() => {
                        setMinPrice(priceOpt.min)
                        setMaxPrice(priceOpt.max)
                      }}
                      className={`font-mono text-xs tracking-wider text-left transition-all duration-300 cursor-pointer flex items-center gap-3 w-full py-1 group ${isActive ? 'text-red font-semibold' : 'text-faint hover:text-fg'
                        }`}
                    >
                      <span className={`w-3.5 h-3.5 border flex items-center justify-center text-[7px] transition-all duration-300 ${isActive ? 'border-red/60 text-red bg-red/5 shadow-[0_0_8px_rgba(197,20,27,0.3)]' : 'border-fg/15 group-hover:border-fg/30'
                        }`}>
                        {isActive ? '✦' : ''}
                      </span>
                      <span>{priceOpt.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Filter Section: Sort By */}
            <div className="flex flex-col gap-4 bg-[#050505]/40 border border-fg/5 p-6 rounded-none relative">
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-fg uppercase font-bold border-b border-fg/5 pb-3">
                SORT BY
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'DEFAULT', value: 'default' },
                  { label: 'PRICE: LOW TO HIGH', value: 'price-asc' },
                  { label: 'PRICE: HIGH TO LOW', value: 'price-desc' },
                ].map((sortOpt) => {
                  const isActive = sortBy === sortOpt.value
                  return (
                    <button
                      key={sortOpt.value}
                      onClick={() => setSortBy(sortOpt.value)}
                      className={`font-mono text-xs tracking-wider text-left transition-all duration-300 cursor-pointer flex items-center gap-3 w-full py-1 group ${isActive ? 'text-red font-semibold' : 'text-faint hover:text-fg'
                        }`}
                    >
                      <span className={`w-3.5 h-3.5 border flex items-center justify-center text-[7px] transition-all duration-300 ${isActive ? 'border-red/60 text-red bg-red/5 shadow-[0_0_8px_rgba(197,20,27,0.3)]' : 'border-fg/15 group-hover:border-fg/30'
                        }`}>
                        {isActive ? '✦' : ''}
                      </span>
                      <span>{sortOpt.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory !== 'ALL' || minPrice !== 0 || maxPrice !== 1000 || sortBy !== 'default') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('ALL')
                  setMinPrice(0)
                  setMaxPrice(1000)
                  setSortBy('default')
                }}
                className="w-full py-3 border border-red/20 hover:border-red hover:bg-red/5 font-mono text-[10px] tracking-[0.2em] text-red uppercase transition-all duration-300 rounded-none cursor-pointer"
              >
                RESET FILTERS
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

