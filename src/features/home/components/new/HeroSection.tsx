'use client'

import { Link } from '@/i18n/routing'
import { PRODUCTS } from '@/shared/constants/products'
import { useTranslations } from 'next-intl'

export function HeroSection(): React.ReactElement {
  const featured = PRODUCTS[0]
  const t = useTranslations('Home')

  return (
    <section id="ch-01" className="relative min-h-[calc(100vh-4rem)] grid md:grid-cols-2 gap-0 border-b border-border">
      {/* Left — text */}
      <div className="relative flex flex-col justify-between p-6 md:p-12 lg:p-16 order-2 md:order-1">
        <div className="flex items-center justify-between">
          <p className="label-blood">{t('heroFeatured')}</p>
          <p className="label">{t('heroDrop')}</p>
        </div>

        <div className="py-16 md:py-0">
          <h1 className="font-display text-[14vw] md:text-[9vw] lg:text-[7.5vw] leading-[0.85] font-black text-bone">
            {t('heroTitleFirst')}<br />
            <span className="text-blood italic font-normal" style={{ fontStyle: 'italic' }}>{t('heroTitleSecond')}</span>
          </h1>
          <p className="mt-8 max-w-md text-base md:text-lg text-muted-foreground leading-relaxed">
            {t(`products.${featured.id}.desc`, { defaultValue: featured.desc })}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`/collection/${featured.id}`}
              className="group inline-flex items-center gap-3 border border-blood bg-blood text-bone px-8 py-4 text-xs font-mono uppercase tracking-[0.3em] hover:bg-blood-deep transition-colors"
            >
              {t('heroButton')}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <p className="font-mono text-sm text-bone">${featured.price} USD</p>
          </div>
        </div>

        <div className="hairline pt-4 flex items-center justify-between">
          <a href="#ch-02" className="label hover:text-blood transition-colors">{t('heroScroll')}</a>
          <p className="label">{t('heroLocation')}</p>
        </div>
      </div>

      {/* Right — image */}
      <div className="relative order-1 md:order-2 bg-surface aspect-[4/5] md:aspect-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={featured.img}
          alt={featured.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute top-4 right-4 label-blood bg-background/70 px-2 py-1">
          001 / 001
        </div>
      </div>
    </section>
  )
}
