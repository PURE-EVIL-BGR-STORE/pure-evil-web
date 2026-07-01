'use client'

import React, { useState, useEffect } from 'react'
import { DemonicEye } from './DemonicEye'

const EYES_OFFSET_Y = '-4vh'
const EYES_SCALE = 1.4

export interface DemonicEyesSectionProps {
  isMobile: boolean
}

export function DemonicEyesSection({ isMobile }: DemonicEyesSectionProps): React.ReactElement | null {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent): void => {
      const eyeX = window.innerWidth * 0.5
      const eyeY = 160

      const dx = e.clientX - eyeX
      const dy = e.clientY - eyeY

      const maxTravelX = 24
      const maxTravelY = 16

      const travelX = Math.min(Math.abs(dx * 0.05), maxTravelX) * Math.sign(dx)
      const travelY = Math.min(Math.abs(dy * 0.05), maxTravelY) * Math.sign(dy)

      setPupilOffset({ x: travelX, y: travelY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  if (isMobile) return null

  return (
    <div className="absolute inset-0 grid grid-rows-[repeat(20,minmax(0,1fr))] grid-cols-5 z-[1] w-full h-screen pointer-events-none">
      {/* Row 5-8, Col 2: Left Demonic Eye */}
      <div
        className="row-start-5 row-span-4 col-start-2 flex justify-center items-center overflow-visible transition-opacity duration-[1s] ease-out animate-fade-in"
        style={{ transform: `translateY(${EYES_OFFSET_Y})` }}
      >
        <DemonicEye
          side="left"
          scale={EYES_SCALE}
          pupilOffset={pupilOffset}
        />
      </div>

      {/* Row 5-8, Col 4: Right Demonic Eye */}
      <div
        className="row-start-5 row-span-4 col-start-4 flex justify-center items-center overflow-visible "
        style={{ transform: `translateY(${EYES_OFFSET_Y})` }}
      >
        <DemonicEye
          side="right"
          scale={EYES_SCALE}
          pupilOffset={pupilOffset}
        />
      </div>
    </div>
  )
}
