'use client'

import React, { useEffect } from 'react'
import { HeroSection } from '../components/new/HeroSection'
import { CategorySection } from '../components/new/CategorySection'
import { ManifestoSection } from '../components/new/ManifestoSection'
import { LookbookSection } from '../components/new/LookbookSection'
import { SizingSection } from '../components/new/SizingSection'
import { DoctrineSection } from '../components/new/DoctrineSection'
import { CultSection } from '../components/new/CultSection'

export function NewHomeView(): React.ReactElement {
  useEffect(() => {
    // Add scroll snap classes to HTML element for native viewport snapping
    const html = document.documentElement
    html.classList.add('scroll-smooth')
    
    return () => {
      // Clean up when leaving the homepage
      html.classList.remove('scroll-smooth')
    }
  }, [])

  return (
    <>
      <div className="w-full">
        <HeroSection />
        <CategorySection />
        <ManifestoSection />
        <LookbookSection />
        <SizingSection />
        <DoctrineSection />
        <CultSection />
      </div>
    </>
  )
}
