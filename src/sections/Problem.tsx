import { Band, Numbered, SectionHeading } from '@/components/Section'

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
    <Band tone="stone">
      <SectionHeading
        eyebrow="The problem"
        title="The risk is in the terms nobody has read."
        lede="Most teams already store their contracts somewhere sensible. What they can’t easily see is what those contracts say."
      />
      <div className="mt-20 grid gap-12 sm:grid-cols-3 sm:gap-8">
        {PAINS.map((p, i) => (
          <Numbered key={p.title} n={i + 1} title={p.title}>
            {p.body}
          </Numbered>
        ))}
      </div>
    </Band>
  )
}
