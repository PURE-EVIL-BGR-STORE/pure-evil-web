'use client'

import React, { useRef } from 'react'

interface DemonicEyeProps {
  pupilOffset: { x: number; y: number }
  side?: 'left' | 'right'
  scale?: number
}

export function DemonicEye({
  pupilOffset,
  side = 'left',
  scale = 1,
}: DemonicEyeProps): React.ReactElement {
  const eyeRef = useRef<HTMLDivElement>(null)

  // Mirror left eye horizontally, invert pupil X tracking accordingly
  const adjustedOffset = side === 'left'
    ? { x: -pupilOffset.x, y: pupilOffset.y }
    : pupilOffset

  const xOff = adjustedOffset.x
  const yOff = adjustedOffset.y

  // Iris size relative to container (percentage-based for easy scaling)
  const irisSize = '30%'

  return (
    <div
      ref={eyeRef}
      className="demonic-eye"
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '250px', // Base size — use scale prop to enlarge
        transform: `${side === 'left' ? 'scaleX(-1) ' : ''}scale(${scale})`,
        transformOrigin: 'center center',
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* ─── Layer 1 (bottom): Eyeball image, tracks cursor ─── */}
      <div
        className="demonic-eye__iris-group"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: irisSize,
          height: 0,
          paddingBottom: irisSize, // Force square aspect ratio
          transform: `translate(-50%, -50%) translate(${xOff}px, ${yOff}px)`,
          transition: 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)',
          zIndex: 1,
          borderRadius: '50%',
          overflow: 'visible',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/products/eye.png"
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
            filter: 'drop-shadow(0 0 10px rgba(255, 26, 26, 0.35))',
          }}
        />
      </div>

      {/* ─── Layer 2 (top): Picture7 eyelids/lashes — this is the anchor ─── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/products/Picture7.png"
        alt=""
        draggable={false}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
          filter: 'none !important',
        }}
      />
    </div>
  )
}
