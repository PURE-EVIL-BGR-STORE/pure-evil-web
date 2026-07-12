'use client'

import { Link } from '@/i18n/routing'

export function SiteFooterNew(): React.ReactElement {
  return (
    <footer className="border-t border-border mt-0">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-black text-blood tracking-widest">PURE·EVIL</p>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Garments cast in shadow. Cut, sewn, and consecrated in Europe.
          </p>
        </div>

        <div>
          <p className="label mb-4">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/collection" className="hover:text-blood transition-colors">Collection</Link></li>
            <li><a href="#" className="hover:text-blood transition-colors">Size Guide</a></li>
          </ul>
        </div>

        <div>
          <p className="label mb-4">Doctrine</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blood transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-blood transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-blood transition-colors">Returns</a></li>
          </ul>
        </div>

        <div>
          <p className="label mb-4">Order</p>
          <p className="text-sm text-muted-foreground mb-3">
            Drops announced first to the order.
          </p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@rite.com"
              className="flex-1 bg-transparent border border-border px-3 py-2 text-sm focus:border-blood outline-none placeholder:text-muted-foreground/60"
            />
            <button className="border border-blood bg-blood/10 text-blood px-3 py-2 text-xs font-mono uppercase tracking-widest hover:bg-blood hover:text-bone transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-5 flex items-center justify-between flex-wrap gap-4">
          <p className="label">© {new Date().getFullYear()} Pure Evil</p>
          <div className="flex gap-6">
            <a href="#" className="label hover:text-bone transition-colors">Instagram</a>
            <a href="#" className="label hover:text-bone transition-colors">TikTok</a>
            <a href="#" className="label hover:text-bone transition-colors">Discord</a>
          </div>
          <p className="label-blood">Ashes to ashes.</p>
        </div>
      </div>
    </footer>
  )
}
