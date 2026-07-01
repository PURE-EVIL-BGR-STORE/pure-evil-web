import { apiClient } from '@/lib/api-client'
import type { Order, CreateOrderPayload, CheckoutSessionResponse } from '@/shared/types/order'

export const ordersService = {
  createCheckoutSession: (payload: CreateOrderPayload) =>
    apiClient.post<CheckoutSessionResponse>('/api/checkout/session', payload),

  getOrders: () =>
    apiClient.get<Order[]>('/api/orders'),

  getOrderById: (id: string) =>
    apiClient.get<Order>(`/api/orders/${id}`),
}
