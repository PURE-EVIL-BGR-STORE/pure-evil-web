import type { Metadata } from 'next'
import React from 'react'
import { ProfileView } from '@/features/profile/views/ProfileView'

export const metadata: Metadata = {
  title: 'Profile — PURE EVIL',
  description: 'View your initiation ritual history and covenant details.',
}

export default function ProfilePage(): React.ReactElement {
  return (
    <main className="shop-page flex-grow">
      <ProfileView />
    </main>
  )
}
