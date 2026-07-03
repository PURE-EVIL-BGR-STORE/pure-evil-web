import React from 'react'
import { Atmosphere } from '../components/Atmosphere'
import { RevealController } from '../components/RevealController'
import { Hero } from '../components/hero/Hero'
import { Ticker } from '../components/Ticker'
import { FeaturedDrop } from '../components/FeaturedDrop'
import { CategoryGrid } from '../components/CategoryGrid'
import { Manifesto } from '../components/Manifesto'
import { BestSellersGrid } from '../components/BestSellersGrid'
import { Lookbook } from '../components/Lookbook'
import { Cult } from '../components/Cult'
import { SectionContainer } from '@/components/SectionContainer'

export function HomeView(): React.ReactElement {
  return (
    <>
      <Atmosphere />
      <RevealController />
      <main>
        <Hero />
        <Ticker />
        <SectionContainer>
          <FeaturedDrop />
        </SectionContainer>
        <SectionContainer>
          <CategoryGrid />
        </SectionContainer>
        <SectionContainer>
          <Manifesto />
        </SectionContainer>
        <SectionContainer>
          <BestSellersGrid />
        </SectionContainer>
        <Lookbook />
        <SectionContainer>
          <Cult />
        </SectionContainer>
      </main>
    </>
  )
}
