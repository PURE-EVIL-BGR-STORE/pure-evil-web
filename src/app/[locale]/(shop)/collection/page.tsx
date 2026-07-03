import type { Metadata } from 'next'
import React from 'react'
import { CollectionView } from '@/features/products'

export const metadata: Metadata = {
  title: 'Collection — PURE EVIL',
  description: 'Explore our obsidian elements and ritual garments.',
}

export default function CollectionPage(): React.ReactElement {
  return <CollectionView />
}
