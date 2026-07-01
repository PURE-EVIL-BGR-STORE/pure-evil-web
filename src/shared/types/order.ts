export interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  size: string
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface ShippingAddress {
  id: string
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
}

export interface Order {
  id: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  shippingAddress: ShippingAddress
  createdAt: string
}

export interface CreateOrderPayload {
  items: Array<{
    productId: string
    quantity: number
    size: string
  }>
  shippingAddress: Omit<ShippingAddress, 'id'>
}

export interface CheckoutSessionResponse {
  sessionId: string
  checkoutUrl: string
}
