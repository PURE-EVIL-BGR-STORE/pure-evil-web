'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Link } from '@/i18n/routing'
import { Menu, X } from 'lucide-react'
import { useCart } from '@/features/cart/context/CartContext'
import { SettingsMenu } from './SettingsMenu'


export function SiteHeaderNew(): React.ReactElement {
  const { cart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  const [user, setUser] = useState<{ username: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)

      if (y <= 100) {
        setVisible(true)
      } else if (y - lastScrollY.current > 5) {
        setVisible(false)
      } else if (lastScrollY.current - y > 5) {
        setVisible(true)
      }
      lastScrollY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fetch session
  useEffect(() => {
    let active = true
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (active && data.authenticated && data.user) {
          setUser({ username: data.user.username })
        }
        if (active) setLoading(false)
      })
      .catch(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        setUser(null)
        window.location.reload()
      }
    } catch {
      // silently fail
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'bg-background/85 border-b border-border' : 'bg-transparent'
        } ${!visible && !mobileOpen ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              if (window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/PURE_EVIL_LOGO_4.png" alt="Pure Evil" className="h-8 w-8" />
            <span className="font-display font-black text-sm tracking-[0.3em] text-bone group-hover:text-blood transition-colors">
              PURE·EVIL
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { href: '/collection', label: 'Collection' },
              { href: '/#manifesto', label: 'Manifesto' },
              { href: '/#lookbook', label: 'Lookbook' },
              { href: '/#ch-04', label: 'Sizing' },
              { href: '/#ch-05', label: 'Doctrine' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label hover:text-bone transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right util */}
          <div className="flex items-center gap-4">
            {!loading && user ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="label-blood">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="label hover:text-bone transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:block label hover:text-bone transition-colors">
                Sign In
              </Link>
            )}

            {/* Cart button */}
            <button
              className="flex items-center gap-2 label hover:text-bone transition-colors"
              aria-label="Open cart"
            >
              <span>Bag</span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center border border-blood text-blood text-[10px] font-mono px-1">
                {String(cart.totalQuantity).padStart(2, '0')}
              </span>
            </button>

            {/* Settings Menu */}
            <SettingsMenu />

            {/* Mobile burger */}
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X size={20} className="text-foreground" />
              ) : (
                <Menu size={20} className="text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-30 bg-background/96 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-105'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {[
            { href: '/collection', label: 'Collection' },
            { href: '/#manifesto', label: 'Manifesto' },
            { href: '/#lookbook', label: 'Lookbook' },
            { href: '/#ch-04', label: 'Sizing' },
            { href: '/#ch-05', label: 'Doctrine' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-2xl font-display uppercase tracking-[0.2em] text-foreground hover:text-blood transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          {!loading && user ? (
            <div className="flex flex-col items-center gap-4">
              <span className="text-xl font-display uppercase tracking-[0.2em] text-blood">
                {user.username}
              </span>
              <button
                onClick={() => { setMobileOpen(false); handleLogout() }}
                className="label hover:text-bone transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-2xl font-display uppercase tracking-[0.2em] text-blood hover:text-bone transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </>
  )
}
