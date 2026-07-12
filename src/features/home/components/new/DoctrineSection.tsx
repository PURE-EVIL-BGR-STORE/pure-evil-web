'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { Chapter } from '@/components/Chapter'
import { useTranslations } from 'next-intl'

export function DoctrineSection(): React.ReactElement {
  const t = useTranslations('Home')

  const faqItems = [
    {
      q: t('faq1Q'),
      a: t('faq1A'),
    },
    {
      q: t('faq2Q'),
      a: t('faq2A'),
    },
    {
      q: t('faq3Q'),
      a: t('faq3A'),
    },
  ]

  return (
    <Chapter
      id="ch-05"
      number="VII"
      title={t('doctrineTitle')}
      prev={{ id: 'ch-04', number: 'VI', title: t('sizingTitle') }}
    >
      <div className="divide-y divide-border border-y border-border">
        {faqItems.map((item, i) => (
          <div key={i} className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-16 py-8">
            <p className="label-blood font-mono md:pt-1">{String(i + 1).padStart(2, '0')}</p>
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-bone mb-3">{item.q}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Link href="/faq" className="label-blood hover:text-bone transition-colors">
          {t('doctrineLink')}
        </Link>
      </div>
    </Chapter>
  )
}
