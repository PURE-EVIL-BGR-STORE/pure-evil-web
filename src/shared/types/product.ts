export interface Product {
  id: string
  name: string
  price: number
  spec: string
  desc: string
  img: string
  code: string
  category: string
  cropClass?: string
}

export interface ProductFilters {
  searchQuery?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'default' | 'price-asc' | 'price-desc'
}

export interface Category {
  id: string
  name: string
  code: string
}
