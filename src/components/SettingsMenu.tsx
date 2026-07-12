'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Settings } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'

export function SettingsMenu(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (nextLocale: 'en' | 'vi') => {
    router.replace(pathname, { locale: nextLocale })
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Settings trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 text-muted-foreground hover:text-bone transition-colors cursor-pointer"
        aria-label="Settings"
      >
        <Settings size={18} className={`transition-transform duration-500 ${isOpen ? 'rotate-90 text-blood' : ''}`} />
      </button>

      {/* Settings dropdown card */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 border border-border bg-background/95 backdrop-blur-md p-5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-5">
          {/* Theme Section */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60">
              SYS_THEME
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme('dark')}
                className={`py-2 px-3 text-[10px] font-mono uppercase tracking-[0.15em] border transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  theme === 'dark'
                    ? 'border-blood text-blood bg-blood/5 font-semibold'
                    : 'border-border text-muted-foreground hover:border-muted-foreground hover:text-bone'
                }`}
              >
                {theme === 'dark' && <span className="w-1.5 h-1.5 rounded-full bg-blood" />}
                Dark
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`py-2 px-3 text-[10px] font-mono uppercase tracking-[0.15em] border transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  theme === 'light'
                    ? 'border-blood text-blood bg-blood/5 font-semibold'
                    : 'border-border text-muted-foreground hover:border-muted-foreground hover:text-bone'
                }`}
              >
                {theme === 'light' && <span className="w-1.5 h-1.5 rounded-full bg-blood" />}
                Light
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-border/60 w-full" />

          {/* Language Section */}
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60">
              SYS_LOCALE
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`py-2 px-3 text-[10px] font-mono uppercase tracking-[0.15em] border transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  locale === 'en'
                    ? 'border-blood text-blood bg-blood/5 font-semibold'
                    : 'border-border text-muted-foreground hover:border-muted-foreground hover:text-bone'
                }`}
              >
                {locale === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-blood" />}
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('vi')}
                className={`py-2 px-3 text-[10px] font-mono uppercase tracking-[0.15em] border transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                  locale === 'vi'
                    ? 'border-blood text-blood bg-blood/5 font-semibold'
                    : 'border-border text-muted-foreground hover:border-muted-foreground hover:text-bone'
                }`}
              >
                {locale === 'vi' && <span className="w-1.5 h-1.5 rounded-full bg-blood" />}
                VI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
