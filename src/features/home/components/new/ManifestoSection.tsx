'use client'

import React from 'react'
import { Chapter } from '@/components/Chapter'

export function ManifestoSection(): React.ReactElement {
  return (
    <Chapter
      id="manifesto"
      number="III"
      title="Manifesto"
      prev={{ id: 'classification', number: 'II', title: 'Classification' }}
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
            We are not
          </p>
          <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-wide text-bone uppercase mb-2">
            a clothing brand.
          </p>
          <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-wide text-muted-foreground/40 uppercase mb-2">
            We are an <span className="text-blood">identity</span>—
          </p>
          <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-wide text-muted-foreground/40 uppercase mb-2">
            a manifestation of obsession,
          </p>
          <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-wide text-muted-foreground/40 uppercase mb-6">
            discipline &amp; aesthetic violence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 pt-8 border-t border-border">
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.24em] text-bone mb-4 font-bold">The Doctrine</h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Every garment is a ritual. Cut sharp, dyed in obsidian, marked with the sigil. Worn by
              those who refuse the ordinary.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.24em] text-bone mb-4 font-bold">The Material</h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Heavyweight Japanese fleece, raw-edge construction, oxidised hardware. Built to outlast
              the trends that fear it.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.24em] text-bone mb-4 font-bold">The Code</h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Discipline builds freedom. Restraint becomes power. We do not chase the light — we
              master the dark.
            </p>
          </div>
        </div>
      </div>
    </Chapter>
  )
}
