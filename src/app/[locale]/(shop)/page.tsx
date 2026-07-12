import React from 'react'
import { HomeView } from '@/features/home'
import { NewHomeView } from '@/features/home/views/NewHomeView'

const USE_NEW_STOREFRONT = true

export default function Home() {
  if (USE_NEW_STOREFRONT) {
    return <NewHomeView />
  }
  return <HomeView />
}
