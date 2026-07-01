import React, { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { Product } from '@/shared/constants/products'

export interface ProductMetaProps {
  product: Product
  showBagAction?: boolean
  showSizes?: boolean
}

const SIZES = [
  { label: 'XS', out: false },
  { label: 'S', out: false },
  { label: 'M', out: false },
  { label: 'L', out: false },
  { label: 'XL', out: true },
]

export function ProductMeta({
  product,
  showBagAction = true,
  showSizes = true,
}: ProductMetaProps): React.ReactElement {
  const [activeSize, setActiveSize] = useState('S')

  const handleAddToBag = () => {
    toast.success(`ADDED TO BAG: ${product.name} (SIZE ${activeSize})`, {
      style: {
        background: '#0c0c0c',
        border: '1px solid var(--red)',
        color: '#f5f3f1',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.15em',
        borderRadius: '4px',
      },
      duration: 3000,
    })
  }

  return (
    <div className="drop__meta">
      <span className="eyebrow drop__eyebrow" data-reveal>
        {product.category} — {product.spec}
      </span>
      <h2 className="drop__name" data-reveal data-reveal-delay="1">
        {product.name}
      </h2>
      <p className="drop__price" data-reveal data-reveal-delay="1">
        {product.originalPrice > product.price && (
          <s className="mr-3 text-faint/60">${product.originalPrice}</s>
        )}
        ${product.price} USD
      </p>
      <p className="drop__desc" data-reveal data-reveal-delay="2">
        {product.desc}
      </p>

      {showSizes && (
        <div className="drop__sizes" data-reveal data-reveal-delay="2">
          {SIZES.map((s) => (
            <button
              key={s.label}
              className={`drop__size${s.out ? ' out' : ''}${activeSize === s.label ? ' active' : ''}`}
              disabled={s.out}
              onClick={() => !s.out && setActiveSize(s.label)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {showBagAction && (
        <div className="drop__actions" data-reveal data-reveal-delay="3">
          <button className="btn btn--primary w-full max-w-[280px] flex items-center justify-center gap-2 cursor-pointer" onClick={handleAddToBag}>
            <ShoppingBag size={14} />
            <span>Add to Bag — ${product.price}</span>
          </button>
          <span className="drop__note">Free ritual shipping over $200</span>
        </div>
      )}
    </div>
  )
}
