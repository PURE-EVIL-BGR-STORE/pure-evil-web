import { apiClient } from '@/lib/api-client'
import type { Product, ProductFilters, Category } from '@/shared/types/product'

export const productsService = {
  getProducts: (filters?: ProductFilters) => {
    const params = new URLSearchParams()
    if (filters) {
      if (filters.searchQuery) params.append('q', filters.searchQuery)
      if (filters.category) params.append('category', filters.category)
      if (filters.minPrice !== undefined) params.append('minPrice', String(filters.minPrice))
      if (filters.maxPrice !== undefined) params.append('maxPrice', String(filters.maxPrice))
      if (filters.sortBy) params.append('sortBy', filters.sortBy)
    }
    const queryStr = params.toString()
    const path = `/api/products${queryStr ? `?${queryStr}` : ''}`
    return apiClient.get<Product[]>(path)
  },

  getProductById: (id: string) =>
    apiClient.get<Product>(`/api/products/${id}`),

  getCategories: () =>
    apiClient.get<Category[]>('/api/categories'),
}
