import { useRef, useState, type KeyboardEvent } from 'react'
import { Band, SectionHeading } from '@/components/Section'

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
    <Band id="product">
      <SectionHeading
        eyebrow="The product"
        title="What each area of MangoDocs does."
        lede="From the full portfolio down to a single clause. Every figure comes from what your contracts say."
      />

      <div className="mt-20 grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-20">
        <div
          role="tablist"
          aria-label="Product areas"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="-mx-5 flex gap-7 overflow-x-auto border-b border-hairline px-5 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0 lg:border-b-0 lg:px-0"
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
                className={`caps relative shrink-0 whitespace-nowrap py-4 text-left transition-colors duration-150 lg:border-t lg:border-hairline lg:py-5 lg:pl-5 lg:last:border-b ${
                  selected ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {/* Mango marker: underline on phones, left bar on desktop. */}
                <span
                  aria-hidden="true"
                  className={`absolute bg-mango-500 transition-opacity duration-150 max-lg:inset-x-0 max-lg:-bottom-px max-lg:h-0.5 lg:inset-y-4 lg:left-0 lg:w-0.5 ${
                    selected ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {t.label}
              </button>
            )
          })}
        </div>

        <div id="tour-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="min-w-0">
          <div key={current.id} className={changed ? 'tour-swap' : undefined}>
            <h3 className="display-2 text-ink">{current.title}</h3>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-muted">{current.body}</p>
            <ul className="mt-12 grid gap-x-10 sm:grid-cols-2">
              {current.capabilities.map((c) => (
                <li key={c} className="border-t border-hairline py-5 text-[15px] text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Band>
  )
}
