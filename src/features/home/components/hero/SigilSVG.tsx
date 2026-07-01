'use client'

import React, { forwardRef } from 'react'

interface SigilSVGProps {
  className?: string
}

export const SigilSVG = forwardRef<SVGSVGElement, SigilSVGProps>(
  function SigilSVG({ className = '' }, ref) {
    return (
      <svg
        ref={ref}
        className={`sigil-svg ${className}`}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer ritual circle */}
        <circle
          className="sigil-circle"
          cx="250"
          cy="250"
          r="185"
          strokeWidth="2"
        />

        {/* Barbed notches around the circle (12 evenly spaced) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const r = 185
          const cx = 250
          const cy = 250
          const x1 = Number((cx + (r - 8) * Math.cos(angle)).toFixed(4))
          const y1 = Number((cy + (r - 8) * Math.sin(angle)).toFixed(4))
          const x2 = Number((cx + (r + 8) * Math.cos(angle)).toFixed(4))
          const y2 = Number((cy + (r + 8) * Math.sin(angle)).toFixed(4))
          return (
            <line
              key={`barb-${i}`}
              className="sigil-circle"
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth="1.5"
            />
          )
        })}

        {/* Vertical axis — top trident */}
        <g className="sigil-axis">
          {/* Main vertical line */}
          <line x1="250" y1="40" x2="250" y2="460" strokeWidth="2" />

          {/* Top trident prongs */}
          <line x1="250" y1="40" x2="230" y2="70" strokeWidth="1.8" />
          <line x1="250" y1="40" x2="270" y2="70" strokeWidth="1.8" />
          {/* Top trident cross-bar */}
          <line x1="235" y1="58" x2="265" y2="58" strokeWidth="1.5" />
          {/* Top arrow tip */}
          <line x1="250" y1="28" x2="242" y2="44" strokeWidth="1.5" />
          <line x1="250" y1="28" x2="258" y2="44" strokeWidth="1.5" />

          {/* Bottom arrow */}
          <line x1="250" y1="460" x2="235" y2="440" strokeWidth="1.8" />
          <line x1="250" y1="460" x2="265" y2="440" strokeWidth="1.8" />
          {/* Bottom arrow inner diamond */}
          <path
            d="M250,420 L240,435 L250,450 L260,435 Z"
            strokeWidth="1.5"
          />
        </g>

        {/* 4-point compass star */}
        <g className="sigil-star">
          {/* Left star point */}
          <line x1="60" y1="250" x2="120" y2="250" strokeWidth="2" />
          <line x1="60" y1="250" x2="80" y2="240" strokeWidth="1.5" />
          <line x1="60" y1="250" x2="80" y2="260" strokeWidth="1.5" />
          {/* Extended left spear */}
          <line x1="45" y1="250" x2="60" y2="250" strokeWidth="1.8" />
          <line x1="45" y1="250" x2="52" y2="244" strokeWidth="1.2" />
          <line x1="45" y1="250" x2="52" y2="256" strokeWidth="1.2" />

          {/* Right star point */}
          <line x1="440" y1="250" x2="380" y2="250" strokeWidth="2" />
          <line x1="440" y1="250" x2="420" y2="240" strokeWidth="1.5" />
          <line x1="440" y1="250" x2="420" y2="260" strokeWidth="1.5" />
          {/* Extended right spear */}
          <line x1="455" y1="250" x2="440" y2="250" strokeWidth="1.8" />
          <line x1="455" y1="250" x2="448" y2="244" strokeWidth="1.2" />
          <line x1="455" y1="250" x2="448" y2="256" strokeWidth="1.2" />

          {/* Diagonal star lines (45°) */}
          <line x1="120" y1="120" x2="170" y2="170" strokeWidth="1.5" />
          <line x1="380" y1="120" x2="330" y2="170" strokeWidth="1.5" />
          <line x1="120" y1="380" x2="170" y2="330" strokeWidth="1.5" />
          <line x1="380" y1="380" x2="330" y2="330" strokeWidth="1.5" />
        </g>

        {/* Inner crossing / diamond decorations */}
        <g className="sigil-inner">
          {/* Inner cross at center */}
          <line x1="220" y1="250" x2="280" y2="250" strokeWidth="1.2" />

          {/* Small inner diamond */}
          <path
            d="M250,210 L270,250 L250,290 L230,250 Z"
            strokeWidth="1"
          />

          {/* Upper cross mark */}
          <line x1="243" y1="95" x2="257" y2="95" strokeWidth="1" />
          <line x1="250" y1="88" x2="250" y2="102" strokeWidth="1" />

          {/* Small cross marks near circle at diagonals */}
          <g>
            <line x1="143" y1="100" x2="153" y2="100" strokeWidth="0.8" />
            <line x1="148" y1="95" x2="148" y2="105" strokeWidth="0.8" />
          </g>
          <g>
            <line x1="347" y1="100" x2="357" y2="100" strokeWidth="0.8" />
            <line x1="352" y1="95" x2="352" y2="105" strokeWidth="0.8" />
          </g>
        </g>

        {/* Decorative rune marks at cardinal positions */}
        <g className="sigil-runes">
          {/* Top-left rune — Z shape */}
          <path d="M108,148 L118,148 L108,162 L118,162" strokeWidth="1" />
          {/* Top-right rune — alchemical symbol */}
          <circle cx="392" cy="148" r="4" strokeWidth="0.8" />
          <line x1="392" y1="140" x2="392" y2="156" strokeWidth="0.8" />
          <line x1="386" y1="148" x2="398" y2="148" strokeWidth="0.8" />
          {/* Bottom-left rune — triangle */}
          <path d="M115,355 L105,370 L125,370 Z" strokeWidth="0.8" />
          <circle cx="115" cy="362" r="3" strokeWidth="0.6" />
          {/* Bottom-right rune — cross with dots */}
          <line x1="380" y1="355" x2="380" y2="370" strokeWidth="0.8" />
          <line x1="373" y1="362" x2="387" y2="362" strokeWidth="0.8" />
          <circle cx="375" cy="357" r="1.5" strokeWidth="0.6" />
          <circle cx="385" cy="367" r="1.5" strokeWidth="0.6" />
        </g>
      </svg>
    )
  }
)
