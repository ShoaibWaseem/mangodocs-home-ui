import type { ReactNode } from 'react'

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary-text">{children}</p>
}

export function SectionHeading({ eyebrow, title, lede }: { eyebrow: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {lede && <p className="mt-4 text-lg leading-relaxed text-ink-secondary">{lede}</p>}
    </div>
  )
}
