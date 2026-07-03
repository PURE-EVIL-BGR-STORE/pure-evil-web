'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Link } from '@/i18n/routing'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { CartDrawer } from '@/components/CartDrawer'

export function SiteNav(): React.ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollYRef = useRef(0)

  const [user, setUser] = useState<{ username: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('navMenuToggle', { detail: { open: isMobileMenuOpen } }))
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 40)

      const diff = currentScrollY - lastScrollYRef.current

      if (currentScrollY <= 100) {
        setIsVisible(true)
      } else if (diff > 5) {
        setIsVisible(false)
      } else if (diff < -5) {
        setIsVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch session on mount
  useEffect(() => {
    let active = true
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (active) {
          if (data.authenticated && data.user) {
            setUser({ username: data.user.username })
          } else {
            setUser(null)
          }
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error('Session fetch failed', err)
        if (active) {
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        setUser(null)
        window.location.reload()
      }
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <>
      {/* Morphing Horizontal Navigation Bar */}
      <header
        className={`nav ${isScrolled ? 'shrunk' : ''} ${isMobileMenuOpen ? 'shrunk' : ''} ${
          !isVisible && !isMobileMenuOpen ? 'nav-hidden' : ''
        }`}
        data-screen-label="nav"
      >
        <div className="section-container flex items-center justify-between w-full">
          <a
            className="nav__mark"
            href="/"
            aria-label="PURE EVIL home"
            onClick={(e) => {
              e.preventDefault()
              setIsMobileMenuOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/PURE_EVIL_LOGO_4.png" alt="PURE EVIL emblem" />
            <span className="nav__wordmark">Pure Evil</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav__links">
            <Link href="/collection">Collection</Link>
            <a href="#lookbook">Lookbook</a>
            <a href="#manifesto">Manifesto</a>
          </nav>

          <div className="nav__util">
            {!loading && user ? (
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-red">
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="font-mono text-xs uppercase tracking-wider text-muted hover:text-fg transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="nav__search">
                Sign In
              </Link>
            )}
            <CartDrawer />

            {/* Interactive Mobile Burger Trigger */}
            <button
              className="nav__burger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-fg" />
              ) : (
                <Menu size={20} className="text-fg" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer ${isMobileMenuOpen ? 'is-open' : ''}`} style={{ zIndex: 999 }}>
        {/* Mobile Navigation Links */}
        <nav className="flex flex-col items-center gap-8">
          <Link
            href="/collection"
            className="text-2xl font-serif uppercase tracking-[0.2em] text-fg hover:text-red transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Collection
          </Link>
          <a
            href="#lookbook"
            className="text-2xl font-serif uppercase tracking-[0.2em] text-fg hover:text-red transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lookbook
          </a>
          <a
            href="#manifesto"
            className="text-2xl font-serif uppercase tracking-[0.2em] text-fg hover:text-red transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Manifesto
          </a>
          
          {!loading && user ? (
            <div className="flex flex-col items-center gap-4">
              <span className="text-xl font-serif uppercase tracking-[0.2em] text-red">
                {user.username}
              </span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleLogout()
                }}
                className="text-lg font-mono tracking-wider text-muted hover:text-fg transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-2xl font-serif uppercase tracking-[0.2em] text-red hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          )}

          <CartDrawer mobile onCloseMobileMenu={() => setIsMobileMenuOpen(false)} />
        </nav>
      </div>
    </>
  )
}
