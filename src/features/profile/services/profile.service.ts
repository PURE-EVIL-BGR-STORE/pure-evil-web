import { apiClient } from '@/lib/api-client'
import type { UserProfile, UpdateProfilePayload } from '@/shared/types/profile'
import type { ShippingAddress } from '@/shared/types/order'

export const profileService = {
  getProfile: () =>
    apiClient.get<UserProfile>('/api/profile'),

  updateProfile: (payload: UpdateProfilePayload) =>
    apiClient.patch<UserProfile>('/api/profile', payload),

  addAddress: (address: Omit<ShippingAddress, 'id'>) =>
    apiClient.post<UserProfile>('/api/profile/addresses', address),

  deleteAddress: (addressId: string) =>
    apiClient.delete<UserProfile>(`/api/profile/addresses/${addressId}`),
}
