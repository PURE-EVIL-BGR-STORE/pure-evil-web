'use client'

import React, { useState } from 'react'
import { Link } from '@/i18n/routing'
import { PRODUCTS } from '@/shared/constants/products'
import { ProductCardNew } from '@/components/ProductCard.new'
import { useCart } from '@/features/cart/context/CartContext'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion/accordion'

const mockImagesMap: Record<string, string[]> = {
  'void-hoodie': [
    '/void_hoodie_studio.png',
    '/images/products/void-hoodie.png',
    '/look_ritual.png',
    '/look_ascension.png',
    '/look_eclipse.png',
    '/look_hardware.png',
  ],
  'ascension-parka': [
    '/look_ascension.png',
    '/look_ritual.png',
    '/look_eclipse.png',
    '/look_hardware.png',
    '/void_hoodie_studio.png',
  ],
  'ritual-cloak': [
    '/look_ritual.png',
    '/look_ascension.png',
    '/look_eclipse.png',
    '/look_hardware.png',
    '/void_hoodie_studio.png',
  ],
  'eclipse-bomber': [
    '/look_eclipse.png',
    '/look_ritual.png',
    '/look_ascension.png',
    '/look_hardware.png',
    '/void_hoodie_studio.png',
  ],
  'obsidian-cargo': [
    '/look_hardware.png',
    '/look_ritual.png',
    '/look_ascension.png',
    '/look_eclipse.png',
    '/void_hoodie_studio.png',
  ],
}

export interface ProductDetailViewProps {
  id: string
}

export function ProductDetailView({ id }: ProductDetailViewProps): React.ReactElement {
  const product = PRODUCTS.find((p) => p.id === id)
  const [size, setSize] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== 'light'

  const productImages = React.useMemo(() => {
    if (!product) return []
    return mockImagesMap[product.id] || [
      product.img,
      '/look_ritual.png',
      '/look_ascension.png',
      '/look_eclipse.png',
      '/look_hardware.png',
    ]
  }, [product])

  const [selectedImage, setSelectedImage] = useState(product?.img || '')
  const [prevImage, setPrevImage] = useState(product?.img || '')
  const [startIndex, setStartIndex] = useState(0)

  const currentIndex = productImages.indexOf(selectedImage)
  const prevIndex = productImages.indexOf(prevImage)
  const direction = currentIndex >= prevIndex ? 1 : -1

  const selectImage = (imgUrl: string) => {
    setPrevImage(selectedImage)
    setSelectedImage(imgUrl)
  }

  // Sync selected image and scroll index when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.img)
      setPrevImage(product.img)
      setStartIndex(0)
    }
  }, [product])

  const handleScrollUp = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1)
    }
  }

  const handleScrollDown = () => {
    if (startIndex + 4 < productImages.length) {
      setStartIndex((prev) => prev + 1)
    }
  }

  const visibleImages = productImages.slice(startIndex, startIndex + 4)

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

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
    'Wash with like colors; this garment bleeds'
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
        <div className="flex flex-row gap-3 md:gap-4 w-full h-[350px] sm:h-[450px] md:h-[calc(100vh-10rem)] md:max-h-[650px] justify-center md:justify-end">
          {/* Thumbnails Column */}
          <div className="flex flex-col items-center h-full w-[60px] sm:w-[75px] md:w-[90px] flex-shrink-0 gap-2">
            {/* Chevron Up */}
            {productImages.length > 4 && (
              <button
                onClick={handleScrollUp}
                disabled={startIndex === 0}
                className="w-full py-1 flex items-center justify-center text-muted-foreground hover:text-bone disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                aria-label="Scroll gallery up"
              >
                <ChevronUp size={20} />
              </button>
            )}

            {/* Scrollable list of thumbnails */}
            <div className="flex-1 flex flex-col gap-2 w-full overflow-hidden">
              {visibleImages.map((imgUrl, relativeIndex) => {
                const absoluteIndex = startIndex + relativeIndex
                const isSelected = selectedImage === imgUrl
                return (
                  <button
                    key={imgUrl + '-' + absoluteIndex}
                    onClick={() => selectImage(imgUrl)}
                    className={`relative w-full aspect-[4/5] flex-shrink-0 overflow-hidden bg-surface border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? `${
                            isDark
                              ? 'border-red-600 shadow-[0_0_8px_rgba(197,20,27,0.4)]'
                              : 'border-blue-600 shadow-[0_0_8px_rgba(27,79,198,0.3)]'
                          } opacity-100`
                        : 'border-border opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} gallery ${absoluteIndex + 1}`}
                      className={`h-full w-full object-cover transition-transform duration-500 ${
                        isSelected ? 'scale-110' : 'scale-100'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            {/* Chevron Down */}
            {productImages.length > 4 && (
              <button
                onClick={handleScrollDown}
                disabled={startIndex + 4 >= productImages.length}
                className="w-full py-1 flex items-center justify-center text-muted-foreground hover:text-bone disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                aria-label="Scroll gallery down"
              >
                <ChevronDown size={20} />
              </button>
            )}
          </div>

          {/* Main Image Container */}
          <div className="relative aspect-[4/5] h-full bg-surface border border-border overflow-hidden flex-1 md:flex-initial">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={product.name}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="h-full w-full object-cover absolute inset-0"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Details */}
        <div className="md:sticky md:top-24 w-full">
          <p className="label-blood mb-2">{product.category} · {product.code}</p>
          <h1 className="font-display text-3xl md:text-4xl font-black text-bone leading-tight mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-3">
            {product.originalPrice && (
              <span className="font-mono text-base line-through text-muted-foreground/60">
                ${product.originalPrice}
              </span>
            )}
            <span className="font-mono text-lg text-bone">${product.price} USD</span>
          </div>

          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{product.desc}</p>

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="label">Size</p>
              <a href="#" className="label hover:text-blood transition-colors">Size guide →</a>
            </div>
            <div className="flex flex-wrap gap-2">
              {defaultSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-10 h-10 border font-mono text-xs transition-all duration-300 cursor-pointer flex items-center justify-center active:scale-95 ${
                    size === s
                      ? 'border-blood bg-blood text-bone font-bold shadow-[0_0_12px_var(--red-glow)]'
                      : 'border-border text-muted-foreground hover:border-bone hover:text-bone'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div className="mt-6 flex gap-3 h-12 items-stretch">
            <div className="flex items-center border border-border h-full">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-full label hover:text-blood cursor-pointer flex items-center justify-center active:scale-90 transition-transform duration-100"
              >
                −
              </button>
              <span className="w-8 text-center font-mono text-sm">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-10 h-full label hover:text-blood cursor-pointer flex items-center justify-center active:scale-90 transition-transform duration-100"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={!size}
              className="flex-1 h-full border border-blood bg-blood text-bone text-xs font-mono uppercase tracking-[0.3em] hover:bg-blood-deep hover:shadow-[0_0_25px_rgba(197,20,27,0.45)] hover:outline hover:outline-double hover:outline-[3px] hover:outline-blood/45 hover:outline-offset-[-4px] active:scale-[0.99] transition-all duration-300 disabled:bg-transparent disabled:text-muted-foreground disabled:border-border disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:outline-none cursor-pointer flex items-center justify-center"
            >
              {size ? 'Add to bag' : 'Choose a size'}
            </button>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="mt-8 border-t border-border text-sm">
            <AccordionItem value="fabric" className="border-b border-border">
              <AccordionTrigger className="label hover:no-underline hover:text-blood py-3.5">Fabric</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{product.spec}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="fit" className="border-b border-border">
              <AccordionTrigger className="label hover:no-underline hover:text-blood py-3.5">Fit</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">Oversized, boxy silhouette with a dropped shoulder.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="care" className="border-b border-border">
              <AccordionTrigger className="label hover:no-underline hover:text-blood py-3.5">Care</AccordionTrigger>
              <AccordionContent>
                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                  {defaultCare.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="origin" className="border-b-0">
              <AccordionTrigger className="label hover:no-underline hover:text-blood py-3.5">Origin & Shipping</AccordionTrigger>
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
