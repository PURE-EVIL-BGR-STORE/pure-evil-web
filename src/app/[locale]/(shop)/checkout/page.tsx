import type { Metadata } from 'next'
import React from 'react'
import { CheckoutView } from '@/features/cart/views/CheckoutView'

export const metadata: Metadata = {
  title: 'Initiation — PURE EVIL',
  description: 'Initiate your order and complete the transaction ritual.',
}

export default function CheckoutPage(): React.ReactElement {
  return (
    <main className="flex-grow w-full relative pt-8 pb-24 mx-auto max-w-[1400px] px-5 md:px-10">
      <CheckoutView />
    </main>
  )
}
