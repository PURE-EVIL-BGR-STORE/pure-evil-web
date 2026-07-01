import React from 'react'
import { Atmosphere } from '../components/Atmosphere'
import { RevealController } from '../components/RevealController'
import { Hero } from '../components/hero/Hero'
import { Ticker } from '../components/Ticker'
import { ProductCarousel } from '../components/product-carousel/ProductCarousel'
import { Manifesto } from '../components/Manifesto'
import { FeaturedDrop } from '../components/FeaturedDrop'
import { Lookbook } from '../components/Lookbook'
import { Cult } from '../components/Cult'

export function HomeView(): React.ReactElement {
  return (
    <>
      <Atmosphere />
      <RevealController />
      <main>
        <Hero />
        <Ticker />
        <ProductCarousel />
        <Manifesto />
        <FeaturedDrop />
        <Lookbook />
        <Cult />
      </main>
    </>
  )
}
