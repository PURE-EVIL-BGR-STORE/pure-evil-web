import type { ShippingAddress } from './order'

export interface UserProfile {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  addresses: ShippingAddress[]
}

export interface UpdateProfilePayload {
  firstName?: string
  lastName?: string
  avatarUrl?: string
}
