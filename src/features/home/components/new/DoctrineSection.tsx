'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { Chapter } from '@/components/Chapter'

export function DoctrineSection(): React.ReactElement {
  return (
    <Chapter
      id="ch-05"
      number="VI"
      title="Doctrine"
      prev={{ id: 'ch-04', number: 'V', title: 'On Sizing' }}
    >
      <div className="divide-y divide-border border-y border-border">
        {[
          {
            q: 'How is it made?',
            a: 'Cut and sewn in Porto from 280 gsm cotton, then hand screen-printed in Berlin. Each tee is garment-dyed after printing — imperfections are intentional.',
          },
          {
            q: 'How does it fit?',
            a: 'Boxy, oversized, drop-shoulder. If you\'re between sizes and want a modern boxy fit, size down. For a true oversized drape, size up.',
          },
          {
            q: 'When does it ship?',
            a: 'Orders ship within 3 business days from our Berlin studio. International delivery in 5–10 business days via tracked courier.',
          },
        ].map((item, i) => (
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
          All doctrine → /faq
        </Link>
      </div>
    </Chapter>
  )
}
