import type { Product } from './product'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedSize: string
}

export interface CartState {
  items: CartItem[]
  totalAmount: number
  totalQuantity: number
}

export interface SyncCartPayload {
  items: Array<{
    productId: string
    quantity: number
    selectedSize: string
  }>
}
