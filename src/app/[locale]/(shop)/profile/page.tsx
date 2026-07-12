import type { Metadata } from 'next'
import React from 'react'
import { ProfileView } from '@/features/profile/views/ProfileView'

export const metadata: Metadata = {
  title: 'Profile — PURE EVIL',
  description: 'View your initiation ritual history and covenant details.',
}

export default function ProfilePage(): React.ReactElement {
  return (
    <main className="flex-grow w-full relative pt-8 pb-24 mx-auto max-w-[1400px] px-5 md:px-10">
      <ProfileView />
    </main>
  )
}
