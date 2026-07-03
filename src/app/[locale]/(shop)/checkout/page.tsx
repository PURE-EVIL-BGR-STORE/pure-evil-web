import type { Metadata } from 'next'
import React from 'react'
import { CheckoutView } from '@/features/cart/views/CheckoutView'

export const metadata: Metadata = {
  title: 'Initiation — PURE EVIL',
  description: 'Initiate your order and complete the transaction ritual.',
}

export default function CheckoutPage(): React.ReactElement {
  return (
    <main className="shop-page flex-grow">
      <CheckoutView />
    </main>
  )
}
