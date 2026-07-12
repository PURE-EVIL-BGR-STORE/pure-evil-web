import { Chapter } from '@/components/Chapter'
import { PRODUCTS } from '@/shared/constants/products'

export function ObjectSection(): React.ReactElement {
  const featured = PRODUCTS[0]

  return (
    <Chapter
      id="ch-02"
      number="II"
      title="The Object"
      prev={{ id: 'ch-01', number: 'I', title: 'Featured' }}
    >
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7 aspect-[4/5] bg-surface overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.img}
            alt={`${featured.name} — back`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="aspect-[4/5] bg-surface overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.img}
              alt={`${featured.name} — detail`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[4/5] bg-surface overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.img}
              alt={`${featured.name} — fabric`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-10 border-t border-border pt-12">
        {[
          { k: 'Weight', v: '600 GSM' },
          { k: 'Cut', v: 'Oversized, drop-shoulder' },
          { k: 'Origin', v: 'Porto → Berlin' },
        ].map((s) => (
          <div key={s.k}>
            <p className="label mb-3">{s.k}</p>
            <p className="font-display text-2xl md:text-3xl text-bone">{s.v}</p>
          </div>
        ))}
      </div>
    </Chapter>
  )
}
