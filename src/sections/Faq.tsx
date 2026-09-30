import { Plus } from 'lucide-react'
import { Band, SectionHeading } from '@/components/Section'
import { CONTACT_EMAIL } from '@/config'

// Every answer must be literally true of the deployed system, same rule as
// Security.tsx. Where AI processing happens is a deliberate, honest answer —
// see CLAUDE.md's Gemini/Vertex section before changing it.
const FAQS = [
  {
    q: 'Does MangoDocs move or change our files?',
    a: 'No. It reads the folders you choose in Google Drive or SharePoint and never moves, edits or deletes the files in them. The only files it ever writes are new drafts you ask it to create.',
  },
  {
    q: 'What happens when a contract doesn’t say something?',
    a: 'MangoDocs shows it as not stated. It doesn’t fill the gap with a typical value or a guess. A missing governing-law clause appears as “Not stated in document” and is counted in your missing-terms report.',
  },
  {
    q: 'How do we know an extracted term is right?',
    a: 'Every term links to the clause and page it came from, so checking it takes one click. If something is wrong, anyone with access can correct it, and the correction is recorded in the audit trail.',
  },
  {
    q: 'Where is our data stored and processed?',
    a: 'The application and its database run in Google Cloud’s London region. Contract text is read by Google’s Gemini models under Google’s enterprise data-processing terms; that processing isn’t guaranteed to stay in the UK or EU.',
  },
  {
    q: 'Can it read scanned PDFs?',
    a: 'Yes. Scanned and image-only PDFs are read alongside native documents, with the same page-level citations.',
  },
  {
    q: 'What happens if we stop using MangoDocs?',
    a: 'Your contracts never left your own Drive or SharePoint, so there’s nothing to migrate back. Everything MangoDocs extracted can be exported to CSV.',
  },
]

export function Faq() {
  return (
    <Band id="faq">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="Questions" title="Common questions." />
          <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">
            Anything else?{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-ink underline decoration-mango-500 underline-offset-4 hover:decoration-ink"
            >
              Email us
            </a>{' '}
            and we’ll reply.
          </p>
        </div>

        <div className="border-b border-hairline">
          {FAQS.map((f) => (
            <details key={f.q} className="faq group border-t border-hairline">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-7 text-left font-display text-xl font-light tracking-[-0.01em] text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  className="h-5 w-5 shrink-0 text-mango-700 transition-transform duration-200 ease-out group-open:rotate-45"
                  strokeWidth={1.25}
                />
              </summary>
              <p className="max-w-2xl pb-8 pr-12 text-[15px] leading-relaxed text-ink-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Band>
  )
}
