import type { Metadata } from 'next'
import React from 'react'
import { ProductDetailView } from '@/features/products'
import { PRODUCTS } from '@/shared/constants/products'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = PRODUCTS.find((p) => p.id === id)
  return {
    title: product ? `${product.name} — PURE EVIL` : 'Product Not Found — PURE EVIL',
    description: product?.desc ?? 'Artifact detail view.',
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<React.ReactElement> {
  const { id } = await params
  return <ProductDetailView id={id} />
}
