import type { Metadata } from 'next'
import React from 'react'
import { CartView } from '@/features/cart/views/CartView'

export const metadata: Metadata = {
  title: 'Sacred Bag — PURE EVIL',
  description: 'View the items in your bag and initiate the checkout ritual.',
}

export default function CartPage(): React.ReactElement {
  return (
    <main className="flex-grow w-full relative">
      <CartView />
    </main>
  )
}
