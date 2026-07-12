import type { Metadata } from 'next'
import React from 'react'
import { Link } from '@/i18n/routing'

export const metadata: Metadata = {
  title: 'Size Guide — PURE EVIL',
  description: 'How Pure Evil garments fit — measurements, fit notes, and how to choose.',
}

const rows = [
  ['XS', '56', '68', '62'],
  ['S', '58', '70', '63'],
  ['M', '60', '72', '64'],
  ['L', '62', '74', '65'],
  ['XL', '64', '76', '66'],
  ['XXL', '66', '78', '67'],
]

export default function SizeGuidePage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-10 pt-16 pb-24">
      <div className="border-b border-border pb-8 mb-16">
        <p className="label-blood mb-3">Reference</p>
        <h1 className="font-display text-5xl md:text-7xl font-black text-bone leading-none">Size Guide</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-10 mb-16">
        {[
          {
            k: 'How to measure',
            v: 'Chest: measure across the fullest part with arms relaxed. Length: from the highest point of the shoulder straight down.',
          },
          {
            k: 'How it should fit',
            v: 'The Relic is cut boxy and oversized. Order true to size for a modern boxy silhouette, or size up for a full oversized drape.',
          },
          {
            k: 'Between sizes?',
            v: "Size down for a cleaner boxy fit, size up for full oversized. Our model is 6'0\" (183 cm) and wears M.",
          },
        ].map((s) => (
          <div key={s.k}>
            <p className="label mb-3">{s.k}</p>
            <p className="text-muted-foreground leading-relaxed text-sm">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-5 label">Size</th>
              <th className="text-left p-5 label">Chest (cm)</th>
              <th className="text-left p-5 label">Length (cm)</th>
              <th className="text-left p-5 label">Sleeve (cm)</th>
            </tr>
          </thead>
          <tbody className="font-mono text-bone">
            {rows.map(([s, c, l, sl]) => (
              <tr key={s} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                <td className="p-5 font-display text-lg text-bone">{s}</td>
                <td className="p-5">{c} cm</td>
                <td className="p-5">{l} cm</td>
                <td className="p-5">{sl} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-16 flex flex-wrap gap-4">
        <Link
          href="/collection"
          className="border border-blood bg-blood/10 text-blood px-6 py-3 text-xs font-mono uppercase tracking-widest hover:bg-blood hover:text-bone transition-colors duration-300"
        >
          Shop the collection
        </Link>
        <Link
          href="/#ch-05"
          className="border border-border px-6 py-3 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:border-bone hover:text-bone transition-colors duration-300"
        >
          Read the doctrine
        </Link>
      </div>
    </div>
  )
}
