'use client'

import { useEffect, useRef } from 'react'

interface Ember {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  maxOpacity: number
  life: number
  maxLife: number
  color: string
  flickerSpeed: number
  flickerPhase: number
}

const EMBER_COLORS = [
  '#c5141b',  // blood red
  '#d4201f',  // crimson
  '#ff1a1a',  // bright red
  '#e8391e',  // fire red
  '#ff4422',  // ember orange-red
  '#ff6b35',  // ember orange
  '#ff8844',  // warm ember
]

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function createEmber(canvasWidth: number, canvasHeight: number, spawnAtBottom = false): Ember {
  const x = randomBetween(0, canvasWidth)
  const y = spawnAtBottom
    ? canvasHeight + randomBetween(-10, 40)
    : randomBetween(0, canvasHeight)

  const maxLife = randomBetween(150, 350)
  return {
    x,
    y,
    vx: randomBetween(-0.4, 0.4),
    vy: randomBetween(-0.8, -2.2),
    size: randomBetween(0.8, 3.2),
    opacity: 0,
    maxOpacity: randomBetween(0.4, 1),
    life: 0,
    maxLife,
    color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
    flickerSpeed: randomBetween(0.05, 0.15),
    flickerPhase: randomBetween(0, Math.PI * 2),
  }
}

/**
 * useEmberParticles — Highly optimized Canvas 2D ember particle system.
 * Caches dimensions to prevent forced layouts inside the animation frame loop.
 */
export function useEmberParticles(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  isActive: boolean = true,
  isOpened: boolean = false,
  particleCount: number = 70
): void {
  const embersRef = useRef<Ember[]>([])
  const isReducedMotion = useRef(false)
  const dimensionsRef = useRef({ width: 800, height: 600 })

  useEffect(() => {
    isReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const canvas = canvasRef.current
    if (!canvas || !isActive || isReducedMotion.current) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number

    const render = () => {
      // Use cached dimensions to avoid layout thrashing
      const rectWidth = dimensionsRef.current.width
      const rectHeight = dimensionsRef.current.height
      ctx.clearRect(0, 0, rectWidth, rectHeight)

      const embers = embersRef.current

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i]
        e.life++

        // Reset dead particles
        if (e.life > e.maxLife) {
          embers[i] = createEmber(rectWidth, rectHeight, true)
          continue
        }

        // Standard ember motion: slow upward drift with wave motion
        e.x += e.vx + Math.sin(e.life * 0.02) * 0.15
        e.y += e.vy

        // Standard embers fade in, fade out, and flicker
        const lifeRatio = e.life / e.maxLife
        if (lifeRatio < 0.2) {
          e.opacity = (lifeRatio / 0.2) * e.maxOpacity
        } else if (lifeRatio > 0.7) {
          e.opacity = ((1 - lifeRatio) / 0.3) * e.maxOpacity
        } else {
          e.opacity = e.maxOpacity
        }
        const flicker = Math.sin(e.life * e.flickerSpeed + e.flickerPhase) * 0.3 + 0.7
        const finalOpacity = e.opacity * flicker

        ctx.save()
        ctx.globalAlpha = finalOpacity

        // Render circular ember using double-circle arcs (soft outer glow, bright inner core)
        // 1. Soft glowing outer circle
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size * 3.0, 0, Math.PI * 2)
        ctx.fillStyle = e.color
        ctx.globalAlpha = finalOpacity * 0.25
        ctx.fill()

        // 2. Bright core
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2)
        ctx.fillStyle = e.color
        ctx.globalAlpha = finalOpacity
        ctx.fill()

        // 3. Tiny white center hot core
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = finalOpacity * 0.6
        ctx.fill()

        ctx.restore()
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [canvasRef, isActive])

  // Resize handler — only place where client bounding rect is measured
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      // Cache dimensions locally
      dimensionsRef.current = { width: rect.width, height: rect.height }

      // Initialize base embers
      embersRef.current = Array.from({ length: particleCount }, () =>
        createEmber(rect.width, rect.height, false)
      )
      embersRef.current.forEach((e) => {
        e.life = Math.floor(Math.random() * e.maxLife)
      })
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [canvasRef, particleCount])
}
