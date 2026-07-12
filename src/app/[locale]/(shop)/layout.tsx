import React from 'react'
import { SiteHeaderNew } from '@/components/SiteHeader.new'
import { SiteFooterNew } from '@/components/SiteFooter.new'

interface ShopLayoutProps {
  children: React.ReactNode
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeaderNew />
      <main className="flex-1">{children}</main>
      <SiteFooterNew />
    </div>
  )
}
