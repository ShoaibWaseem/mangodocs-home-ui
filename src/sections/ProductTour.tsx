import { useRef, useState, type KeyboardEvent } from 'react'
import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/Section'

// Describes what each area does, deliberately without showing the app's
// screens. Every capability must be literally true of mangodocs-ui.

const TOUR = [
  {
    id: 'home',
    label: 'Home',
    title: 'Portfolio overview',
    body: 'What’s active, what’s expiring and what needs attention across all your contracts.',
    capabilities: [
      'Active, expiring and high-risk contract counts',
      'An obligations summary across all contracts',
      'Risk flags waiting for review',
      'Recent activity',
    ],
  },
  {
    id: 'repository',
    label: 'Repository',
    title: 'All your contracts',
    body: 'Table, board or Gantt timeline views, with filters, sorting and CSV export.',
    capabilities: ['Table, board or Gantt timeline views', 'Filters and sorting', 'CSV export of extracted data'],
  },
  {
    id: 'contract',
    label: 'Contract detail',
    title: 'Key terms and their sources',
    body: 'Key terms, parties, signatories, obligations, risk flags and related documents, with a link to the source file.',
    capabilities: [
      'Key terms, each linked to its clause and page',
      'Parties, signatories and obligations',
      'Risk flags with the finding behind each one',
      'Corrections recorded in the audit trail',
    ],
  },
  {
    id: 'renewals',
    label: 'Renewals',
    title: 'Renewals from 400 days out',
    body: 'Contracts appear 400 days before they expire, so renewal talks can start early.',
    capabilities: [
      'Contracts expiring in the next 400 days',
      'Auto-renew status and notice deadlines, taken from the contract',
      'No estimated dates',
    ],
  },
  {
    id: 'search',
    label: 'Search & Ask',
    title: 'Keyword search and questions',
    body: 'Search for a clause or ask a question. Answers include citations you can check.',
    capabilities: [
      'Keyword search for any clause or phrase',
      'Plain-English questions, answered with citations',
      'Each citation opens the paragraph it came from',
      'Saved question history',
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting',
    title: 'Reports from your contracts',
    body: 'Risk by contract type, missing key terms, retention status and obligation completion, calculated from your own data.',
    capabilities: [
      'Risk level by contract type',
      'Key terms missing, by contract type',
      'Obligations completed on time',
      'Retention status and legal holds',
    ],
  },
  {
    id: 'counterparties',
    label: 'Counterparties',
    title: 'Contracts by counterparty',
    body: 'For each counterparty: how many contracts, their value, open obligations and risk.',
    capabilities: [
      'Contracts grouped by counterparty',
      'Open obligations and risk per counterparty',
      'Merge duplicate counterparties',
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    title: 'Users, policies and settings',
    body: 'Users and roles, retention policy by contract type, the audit log, risk thresholds and connected sources.',
    capabilities: [
      'Users, roles and access rules',
      'Retention policy per contract type',
      'Audit log of every action',
      'Risk thresholds, notifications and connected sources',
    ],
  },
]

export function ProductTour() {
  const [active, setActive] = useState(TOUR[0].id)
  // The first panel is just there on load; only a tab change animates.
  const [changed, setChanged] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const index = Math.max(
    0,
    TOUR.findIndex((t) => t.id === active),
  )
  const current = TOUR[index]

  function select(i: number, focus = false) {
    const next = TOUR[(i + TOUR.length) % TOUR.length]
    if (focus) tabs.current[TOUR.indexOf(next)]?.focus()
    if (next.id === active) return
    setActive(next.id)
    setChanged(true)
  }

  // WAI-ARIA tabs: arrows move and select, Home/End jump. Up/Down too, since
  // the list is vertical on desktop.
  function onKeyDown(e: KeyboardEvent) {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: TOUR.length - 1,
    }
    if (!(e.key in keys)) return
    e.preventDefault()
    select(keys[e.key], true)
  }

  return (
    <section id="product" className="scroll-mt-16 py-20 sm:py-28">
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="The product"
          title="What each area of MangoDocs does."
          lede="From the full portfolio down to a single clause. Every figure comes from what your contracts say."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-10">
          <div className="min-w-0">
            <div
              role="tablist"
              aria-label="Product areas"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:px-0"
            >
              {TOUR.map((t, i) => {
                const selected = t.id === active
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      tabs.current[i] = el
                    }}
                    role="tab"
                    type="button"
                    id={`tab-${t.id}`}
                    aria-selected={selected}
                    aria-controls="tour-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    className={`shrink-0 whitespace-nowrap rounded-md px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${
                      selected
                        ? 'bg-neutral-900 text-neutral-50'
                        : 'text-ink-secondary hover:bg-surface-sunken hover:text-ink'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div
            id="tour-panel"
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            className="min-w-0 rounded-xl border border-border bg-gradient-to-br from-mango-50 via-surface to-surface p-7 sm:p-10"
          >
            <div key={current.id} className={changed ? 'tour-swap' : undefined}>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-mango-800">{current.label}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{current.title}</h3>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-secondary">{current.body}</p>
              <ul className="mt-8 grid gap-x-8 gap-y-4 border-t border-border pt-8 sm:grid-cols-2">
                {current.capabilities.map((c) => (
                  <li key={c} className="flex gap-3 leading-snug text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mango-100 text-mango-800">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
