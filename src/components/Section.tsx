import type { ReactNode } from 'react'

// Page rhythm: full-width bands alternating paper and stone, generous
// vertical space, one container width.
export function Band({
  id,
  tone = 'paper',
  className = '',
  children,
}: {
  id?: string
  tone?: 'paper' | 'stone'
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 py-24 sm:py-32 ${tone === 'stone' ? 'bg-stone' : 'bg-paper'} ${className}`}
    >
      <div className="container max-w-6xl">{children}</div>
    </section>
  )
}

export function Eyebrow({ children, className = 'text-mango-800' }: { children: ReactNode; className?: string }) {
  return <p className={`caps ${className}`}>{children}</p>
}

export function SectionHeading({ eyebrow, title, lede }: { eyebrow: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display-2 mt-6 text-ink">{title}</h2>
      {lede && <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-muted">{lede}</p>}
    </div>
  )
}

// "01", "02"… above an item, with a hairline: the numbered rows used across the page.
export function Numbered({ n, title, children }: { n: number; title: ReactNode; children: ReactNode }) {
  return (
    <div className="border-t border-hairline pt-6">
      <p className="caps text-mango-800">{String(n).padStart(2, '0')}</p>
      <h3 className="display-3 mt-4 text-ink">{title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{children}</p>
    </div>
  )
}

// "Google Drive · SharePoint · Every fact cited": wraps only between items,
// never inside one, so a phone never shows "EVERY FACT / CITED".
export function Meta({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <p className={`caps flex flex-wrap gap-x-3 gap-y-2 ${className}`}>
      {items.map((item, i) => (
        // The dot trails its item, so a wrapped line never starts with one.
        <span key={item} className="whitespace-nowrap">
          {item}
          {i < items.length - 1 && (
            <span aria-hidden="true" className="ml-3">
              ·
            </span>
          )}
        </span>
      ))}
    </p>
  )
}
