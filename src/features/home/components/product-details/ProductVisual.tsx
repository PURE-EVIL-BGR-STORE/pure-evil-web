import React from 'react'

export interface ProductVisualProps {
  img: string
  alt: string
  stamp?: string
}

export function ProductVisual({ img, alt, stamp }: ProductVisualProps): React.ReactElement {
  return (
    <div className="drop__visual" data-reveal>
      {stamp && <span className="drop__stamp">{stamp}</span>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.04]"
      />
    </div>
  )
}
