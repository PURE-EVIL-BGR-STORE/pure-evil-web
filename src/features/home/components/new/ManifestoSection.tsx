'use client'

import React, { useState, useEffect } from 'react'
import { Chapter } from '@/components/Chapter'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'

export function ManifestoSection(): React.ReactElement {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('Home')

  useEffect(() => {
    setMounted(true)
  }, [])

  const tagline = !mounted || resolvedTheme === 'dark'
    ? t('taglineDark')
    : t('taglineLight')

  return (
    <Chapter
      id="manifesto"
      number="IV"
      title={t('manifestoTitle')}
      prev={{ id: 'system-components', number: 'III', title: t('bestSellersTitle') }}
      className="bg-background overflow-hidden relative"
    >
      {/* Background Sigil */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/PURE_EVIL_LOGO_3.png"
        alt=""
        className="absolute top-1/2 left-1/2 w-[min(80vw,55rem)] -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none z-0"
      />

      <div className="relative z-10">
        <div className="max-w-[clamp(21.25rem,66vw,58.75rem)]">
          <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-wide text-bone uppercase mb-2">
            {t('manifestoHeading1')}
          </p>
          <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-wide text-bone uppercase mb-2">
            {t('manifestoHeading2')}
          </p>
          <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-wide text-muted-foreground/40 uppercase mb-2">
            {t('manifestoHeading3')}<span className="text-blood">{t('manifestoHeading3Accent')}</span>{t('manifestoHeading3End')}
          </p>
          <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-wide text-muted-foreground/40 uppercase mb-2">
            {t('manifestoHeading4')}
          </p>
          <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-wide text-muted-foreground/40 uppercase mb-6">
            {t('manifestoHeading5')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 pt-8 border-t border-border">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.24em] text-bone mb-4 font-bold">{t('manifestoDocTitle')}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {t('manifestoDocDesc')}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.24em] text-bone mb-4 font-bold">{t('manifestoMatTitle')}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {t('manifestoMatDesc')}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.24em] text-bone mb-4 font-bold">{t('manifestoCodeTitle')}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {t('manifestoCodeDesc')} {tagline}
            </p>
          </div>
        </div>
      </div>
    </Chapter>
  )
}
