import type { ReactNode } from 'react'
import {
  ArrowUpRight,
  Download,
  FileText,
  GanttChartSquare,
  KanbanSquare,
  Search,
  SlidersHorizontal,
  Sparkles,
  Table2,
} from 'lucide-react'
import { AppFrame, Chip, Cite, MockTable, Panel } from '@/components/tour/AppFrame'

// One mock per product-tour tab. Sample data only (the tour says so), but
// every screen, column and label mirrors what mangodocs-ui actually renders —
// the page's whole pitch is "never invent", so the pictures don't either.
// Kestrel Logistics matches the contract card higher up the page.

function Stat({ label, value, note, tone }: { label: string; value: string; note: string; tone?: 'mango' | 'danger' }) {
  return (
    <Panel className="p-3">
      <p className="truncate text-[10.5px] font-medium text-ink-muted">{label}</p>
      <p
        className={`mt-1 text-[22px] font-semibold tabular-nums tracking-tight ${
          tone === 'danger' ? 'text-danger-700' : tone === 'mango' ? 'text-mango-800' : 'text-ink'
        }`}
      >
        {value}
      </p>
      <p className="truncate text-[10.5px] text-ink-muted">{note}</p>
    </Panel>
  )
}

function HomeScreen() {
  const months = [3, 5, 2, 7, 4, 9, 6, 3, 5, 8, 4, 6]
  return (
    <AppFrame path="/" active="home" title="Home">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <Stat label="Active contracts" value="214" note="across 6 folders" />
        <Stat label="Expiring in 90 days" value="9" note="3 auto-renew" tone="mango" />
        <Stat label="Obligations due" value="17" note="this month" />
        <Stat label="High risk" value="6" note="2 need review" tone="danger" />
      </div>
      <div className="mt-2.5 grid gap-2.5 lg:grid-cols-[1.25fr_1fr]">
        <Panel className="p-3.5">
          <p className="text-[12px] font-semibold text-ink">Needs attention</p>
          <ul className="mt-2 divide-y divide-border text-[12px]">
            {[
              ['Kestrel MSA', 'Notice deadline in 24 days', 'mango'],
              ['Harbour Freight', 'No termination right', 'danger'],
              ['Northwind DPA', 'Audit report overdue', 'danger'],
              ['Alder & Finch NDA', 'Awaiting signature', 'neutral'],
            ].map(([title, note, tone]) => (
              <li key={title} className="flex items-center justify-between gap-3 py-2">
                <span className="truncate font-medium text-ink">{title}</span>
                <Chip tone={tone as 'mango' | 'danger' | 'neutral'}>{note}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel className="hidden p-3.5 sm:block">
          <p className="text-[12px] font-semibold text-ink">Expiries, next 12 months</p>
          <div className="mt-3 flex h-[7.5rem] items-end gap-1.5" aria-hidden="true">
            {months.map((m, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-mango-300" style={{ height: `${(m / 9) * 100}%` }} />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between font-mono text-[9.5px] text-ink-muted">
            <span>Oct</span>
            <span>Apr</span>
            <span>Sep</span>
          </div>
        </Panel>
      </div>
    </AppFrame>
  )
}

const RISK_TONE = { Low: 'success', Medium: 'mango', High: 'danger' } as const

function RepositoryScreen() {
  const rows: [string, string, string, string, keyof typeof RISK_TONE][] = [
    ['Master Services Agreement', 'Kestrel Logistics Ltd', 'Supplier', '3 Apr 2027', 'Medium'],
    ['Haulage Agreement', 'Harbour Freight plc', 'Supplier', '30 Nov 2026', 'High'],
    ['Data Processing Agreement', 'Northwind Data Ltd', 'DPA', '14 Jan 2027', 'Medium'],
    ['Software Licence', 'Brightwater Systems', 'Licence', '1 Jul 2027', 'Low'],
    ['Office Lease — Leeds', 'Calder Estates', 'Property', '24 Mar 2031', 'Low'],
    ['Consultancy Agreement', 'Pennine Advisory LLP', 'Services', '31 Dec 2026', 'Low'],
  ]
  return (
    <AppFrame
      path="/contracts"
      active="contracts"
      title="Contracts"
      actions={
        <div className="flex items-center gap-1.5">
          <div className="hidden items-center rounded-md border border-border bg-surface p-0.5 text-[11px] sm:flex">
            <span className="flex items-center gap-1 rounded bg-neutral-900 px-2 py-1 font-medium text-neutral-50">
              <Table2 className="h-3 w-3" /> Table
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-ink-secondary">
              <KanbanSquare className="h-3 w-3" /> Board
            </span>
            <span className="flex items-center gap-1 px-2 py-1 text-ink-secondary">
              <GanttChartSquare className="h-3 w-3" /> Timeline
            </span>
          </div>
          <span className="flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[11px] text-ink-secondary">
            <Download className="h-3 w-3" /> CSV
          </span>
        </div>
      }
    >
      <div className="mb-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className="flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-ink-secondary">
          <SlidersHorizontal className="h-3 w-3" /> Filters
        </span>
        <span className="rounded-full bg-mango-50 px-2 py-0.5 font-medium text-mango-800 ring-1 ring-inset ring-mango-100">
          Status: Active
        </span>
        <span className="rounded-full bg-mango-50 px-2 py-0.5 font-medium text-mango-800 ring-1 ring-inset ring-mango-100">
          Sort: Expiry
        </span>
      </div>
      <MockTable
        columns={['Contract', 'Counterparty', 'Type', 'Expiry', 'Risk']}
        template="1.6fr 1.3fr 0.8fr 0.9fr 4.5rem"
        mobile="1.4fr 1fr 4.5rem"
        hide={[2, 3]}
        rows={rows.map(([t, cp, type, exp, risk]) => [
          t,
          cp,
          type,
          <span className="tabular-nums">{exp}</span>,
          <Chip tone={RISK_TONE[risk]}>{risk}</Chip>,
        ])}
      />
    </AppFrame>
  )
}

function ContractScreen() {
  const terms: [string, ReactNode, string?][] = [
    ['Counterparty', 'Kestrel Logistics Ltd', 'p.1'],
    ['Term', '3 years', '§3.1'],
    ['Auto-renewal', 'Rolling 12 months', '§14.2'],
    ['Notice period', '90 days, in writing', '§14.2'],
    ['Liability cap', '£2,000,000 aggregate', '§9.1'],
    [
      'Governing law',
      <span className="rounded-full border border-dashed border-border-strong px-2 py-px text-[10.5px] font-medium text-ink-muted">
        Not stated in document
      </span>,
    ],
  ]
  return (
    <AppFrame
      path="/contracts/kestrel-msa"
      active="contracts"
      title="Kestrel — Master Services Agreement"
      actions={<Chip tone="mango">Expiring soon</Chip>}
    >
      <div className="mb-2.5 flex gap-4 border-b border-border text-[11.5px]">
        {['Details', 'Obligations', 'Risk', 'Related', 'Activity'].map((t, i) => (
          <span
            key={t}
            className={`-mb-px pb-2 ${i === 0 ? 'border-b-2 border-mango-500 font-semibold text-ink' : 'text-ink-muted'}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="grid gap-2.5 lg:grid-cols-[1fr_1fr]">
        <Panel className="divide-y divide-border">
          {terms.map(([label, value, cite]) => (
            <div key={label} className="grid grid-cols-[6.5rem_1fr] items-center gap-2 px-3 py-2">
              <span className="text-[10.5px] font-medium text-ink-muted">{label}</span>
              <span className="flex min-w-0 items-center justify-between gap-2 text-[12px] font-medium text-ink">
                <span className="truncate">{value}</span>
                {cite && <Cite>{cite}</Cite>}
              </span>
            </div>
          ))}
        </Panel>
        {/* The source page, with the cited clause highlighted — what a citation opens. */}
        <Panel className="relative hidden overflow-hidden bg-neutral-50 p-4 lg:block">
          <div className="flex items-center justify-between font-mono text-[10px] text-ink-muted">
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" /> Kestrel_MSA_signed.pdf
            </span>
            <span>Page 11</span>
          </div>
          <div className="mt-3 space-y-1.5 font-serif text-[10.5px] leading-[1.55] text-ink-secondary">
            <p className="font-sans text-[10.5px] font-semibold text-ink">14. Term and Renewal</p>
            <p>14.1 This Agreement shall commence on the Effective Date and continue for the Initial Term.</p>
            <p className="-mx-1.5 rounded bg-mango-100 px-1.5 py-1 text-ink ring-1 ring-mango-300">
              14.2 This Agreement shall renew automatically for successive periods of twelve (12) months unless either
              party gives not less than ninety (90) days’ written notice…
            </p>
            <p>14.3 Notice under clause 14.2 shall be served in accordance with clause 22 (Notices).</p>
            <p className="opacity-60">14.4 Termination of this Agreement shall not affect any rights accrued…</p>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-neutral-50" />
        </Panel>
      </div>
    </AppFrame>
  )
}

function RenewalsScreen() {
  const rows: [string, string, string, string, string, number][] = [
    ['Haulage Agreement', 'Harbour Freight plc', '30 Nov 2026', 'Yes', '1 Sep 2026', -26],
    ['Consultancy Agreement', 'Pennine Advisory LLP', '31 Dec 2026', 'No', '1 Dec 2026', 65],
    ['Data Processing Agreement', 'Northwind Data Ltd', '14 Jan 2027', 'Yes', '16 Oct 2026', 19],
    ['Master Services Agreement', 'Kestrel Logistics Ltd', '3 Apr 2027', 'Yes', '3 Jan 2027', 98],
    ['Software Licence', 'Brightwater Systems', '1 Jul 2027', 'Yes', '2 Apr 2027', 187],
  ]
  return (
    <AppFrame path="/renewals" active="renewals" title="Renewals" actions={<Chip>400-day horizon</Chip>}>
      <MockTable
        columns={['Contract', 'Counterparty', 'Expiry', 'Auto-renew', 'Notice deadline']}
        template="1.5fr 1.3fr 0.9fr 0.7fr 1.2fr"
        mobile="1.3fr 1.2fr"
        hide={[1, 2, 3]}
        rows={rows.map(([t, cp, exp, auto, notice, days]) => [
          t,
          cp,
          <span className="tabular-nums">{exp}</span>,
          auto,
          <span className="flex items-center gap-1.5 tabular-nums">
            {notice}
            <Chip tone={days < 0 ? 'danger' : days < 30 ? 'mango' : 'neutral'}>{days < 0 ? 'passed' : `${days}d`}</Chip>
          </span>,
        ])}
      />
      <p className="mt-2.5 text-[11px] text-ink-muted">
        Dates are the ones written in each contract — nothing estimated.
      </p>
    </AppFrame>
  )
}

function SearchScreen() {
  return (
    <AppFrame path="/search" active="search" title="Search">
      <div className="flex items-center gap-2 rounded-lg border border-mango-300 bg-surface px-3 py-2.5 text-[12.5px] text-ink shadow-e1 ring-2 ring-mango-100">
        <Search className="h-3.5 w-3.5 text-ink-muted" />
        Which supplier contracts auto-renew before April?
      </div>
      <Panel className="mt-2.5 p-3.5">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-mango-800">
          <Sparkles className="h-3.5 w-3.5" /> Answer
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink">
          Two supplier contracts renew automatically before April: <b>Harbour Freight</b>’s haulage agreement on 30
          November <Cite>1</Cite> and <b>Northwind Data</b>’s DPA on 14 January <Cite>2</Cite>.
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-secondary">
          One more, Pennine Advisory, expires on 31 December but{' '}
          <b className="text-ink">doesn’t state a renewal term</b>, so it isn’t included.
        </p>
      </Panel>
      <p className="mb-1.5 mt-3 text-[10.5px] font-semibold uppercase tracking-[0.05em] text-ink-muted">Sources</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          ['1', 'Harbour Freight — Haulage Agreement', '§11.1, p.6'],
          ['2', 'Northwind Data — DPA', '§18.2, p.14'],
        ].map(([n, t, loc]) => (
          <Panel key={n} className="flex items-center gap-2.5 px-3 py-2">
            <Cite>{n}</Cite>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-medium text-ink">{t}</span>
              <span className="block font-mono text-[10px] text-ink-muted">{loc}</span>
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-muted" />
          </Panel>
        ))}
      </div>
    </AppFrame>
  )
}

function ReportingScreen() {
  const types: [string, number, number, number, number][] = [
    ['Supplier', 38, 14, 5, 1],
    ['Customer', 52, 9, 2, 0],
    ['DPA', 21, 6, 3, 1],
    ['Licence', 17, 4, 0, 0],
    ['Property', 8, 2, 1, 0],
  ]
  const cell = [
    'bg-success-100 text-success-700',
    'bg-mango-100 text-mango-800',
    'bg-danger-100 text-danger-700',
    'bg-danger-700 text-neutral-0',
  ]
  const missing: [string, number][] = [
    ['Governing law', 23],
    ['Liability cap', 17],
    ['Termination right', 11],
    ['Data-processing clause', 8],
  ]
  return (
    <AppFrame path="/reporting" active="reporting" title="Reporting">
      <div className="grid gap-2.5 lg:grid-cols-[1.2fr_1fr]">
        <Panel className="p-3.5">
          <p className="text-[12px] font-semibold text-ink">Risk by contract type</p>
          <div className="mt-2.5 grid grid-cols-[4.5rem_repeat(4,1fr)] gap-1 text-center text-[11px] tabular-nums">
            <span />
            {['Low', 'Med', 'High', 'Crit'].map((h) => (
              <span key={h} className="pb-0.5 text-[10px] font-semibold text-ink-muted">
                {h}
              </span>
            ))}
            {types.map(([t, ...counts]) => (
              <Row key={t} label={t}>
                {counts.map((n, i) => (
                  <span
                    key={i}
                    className={`rounded py-1.5 font-semibold ${n ? cell[i] : 'bg-surface-sunken text-ink-muted'}`}
                  >
                    {n}
                  </span>
                ))}
              </Row>
            ))}
          </div>
        </Panel>
        <Panel className="hidden p-3.5 sm:block">
          <p className="text-[12px] font-semibold text-ink">Key terms not stated</p>
          <p className="text-[10.5px] text-ink-muted">Contracts where the document is silent</p>
          <div className="mt-3 space-y-2.5">
            {missing.map(([label, n]) => (
              <div key={label}>
                <div className="flex justify-between text-[11px]">
                  <span className="text-ink-secondary">{label}</span>
                  <span className="font-semibold tabular-nums text-ink">{n}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-surface-sunken">
                  <div className="h-full rounded-full bg-mango-400" style={{ width: `${(n / 25) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppFrame>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <span className="truncate py-1.5 text-left text-ink-secondary">{label}</span>
      {children}
    </>
  )
}

function CounterpartiesScreen() {
  const rows: [string, number, string, number, number][] = [
    ['Kestrel Logistics Ltd', 4, '£1.8m', 3, 1],
    ['Northwind Data Ltd', 2, '£420k', 5, 1],
    ['Harbour Freight plc', 3, '£960k', 1, 2],
    ['Brightwater Systems', 1, '£186k', 0, 0],
    ['Pennine Advisory LLP', 2, '£75k', 2, 0],
    ['Calder Estates', 1, '£1.1m', 1, 0],
  ]
  return (
    <AppFrame path="/counterparties" active="counterparties" title="Counterparties">
      <MockTable
        columns={['Counterparty', 'Contracts', 'Total value', 'Open obligations', 'At risk']}
        template="1.6fr 0.7fr 0.9fr 1.1fr 0.7fr"
        mobile="1.5fr 0.8fr 0.7fr"
        hide={[1, 3]}
        rows={rows.map(([n, c, v, o, r]) => [
          n,
          <span className="tabular-nums">{c}</span>,
          <span className="tabular-nums">{v}</span>,
          <span className="tabular-nums">{o}</span>,
          r ? <Chip tone="danger">{r}</Chip> : <span className="text-ink-muted">—</span>,
        ])}
      />
    </AppFrame>
  )
}

function AdminScreen() {
  const log: [string, string, string, ReactNode][] = [
    ['09:42', 'Priya Shah', 'Approved', 'Kestrel MSA — renewal'],
    ['09:15', 'Tom Hale', 'Placed legal hold', 'Harbour Freight — Haulage'],
    ['Yesterday', 'Priya Shah', 'Corrected term', 'Northwind DPA · Liability cap'],
    ['Yesterday', 'MangoDocs', 'Flagged for retention', '3 contracts past retention'],
    ['24 Sep', 'Anna Reid', 'Invited user', 'j.cole@ — Viewer'],
    ['24 Sep', 'Tom Hale', 'Signed in', 'Two-factor verified'],
  ]
  return (
    <AppFrame path="/admin/audit-log" active="admin" title="Admin">
      <div className="mb-2.5 flex gap-4 overflow-hidden border-b border-border text-[11.5px]">
        {['Users', 'Retention', 'Audit log', 'Risk thresholds', 'Integrations'].map((t) => (
          <span
            key={t}
            className={`-mb-px shrink-0 pb-2 ${
              t === 'Audit log' ? 'border-b-2 border-mango-500 font-semibold text-ink' : 'text-ink-muted'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <MockTable
        columns={['When', 'Who', 'Action', 'Detail']}
        template="4.5rem 0.9fr 1fr 1.6fr"
        mobile="4.5rem 1fr 1fr"
        hide={[3]}
        rows={log.map(([when, who, action, detail]) => [
          <span className="font-normal tabular-nums text-ink-muted">{when}</span>,
          who,
          <span className="font-medium text-ink">{action}</span>,
          detail,
        ])}
      />
    </AppFrame>
  )
}

const SCREENS: Record<string, () => JSX.Element> = {
  home: HomeScreen,
  repository: RepositoryScreen,
  contract: ContractScreen,
  renewals: RenewalsScreen,
  search: SearchScreen,
  reporting: ReportingScreen,
  counterparties: CounterpartiesScreen,
  admin: AdminScreen,
}

export function TourScreen({ id }: { id: string }) {
  const Screen = SCREENS[id] ?? HomeScreen
  return <Screen />
}
