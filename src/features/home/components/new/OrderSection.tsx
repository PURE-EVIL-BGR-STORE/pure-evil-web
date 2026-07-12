'use client'

import React from 'react'
import { Chapter } from '@/components/Chapter'

export function OrderSection(): React.ReactElement {
  return (
    <Chapter
      id="ch-06"
      number="VI"
      title="Join the Order"
      prev={{ id: 'ch-05', number: 'V', title: 'Doctrine' }}
    >
      <div className="max-w-2xl">
        <p className="text-xl text-muted-foreground leading-relaxed">
          No newsletters. No marketing. Only drops, announced once, to those who ask to be told.
        </p>
        <form className="mt-10 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@rite.com"
            className="flex-1 bg-transparent border border-border px-5 py-4 text-base focus:border-blood outline-none placeholder:text-muted-foreground/60"
          />
          <button className="border border-blood bg-blood text-bone px-8 py-4 text-xs font-mono uppercase tracking-[0.3em] hover:bg-blood-deep transition-colors">
            Be told
          </button>
        </form>
      </div>
    </Chapter>
  )
}
