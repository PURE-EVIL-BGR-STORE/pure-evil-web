import { apiClient } from '@/lib/api-client'
import type { CartState, SyncCartPayload } from '@/shared/types/cart'

export const cartService = {
  getCart: () =>
    apiClient.get<CartState>('/api/cart'),

  syncCart: (payload: SyncCartPayload) =>
    apiClient.post<CartState>('/api/cart/sync', payload),

  addToCart: (productId: string, quantity: number, size: string) =>
    apiClient.post<CartState>('/api/cart', { productId, quantity, size }),

  updateCartItem: (itemId: string, quantity: number) =>
    apiClient.patch<CartState>(`/api/cart/${itemId}`, { quantity }),

  removeFromCart: (itemId: string) =>
    apiClient.delete<CartState>(`/api/cart/${itemId}`),
}
