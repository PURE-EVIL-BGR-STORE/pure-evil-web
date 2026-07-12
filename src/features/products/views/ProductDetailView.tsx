'use client'

import React, { useState } from 'react'
import { Link } from '@/i18n/routing'
import { PRODUCTS } from '@/shared/constants/products'
import { ProductCardNew } from '@/components/ProductCard.new'
import { useCart } from '@/features/cart/context/CartContext'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion/accordion'

export interface ProductDetailViewProps {
  id: string
}

export function ProductDetailView({ id }: ProductDetailViewProps): React.ReactElement {
  const product = PRODUCTS.find((p) => p.id === id)
  const [size, setSize] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <main className="flex-grow pt-24 pb-20 px-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-display tracking-widest text-blood mb-4">PRODUCT NOT FOUND</h1>
        <p className="text-muted-foreground font-mono text-xs tracking-wider mb-8">THE ARTIFACT YOU ARE SEEKING DOES NOT EXIST.</p>
        <Link href="/collection" className="border border-blood bg-blood/10 text-blood px-6 py-3 text-xs font-mono uppercase tracking-widest hover:bg-blood hover:text-bone transition-colors">
          <span>RETURN TO COLLECTION</span>
        </Link>
      </main>
    )
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3)

  const handleAdd = () => {
    if (!size) return
    addToCart(product, qty, size)
  }

  const defaultSizes = ['XS', 'S', 'M', 'L', 'XL']
  const defaultCare = [
    'Machine wash cold, inside out',
    'Do not tumble dry',
    'Iron reverse only, avoid the print',
    'Wash with like colors — this garment bleeds'
  ]

  return (
    <div className="w-full bg-background pt-6 pb-24">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pb-6 flex items-center gap-2 label">
        <Link href="/" className="hover:text-blood transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collection" className="hover:text-blood transition-colors">Collection</Link>
        <span>/</span>
        <span className="text-blood">{product.name}</span>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid md:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/5] bg-surface overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.img}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="md:sticky md:top-24">
          <p className="label-blood mb-4">{product.category} · {product.code}</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-bone leading-none mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            {product.originalPrice && (
              <span className="font-mono text-lg line-through text-muted-foreground/60">
                ${product.originalPrice}
              </span>
            )}
            <span className="font-mono text-xl text-bone">${product.price} USD</span>
          </div>

          <p className="mt-8 text-muted-foreground leading-relaxed">{product.desc}</p>

          {/* Sizes */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <p className="label">Size</p>
              <a href="#" className="label hover:text-blood transition-colors">Size guide →</a>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {defaultSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`aspect-square border font-mono text-xs transition-colors cursor-pointer ${
                    size === s
                      ? 'border-blood bg-blood text-bone font-bold'
                      : 'border-border text-muted-foreground hover:border-bone hover:text-bone'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div className="mt-8 flex gap-3">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-11 h-14 label hover:text-blood cursor-pointer flex items-center justify-center"
              >
                −
              </button>
              <span className="w-10 text-center font-mono text-sm">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-11 h-14 label hover:text-blood cursor-pointer flex items-center justify-center"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={!size}
              className="flex-1 border border-blood bg-blood text-bone py-4 text-xs font-mono uppercase tracking-[0.3em] hover:bg-blood-deep transition-colors disabled:bg-transparent disabled:text-muted-foreground disabled:border-border disabled:cursor-not-allowed cursor-pointer"
            >
              {size ? 'Add to bag' : 'Choose a size'}
            </button>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="mt-10 border-t border-border">
            <AccordionItem value="fabric" className="border-b border-border">
              <AccordionTrigger className="label hover:no-underline hover:text-blood py-5">Fabric</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{product.spec}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="fit" className="border-b border-border">
              <AccordionTrigger className="label hover:no-underline hover:text-blood py-5">Fit</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">Oversized, boxy silhouette with a dropped shoulder.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="care" className="border-b border-border">
              <AccordionTrigger className="label hover:no-underline hover:text-blood py-5">Care</AccordionTrigger>
              <AccordionContent>
                <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                  {defaultCare.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="origin" className="border-b-0">
              <AccordionTrigger className="label hover:no-underline hover:text-blood py-5">Origin & Shipping</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Cut and sewn in Porto, Portugal. Consecrated in Europe. Ships within 3 business days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-border mt-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-20">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="label-blood mb-3">Also from the coven</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-bone">Related relics</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p) => (
              <ProductCardNew key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
