'use client'

import React from 'react'

export interface PriceOption {
  label: string
  min: number
  max: number
}

export interface SortOption {
  label: string
  value: string
}

export interface CollectionFiltersProps {
  selectedCategory: string
  onCategorySelect: (category: string) => void
  minPrice: number
  maxPrice: number
  onPriceSelect: (min: number, max: number) => void
  sortBy: string
  onSortBySelect: (sortBy: string) => void
  onReset: () => void
  showReset: boolean
}

export function CollectionFilters({
  selectedCategory,
  onCategorySelect,
  minPrice,
  maxPrice,
  onSortBySelect,
  sortBy,
  onPriceSelect,
  onReset,
  showReset
}: CollectionFiltersProps): React.ReactElement {
  const categories = ['ALL', 'APPAREL', 'OUTERWEAR', 'TROUSERS']
  
  const priceOptions: PriceOption[] = [
    { label: 'ALL PRICES', min: 0, max: 1000 },
    { label: 'UNDER $200', min: 0, max: 200 },
    { label: '$200 - $300', min: 200, max: 300 },
    { label: 'OVER $300', min: 300, max: 1000 }
  ]

  const sortOptions: SortOption[] = [
    { label: 'DEFAULT', value: 'default' },
    { label: 'PRICE: LOW TO HIGH', value: 'price-asc' },
    { label: 'PRICE: HIGH TO LOW', value: 'price-desc' }
  ]

  return (
    <div className="flex flex-col gap-8 relative">
      {/* Filter Section: Categories */}
      <div className="flex flex-col gap-4 bg-[#050505]/40 border border-fg/5 p-6 rounded-none relative">
        <h4 className="font-mono text-xs tracking-[0.25em] text-fg uppercase font-bold border-b border-fg/5 pb-3">
          CATEGORIES
        </h4>
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`font-mono text-xs tracking-wider text-left transition-all duration-300 cursor-pointer flex items-center gap-3 w-full py-1 group ${
                selectedCategory === cat ? 'text-red font-semibold' : 'text-faint hover:text-fg'
              }`}
            >
              <span className={`w-3.5 h-3.5 border flex items-center justify-center text-xs transition-all duration-300 ${
                selectedCategory === cat
                  ? 'border-red/60 text-red bg-red/5 shadow-[0_0_8px_rgba(197,20,27,0.3)]'
                  : 'border-fg/20 group-hover:border-fg/40'
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
        <h4 className="font-mono text-xs tracking-[0.25em] text-fg uppercase font-bold border-b border-fg/5 pb-3">
          PRICE RANGE
        </h4>
        <div className="flex flex-col gap-3">
          {priceOptions.map((priceOpt) => {
            const isActive = maxPrice === priceOpt.max && minPrice === priceOpt.min
            return (
              <button
                key={priceOpt.label}
                onClick={() => onPriceSelect(priceOpt.min, priceOpt.max)}
                className={`font-mono text-xs tracking-wider text-left transition-all duration-300 cursor-pointer flex items-center gap-3 w-full py-1 group ${
                  isActive ? 'text-red font-semibold' : 'text-faint hover:text-fg'
                }`}
              >
                <span className={`w-3.5 h-3.5 border flex items-center justify-center text-xs transition-all duration-300 ${
                  isActive
                    ? 'border-red/60 text-red bg-red/5 shadow-[0_0_8px_rgba(197,20,27,0.3)]'
                    : 'border-fg/20 group-hover:border-fg/40'
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
        <h4 className="font-mono text-xs tracking-[0.25em] text-fg uppercase font-bold border-b border-fg/5 pb-3">
          SORT BY
        </h4>
        <div className="flex flex-col gap-3">
          {sortOptions.map((sortOpt) => {
            const isActive = sortBy === sortOpt.value
            return (
              <button
                key={sortOpt.value}
                onClick={() => onSortBySelect(sortOpt.value)}
                className={`font-mono text-xs tracking-wider text-left transition-all duration-300 cursor-pointer flex items-center gap-3 w-full py-1 group ${
                  isActive ? 'text-red font-semibold' : 'text-faint hover:text-fg'
                }`}
              >
                <span className={`w-3.5 h-3.5 border flex items-center justify-center text-xs transition-all duration-300 ${
                  isActive
                    ? 'border-red/60 text-red bg-red/5 shadow-[0_0_8px_rgba(197,20,27,0.3)]'
                    : 'border-fg/20 group-hover:border-fg/40'
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
      {showReset && (
        <button
          onClick={onReset}
          className="w-full py-3 border border-red/20 hover:border-red hover:bg-red/5 font-mono text-xs tracking-[0.2em] text-red uppercase transition-all duration-300 rounded-none cursor-pointer"
        >
          RESET FILTERS
        </button>
      )}
    </div>
  )
}
