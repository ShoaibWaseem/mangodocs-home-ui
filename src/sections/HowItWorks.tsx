import { FolderSync, ScanText, ShieldCheck } from 'lucide-react'
import { SectionHeading } from '@/components/Section'
import { SourcesFlow } from '@/components/SourcesFlow'

const STEPS = [
  {
    icon: FolderSync,
    title: 'Connect a folder',
    body: 'Point MangoDocs at Google Drive or SharePoint. Your contracts stay where they are — no migration, no new filing system, nothing moved or edited.',
  },
  {
    icon: ScanText,
    title: 'It reads what’s actually there',
    body: 'Payment terms, liability caps, termination rights, renewals, obligations, parties and signatories — including from scanned PDFs.',
  },
  {
    icon: ShieldCheck,
    title: 'It never makes anything up',
    body: 'Every date, clause and party links back to the page it came from. If the document doesn’t say, MangoDocs tells you that instead.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 py-20 sm:py-28">
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps. No re-platforming."
          lede="Contracts scattered across folders and drives become one searchable source — without moving a single file."
        />
        <div className="mt-12">
          <SourcesFlow />
        </div>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-mango-500 text-neutral-900">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="font-mono text-sm text-ink-muted">Step {i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-secondary">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
