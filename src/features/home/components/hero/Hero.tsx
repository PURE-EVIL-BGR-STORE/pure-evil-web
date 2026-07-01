'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import { motion, AnimatePresence } from 'framer-motion'
import { useEmberParticles } from '../../hooks/useEmberParticles'
import { useSigilAnimation } from '../../hooks/useSigilAnimation'
import { DemonicEyesSection } from './DemonicEyesSection'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { MEDIA_QUERIES } from '@/shared/constants/breakpoints'
import { Button } from '@/components/ui/button/button'
import { ProductStage } from '../product-carousel/ProductStage'
import { Product } from '../product-carousel/product.constants'
import { toast } from 'sonner'
import { ShoppingBag } from 'lucide-react'

const HERO_PRODUCTS: Product[] = [
  {
    id: 'ritual-hoodie',
    name: 'RITUAL DESTROYED HOODIE',
    price: 189,
    spec: '600 GSM Â· loopback fleece',
    desc: 'Heavyweight Japanese loopback fleece, garment-dyed in true obsidian.',
    img: '/images/collections/void.png',
    code: 'PE-RH-001'
  },
  {
    id: 'slashed-longsleeve',
    name: 'SLASHED LONGSLEEVE',
    price: 129,
    spec: 'distressed cotton',
    desc: 'Technical long sleeve shirt with slashed detailing.',
    img: '/images/hero_model.png',
    code: 'PE-SL-002',
    cropClass: 'object-[center_18%]'
  },
  {
    id: 'shadow-cargo',
    name: 'SHADOW CARGO PANTS',
    price: 159,
    spec: 'heavy canvas',
    desc: 'Obsidian cargo pants with custom D-rings.',
    img: '/images/hero_model.png',
    code: 'PE-SC-003',
    cropClass: 'object-[center_bottom]'
  }
]

// DemonicEyesSection is imported from ./DemonicEyesSection

export function Hero(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const bg3Ref = useRef<HTMLImageElement>(null)
  const bg4Ref = useRef<HTMLImageElement>(null)

  const turbRef = useRef<SVGFETurbulenceElement>(null)
  const innerGlowRef = useRef<SVGFEDropShadowElement>(null)
  const outerGlowRef = useRef<SVGFEDropShadowElement>(null)

  const isMobile = useMediaQuery(MEDIA_QUERIES.belowDesktop)
  const [isTearOpen, setIsTearOpen] = useState(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedSize] = useState('M')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTearOpen(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const {
    phase,
    embersActive,
    scrollClass,
  } = useSigilAnimation()

  useEmberParticles(canvasRef, embersActive, true, isMobile ? 40 : 120)

  const isTextVisible = phase !== 'idle' && phase !== 'drawing'

  const handleAcquire = (product: Product): void => {
    toast.success(`${product.name} [Size ${selectedSize}] acquired successfully.`, {
      style: {
        background: 'var(--panel)',
        border: '1px solid rgba(197, 20, 27, 0.4)',
        color: 'var(--fg)',
        fontFamily: 'var(--font-mono)',
      },
      icon: <ShoppingBag className="text-red-500 w-4 h-4" />,
    })
  }

  return (
    <section className="hero--editorial" id="top" data-screen-label="hero" style={{ position: 'relative' }}>
      {/*Cinematic grain texture overlay*/}
      <div className="hero__grain" aria-hidden="true" />

      {/*Background images stack*/}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={bg3Ref}
        src="/images/Picture3.png"
        alt=""
        className="hero__bg-3"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: isTearOpen ? '-70vw' : '-35vw',
          width: 'auto',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'none',
          transition: 'left 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={bg4Ref}
        src="/images/Picture4.png"
        alt=""
        className="hero__bg-4"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: isTearOpen ? '80vw' : '35vw',
          width: 'auto',
          height: '100%',
          zIndex: 4,
          pointerEvents: 'none',
          transition: 'left 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric background gradients */}
      <div className="hero__embers" style={{ zIndex: 1 }} data-drift-x></div>

      {/* Canvas for ember particle system */}
      <canvas
        ref={canvasRef}
        className="hero__canvas"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      />

      {/*Mobile ambient red glow*/}
      {isMobile && (
        <div className="hero__mobile-glow" aria-hidden="true" />
      )}

      {/*Eyes Background Grid (z-[1] — behind everything)*/}
      <DemonicEyesSection isMobile={isMobile} />

      {/* Foreground 20-Row Grid (z-10 — above backgrounds)*/}
      <div className="absolute inset-0 grid grid-rows-[repeat(20,minmax(0,1fr))] grid-cols-5 z-10 w-full h-screen pointer-events-none">

        {/* Row 8-18: Product Carousel (Desktop) or Logo + Shop Now (Mobile) */}
        <div
          className="col-start-2 col-span-3 flex flex-col justify-center items-center w-full h-full overflow-hidden pointer-events-auto"
          style={{ gridRow: '9 / 18' }}
        >
          <AnimatePresence>
            {isTextVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="w-full h-full flex flex-col justify-center items-center gap-6"
              >
                {isMobile ? (
                  <div className="flex flex-col items-center gap-8 w-full max-w-[280px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/PURE_EVIL_LOGO_3.png"
                      alt="PURE EVIL"
                      className="w-full h-auto object-contain max-h-[140px] drop-shadow-[0_0_35px_rgba(197,20,27,0.3)] animate-pulse"
                      style={{ animationDuration: '4s' }}
                    />
                    <Button
                      variant="ritual"
                      className="w-full py-3.5 px-6 font-mono text-[10px] tracking-[0.25em] font-semibold flex items-center justify-center"
                      asChild
                    >
                      <Link href="/collection">
                        <span>SHOP NOW</span>
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <ProductStage
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    products={HERO_PRODUCTS}
                    handleAcquire={handleAcquire}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Row 19-20: Scroll Text Indicator */}
        <div className="row-start-19 row-span-2 col-span-5 flex justify-center items-center w-full h-full pointer-events-auto">
          <button
            onClick={() => {
              const el = document.getElementById('lookbook')
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className={`${scrollClass} pointer-events-auto cursor-pointer focus:outline-none`}
            style={{ zIndex: 5, position: 'relative', bottom: 'auto', left: 'auto', transform: 'none' }}
          >
            <span>Scroll</span>
            <i></i>
          </button>
        </div>
      </div>

      {/*SVG filter for the wavy leather/cloth ripple effect*/}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="leather-wave" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbRef}
              id="leatherTurbElement"
              type="fractalNoise"
              baseFrequency="0.012 0.018"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="11"
              xChannelSelector="R"
              yChannelSelector="G"
              result="waved"
            />
            {/* Inner Glow */}
            <feDropShadow
              ref={innerGlowRef}
              id="innerGlow"
              in="waved"
              dx={0}
              dy={0}
              stdDeviation="7"
              floodColor="var(--red-bright)"
              floodOpacity="0.65"
              result="shadow1"
            />
            {/* Outer Glow */}
            <feDropShadow
              ref={outerGlowRef}
              id="outerGlow"
              in="waved"
              dx={0}
              dy={0}
              stdDeviation="18"
              floodColor="var(--red-bright)"
              floodOpacity="0.45"
              result="shadow2"
            />
            <feMerge>
              <feMergeNode in="shadow2" />
              <feMergeNode in="shadow1" />
              <feMergeNode in="waved" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </section>
  )
}







