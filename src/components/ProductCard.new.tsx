import { Link } from '@/i18n/routing'
import type { Product } from '@/shared/constants/products'

export interface ProductCardNewProps {
  product: Product
}

export function ProductCardNew({ product }: ProductCardNewProps): React.ReactElement {
  return (
    <Link
      href={`/collection/${product.id}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.img}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 label-blood bg-background/70 px-2 py-1">
          {product.category}
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="font-display text-lg font-black text-bone group-hover:text-blood transition-colors">
          {product.name}
        </h3>
        <p className="font-mono text-sm text-bone">${product.price}</p>
      </div>
      <p className="mt-1 label">{product.spec}</p>
    </Link>
  )
}
