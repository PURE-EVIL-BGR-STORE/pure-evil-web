'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '@/shared/constants/products'
import { Button } from '@/components/ui/button/button'
import { Link } from '@/i18n/routing'

export interface ProductStageProps {
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  products: Product[]
}

export const ProductStage = ({
  activeIndex,
  setActiveIndex,
  products,
}: ProductStageProps): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 320 })
  const total = products.length

  useEffect(() => {
    if (!containerRef.current) return
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  const nextSlide = (): void => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % total)
  }

  const prevSlide = (): void => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + total) % total)
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold) {
      nextSlide()
    } else if (info.offset.x > swipeThreshold) {
      prevSlide()
    }
  }

  const getRelativeIndex = (index: number, active: number, count: number): number => {
    let diff = index - active
    while (diff > count / 2) diff -= count
    while (diff < -count / 2) diff += count
    return diff
  }

  const cardHeight = dimensions.height * 0.95
  const cardWidth = cardHeight * 0.75
  const cardSpacing = cardWidth * 0.8
  const baseScale = 0.75
  const activeDepth = 150
  const sideOpacity = 0.45

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-0 flex items-center justify-center select-none perspective-[1200px] overflow-hidden">
      <button
        onClick={prevSlide}
        aria-label="Previous product"
        className="absolute left-2 md:left-4 z-30 p-3 bg-black/40 border border-line/70 hover:border-red-600 hover:bg-black/90 text-zinc-400 hover:text-white rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer pointer-events-auto"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center transform-style-3d overflow-hidden">
        {products.map((prod, index) => {
          const diff = getRelativeIndex(index, activeIndex, total)
          const isActive = diff === 0
          const isVisible = Math.abs(diff) <= 1
          const xTranslation = diff * cardSpacing
          const rotateYVal = diff * -28
          const scaleVal = isActive ? 1 : baseScale
          const zVal = isActive ? activeDepth : -150
          const opacityVal = isActive ? 1 : isVisible ? sideOpacity : 0

          return (
            <motion.div
              key={prod.id}
              style={{
                position: 'absolute',
                width: cardWidth,
                height: cardHeight,
                left: '50%',
                top: '50%',
                marginLeft: -cardWidth / 2,
                marginTop: -cardHeight / 2,
                transformOrigin: 'center center',
                cursor: isActive ? 'grab' : 'pointer',
              }}
              animate={{
                x: xTranslation,
                rotateY: rotateYVal,
                scale: scaleVal,
                z: zVal,
                opacity: opacityVal,
                zIndex: 10 - Math.abs(diff),
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 24,
              }}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={() => {
                if (!isActive) {
                  setActiveIndex(index)
                }
              }}
              className={`relative overflow-hidden rounded-lg bg-panel border transition-shadow duration-500 pointer-events-auto ${isActive
                ? 'border-red-900'
                : 'border-line/50 hover:border-line'
                }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px] opacity-0 hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center gap-4 p-6">
                  <Button
                    variant="ritual"
                    className="w-full max-w-[160px] h-auto !py-2 !px-4 font-mono !text-xs tracking-[0.2em] font-semibold flex items-center justify-center gap-2"
                    asChild
                  >
                    <Link href={`/collection/${prod.id}`} onClick={(e) => e.stopPropagation()}>
                      <span>SHOP THE DROP</span>
                    </Link>
                  </Button>
                </div>
              )}

              {isActive && (
                <div className="absolute inset-0 border border-red-500/20 pointer-events-none z-20 animate-pulse" />
              )}

              <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-xs text-zinc-500 z-20">
                <span>{prod.code}</span>
                <span className={isActive ? 'text-red-500' : ''}>
                  {isActive ? 'ACTIVE_SYS' : 'STDBY'}
                </span>
              </div>

              <div className="w-full h-full p-6 pt-10 flex items-center justify-center bg-bg-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.img}
                  alt={prod.name}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-1000 object-center"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end font-mono">
                <span className="text-xs text-zinc-400 uppercase tracking-wider">{prod.name}</span>
                <span className="text-xs text-red-500 font-semibold">${prod.price}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <button
        onClick={nextSlide}
        aria-label="Next product"
        className="absolute right-2 md:right-4 z-30 p-3 bg-black/40 border border-line/70 hover:border-red-600 hover:bg-black/90 text-zinc-400 hover:text-white rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer pointer-events-auto"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 justify-center items-center gap-3">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer pointer-events-auto ${i === activeIndex ? 'w-8 bg-red-600' : 'w-2 bg-line/20 hover:bg-line/45'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
