import type { ReactNode } from 'react'

export interface ChapterProps {
  id: string
  number: string
  title: string
  prev?: { id: string; number: string; title: string }
  className?: string
  children: ReactNode
}

export function Chapter({ id, number, title, prev, children, className = '' }: ChapterProps): React.ReactElement {
  return (
    <section
      id={id}
      className={`relative border-t border-border scroll-mt-16 min-h-[calc(100vh-4rem)] flex flex-col justify-center w-full ${className}`}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-10 md:py-16 w-full relative z-10">
        <div className="mb-8 md:mb-12 grid md:grid-cols-[auto_1fr_auto] items-baseline gap-6 md:gap-10">
          <p className="label-blood font-mono">CH. {number}</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-bone leading-none">
            {title}
          </h2>
          {prev ? (
            <a
              href={`#${prev.id}`}
              className="label hover:text-blood transition-colors group flex items-center gap-2 md:justify-self-end"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              CH. {prev.number} · {prev.title}
            </a>
          ) : (
            <span className="label opacity-40 md:justify-self-end hidden md:block">
              — the beginning
            </span>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
