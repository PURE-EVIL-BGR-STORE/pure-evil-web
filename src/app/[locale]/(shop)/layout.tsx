import React from 'react'
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'

interface ShopLayoutProps {
  children: React.ReactNode
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <>
      <SiteNav />
      {children}
      <SiteFooter />
    </>
  )
}
