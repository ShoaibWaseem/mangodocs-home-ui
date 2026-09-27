import { useRef, useState, type KeyboardEvent } from 'react'
import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/Section'

// Describes what each area does, deliberately without showing the app's
// screens. Every capability must be literally true of mangodocs-ui.

const TOUR = [
  {
    id: 'home',
    label: 'Home',
    title: 'The whole portfolio at a glance',
    body: 'What’s active, what’s expiring, what needs attention — real activity from your real contracts.',
    capabilities: [
      'Active, expiring and high-risk contracts at a glance',
      'An obligations recap across the whole portfolio',
      'Risk flags that need someone’s attention',
      'Recent activity from your own contracts',
    ],
  },
  {
    id: 'repository',
    label: 'Repository',
    title: 'Every contract, your way',
    body: 'Table, board or Gantt timeline, filterable and sortable however your team works, with full CSV export.',
    capabilities: [
      'Table, board or Gantt timeline views',
      'Filter and sort to match how your team works',
      'Full CSV export of everything extracted',
    ],
  },
  {
    id: 'contract',
    label: 'Contract detail',
    title: 'One page with everything',
    body: 'Key terms, parties and signatories, obligations, risk flags, related documents — and a link straight back to the source file.',
    capabilities: [
      'Key terms, each linked to its clause and page',
      'Parties, signatories and obligations',
      'Risk flags, with the fact behind each one',
      'Corrections recorded in the audit trail',
    ],
  },
  {
    id: 'renewals',
    label: 'Renewals',
    title: 'Start renewal conversations first',
    body: 'A 400-day runway before every expiry, so the conversation starts on your timeline, not the counterparty’s.',
    capabilities: [
      'Every contract inside a 400-day renewal horizon',
      'Auto-renew status and notice deadlines, taken from the contract',
      'Dates come from the contract itself, never estimated',
    ],
  },
  {
    id: 'search',
    label: 'Search & Ask',
    title: 'One box for keywords and questions',
    body: 'Search for a clause or ask a full question — answers come with citations you can check.',
    capabilities: [
      'Keyword search for any clause or phrase',
      'Plain-English questions, answered with citations',
      'Each citation opens the paragraph it came from',
      'Past questions kept, so answers can be revisited',
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting',
    title: 'Numbers computed from what was found',
    body: 'Risk distribution, missing key terms by contract type, retention status, obligation completion — never a sample dashboard.',
    capabilities: [
      'Risk level by contract type',
      'Key-terms coverage: what your contracts don’t say',
      'Obligations completed on time',
      'Retention status and legal holds',
    ],
  },
  {
    id: 'counterparties',
    label: 'Counterparties',
    title: 'Everyone you do business with',
    body: 'Rolled up across every contract that names them: how many, how much, what’s open, what’s at risk.',
    capabilities: [
      'Every party rolled up across the contracts that name them',
      'Open obligations and risk per counterparty',
      'Duplicate counterparties merged into one',
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    title: 'Control in one place',
    body: 'Users and roles, retention policy per contract type, audit log, risk thresholds and every connected source.',
    capabilities: [
      'Users, roles and access rules',
      'Retention policy per contract type',
      'A full audit log of who did what, and when',
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
          eyebrow="A tour of the product"
          title="Everything a contract team needs, in one place."
          lede="From a portfolio-wide view down to the exact clause — every screen built on the same rule: extract, don’t fabricate."
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
