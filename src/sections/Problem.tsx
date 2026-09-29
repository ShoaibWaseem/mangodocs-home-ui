import { SectionHeading } from '@/components/Section'

const PAINS = [
  {
    title: 'The renewal that auto-fires',
    body: 'Nobody saw the 90-day notice period on page 11.',
  },
  {
    title: 'The obligation nobody confirmed',
    body: 'A report owed, a fee due or a notice to serve, tracked in someone’s inbox or not at all.',
  },
  {
    title: 'The clause nobody can quote',
    body: 'Not without re-reading 40 pages the night before the meeting.',
  },
]

export function Problem() {
  return (
    <section className="border-y border-border bg-surface py-20 sm:py-24">
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="The problem"
          title="The risk is in the terms nobody has read."
          lede="Most teams already store their contracts somewhere sensible. What they can’t easily see is what those contracts say."
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
