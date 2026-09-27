import { useRef, useState, type KeyboardEvent } from 'react'
import { SectionHeading } from '@/components/Section'
import { TourScreen } from '@/components/tour/Screens'

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

            <div key={current.id} className={`mt-6 lg:mt-8 ${changed ? 'tour-swap' : ''}`} aria-live="polite">
              <h3 className="text-xl font-semibold tracking-tight text-ink">{current.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-secondary">{current.body}</p>
            </div>
          </div>

          <div id="tour-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="relative min-w-0">
            <div
              aria-hidden="true"
              className="absolute -inset-x-6 -inset-y-8 -z-10 rounded-[32px] bg-gradient-to-br from-mango-100/80 via-mango-50/60 to-transparent blur-2xl"
            />
            <div
              key={current.id}
              className={changed ? 'tour-screen-swap' : undefined}
              role="img"
              aria-label={`MangoDocs ${current.label} screen, with sample data`}
            >
              <TourScreen id={current.id} />
            </div>
            <p className="mt-3 text-right text-xs text-ink-muted">Shown with sample data.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
