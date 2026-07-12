import { Chapter } from '@/components/Chapter'

export function RitualSection(): React.ReactElement {
  return (
    <Chapter
      id="ch-03"
      number="III"
      title="The Ritual"
      prev={{ id: 'ch-02', number: 'II', title: 'The Object' }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <figure className="space-y-4">
          <div className="aspect-[4/5] bg-surface overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/collections/void.png"
              alt="Lookbook — daylight"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="label">01 · Daylight</figcaption>
        </figure>
        <figure className="space-y-4 md:mt-24">
          <div className="aspect-[4/5] bg-surface overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero_model.png"
              alt="Lookbook — candlelight"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="label">02 · Candlelight</figcaption>
        </figure>
      </div>
      <blockquote className="mt-20 max-w-3xl">
        <p className="font-display text-3xl md:text-5xl leading-tight text-bone">
          &ldquo;<span className="text-blood">Worn</span> as armour.{' '}
          <br className="hidden md:block" />
          Cut for those who <span className="italic font-normal">disappear</span> in it.&rdquo;
        </p>
        <cite className="label mt-6 block not-italic">— Field notes, Berlin, 2026</cite>
      </blockquote>
    </Chapter>
  )
}
