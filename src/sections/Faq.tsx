import { Plus } from 'lucide-react'
import { Eyebrow } from '@/components/Section'
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
    a: 'MangoDocs tells you it isn’t stated. It won’t fill the gap with a typical value or a best guess — a missing governing-law clause shows as “Not stated in document”, and counts towards your missing-terms report.',
  },
  {
    q: 'How do we know an extracted term is right?',
    a: 'Every term links to the clause and page it came from, so checking it takes one click. If something is wrong, anyone with access can correct it, and the correction is recorded in the audit trail.',
  },
  {
    q: 'Where is our data stored and processed?',
    a: 'The application and its database run in Google Cloud’s London region. Contract text is read by Google’s Gemini models under Google’s enterprise data-processing terms; that processing isn’t guaranteed to stay in the UK or EU. We’d rather tell you that plainly than bury it.',
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
    <section id="faq" className="scroll-mt-16 py-20 sm:py-28">
      <div className="container grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            The things legal teams ask first.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-secondary">
            Something not covered here?{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-primary-text underline decoration-mango-300 underline-offset-4 hover:decoration-mango-700"
            >
              Email us
            </a>{' '}
            — a person will answer.
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((f) => (
            <details key={f.q} className="faq group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong text-ink-secondary transition-[transform,background-color,border-color] duration-200 ease-out group-open:rotate-45 group-open:border-neutral-900 group-open:bg-neutral-900 group-open:text-neutral-50">
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-ink-secondary">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
