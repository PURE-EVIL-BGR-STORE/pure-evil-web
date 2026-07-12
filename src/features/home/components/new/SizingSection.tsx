'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { Chapter } from '@/components/Chapter'

export function SizingSection(): React.ReactElement {
  return (
    <Chapter
      id="ch-04"
      number="V"
      title="On Sizing"
      prev={{ id: 'lookbook', number: 'IV', title: 'The Ritual' }}
    >
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
            The Relic runs boxy and cropped. Order true to size for the oversized fit, or size down for a modern boxy cut. Model wears M.
          </p>
          <Link
            href="/size-guide"
            className="mt-8 inline-flex items-center gap-2 label-blood hover:text-bone transition-colors"
          >
            Full size guide <span>→</span>
          </Link>
        </div>
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 label">Size</th>
                <th className="text-left p-4 label">Chest</th>
                <th className="text-left p-4 label">Length</th>
              </tr>
            </thead>
            <tbody className="font-mono text-bone">
              {[
                ['XS', '56', '68'],
                ['S', '58', '70'],
                ['M', '60', '72'],
                ['L', '62', '74'],
                ['XL', '64', '76'],
                ['XXL', '66', '78'],
              ].map(([s, c, l]) => (
                <tr key={s} className="border-b border-border last:border-0">
                  <td className="p-4">{s}</td>
                  <td className="p-4">{c} cm</td>
                  <td className="p-4">{l} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Chapter>
  )
}
