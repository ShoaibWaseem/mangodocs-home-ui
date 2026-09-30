import { Band, Numbered, SectionHeading } from '@/components/Section'
import { SourcesFlow } from '@/components/SourcesFlow'

const STEPS = [
  {
    title: 'Connect a folder',
    body: 'Choose the Google Drive or SharePoint folders to connect. Nothing is moved, edited or copied into a new filing system.',
  },
  {
    title: 'It reads each contract',
    body: 'Payment terms, liability caps, termination rights, renewals, obligations, parties and signatories, including from scanned PDFs.',
  },
  {
    title: 'Every fact has a source',
    body: 'Each date, clause and party links to the page it came from. If the document doesn’t say, MangoDocs tells you.',
  },
]

export function HowItWorks() {
  return (
    <Band id="how-it-works" tone="stone">
      <SectionHeading
        eyebrow="How it works"
        title="Three steps, no migration."
        lede="Contracts spread across folders and drives become one searchable library, while the files stay where they are."
      />
      <div className="mt-20">
        <SourcesFlow />
      </div>
      <ol className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <Numbered n={i + 1} title={s.title}>
              {s.body}
            </Numbered>
          </li>
        ))}
      </ol>
    </Band>
  )
}
