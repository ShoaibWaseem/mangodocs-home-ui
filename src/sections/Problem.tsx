import { SectionHeading } from '@/components/Section'

const PAINS = [
  {
    title: 'The renewal that auto-fires',
    body: 'Because nobody saw the ninety-day notice window buried on page eleven.',
  },
  {
    title: 'The obligation nobody confirmed',
    body: 'A report owed, a fee due, a notice to serve — tracked in someone’s inbox, if at all.',
  },
  {
    title: 'The clause nobody can quote',
    body: 'Without re-reading forty pages, the night before the meeting where it matters.',
  },
]

export function Problem() {
  return (
    <section className="border-y border-border bg-surface py-20 sm:py-24">
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="The problem"
          title="It’s not the contracts you can find that keep you up at night."
          lede="It’s the ones you can’t. Most teams already have their contracts somewhere sensible — they just can’t see what’s inside them."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {PAINS.map((p, i) => (
            <div key={p.title} className="bg-surface p-6 sm:p-8">
              <p className="font-mono text-xs text-ink-muted">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-secondary">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
