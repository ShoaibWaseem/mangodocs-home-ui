import { useState } from 'react'
import { SectionHeading } from '@/components/Section'

const TOUR = [
  {
    id: 'home',
    label: 'Home',
    title: 'The whole portfolio at a glance',
    body: 'What’s active, what’s expiring, what needs attention — real activity from your real contracts.',
  },
  {
    id: 'repository',
    label: 'Repository',
    title: 'Every contract, your way',
    body: 'Table, board or Gantt timeline, filterable and sortable however your team works, with full CSV export.',
  },
  {
    id: 'contract',
    label: 'Contract detail',
    title: 'One page with everything',
    body: 'Key terms, parties and signatories, obligations, risk flags, related documents — and a link straight back to the source file.',
  },
  {
    id: 'renewals',
    label: 'Renewals',
    title: 'Start renewal conversations first',
    body: 'A 400-day runway before every expiry, so the conversation starts on your timeline, not the counterparty’s.',
  },
  {
    id: 'search',
    label: 'Search & Ask',
    title: 'One box for keywords and questions',
    body: 'Search for a clause or ask a full question — answers come with citations you can check.',
  },
  {
    id: 'reporting',
    label: 'Reporting',
    title: 'Numbers computed from what was found',
    body: 'Risk distribution, missing key terms by contract type, retention status, obligation completion — never a sample dashboard.',
  },
  {
    id: 'counterparties',
    label: 'Counterparties',
    title: 'Everyone you do business with',
    body: 'Rolled up across every contract that names them: how many, how much, what’s open, what’s at risk.',
  },
  {
    id: 'admin',
    label: 'Admin',
    title: 'Control in one place',
    body: 'Users and roles, retention policy per contract type, audit log, risk thresholds and every connected source.',
  },
]

export function ProductTour() {
  const [active, setActive] = useState(TOUR[0].id)
  // The first panel is just there on load; only a tab change animates.
  const [changed, setChanged] = useState(false)
  const current = TOUR.find((t) => t.id === active) ?? TOUR[0]

  return (
    <section id="product" className="scroll-mt-16 py-20 sm:py-28">
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="A tour of the product"
          title="Everything a contract team needs, in one place."
          lede="From a portfolio-wide view down to the exact clause — every screen built on the same rule: extract, don’t fabricate."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div
            role="tablist"
            aria-label="Product areas"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:px-0"
          >
            {TOUR.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                id={`tab-${t.id}`}
                aria-selected={t.id === active}
                aria-controls="tour-panel"
                onClick={() => {
                  if (t.id === active) return
                  setActive(t.id)
                  setChanged(true)
                }}
                className={`shrink-0 whitespace-nowrap rounded-md px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  t.id === active
                    ? 'bg-neutral-900 text-neutral-50'
                    : 'text-ink-secondary hover:bg-surface-sunken hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div
            id="tour-panel"
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            className="flex min-h-[16rem] flex-col justify-end rounded-xl border border-border bg-gradient-to-br from-mango-50 via-surface to-surface p-8 sm:p-12"
          >
            <div key={current.id} className={changed ? 'tour-swap' : undefined}>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-mango-800">{current.label}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{current.title}</h3>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-secondary">{current.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
