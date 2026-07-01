'use client'

import React from 'react'
import { ProductVisual } from './product-details/ProductVisual'
import { ProductMeta } from './product-details/ProductMeta'
import { PRODUCTS } from '@/shared/constants/products'

export function FeaturedDrop(): React.ReactElement {
  const featuredProduct = PRODUCTS.find((p) => p.id === 'void-hoodie') || PRODUCTS[0]

  return (
    <section className="section drop" id="drop" data-screen-label="featured-drop">
      <div className="shell">
        <div className="section__head">
          <div data-reveal>
            <span className="eyebrow">Featured Drop / 001</span>
          </div>
          <span className="section__index" data-reveal data-reveal-delay="1">
            Limited — 200 Units
          </span>
        </div>

        <div className="drop__grid">
          <ProductVisual
            img={featuredProduct.img}
            alt={featuredProduct.name}
            stamp="New Arrival"
          />
          <ProductMeta product={featuredProduct} />
        </div>
      </div>
    </section>
  )
}
