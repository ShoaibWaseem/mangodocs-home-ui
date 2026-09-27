import type { CSSProperties, ReactNode } from 'react'
import {
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  GitCompare,
  Home,
  Inbox,
  Library,
  ListChecks,
  RefreshCw,
  Search,
  Settings,
  Signature,
  type LucideIcon,
} from 'lucide-react'
import { LogoMark } from '@/components/Logo'

// The real app's sidebar (mangodocs-ui/src/app/nav.ts), so every mock sits in
// the navigation a customer will actually see. Keep the two in step by hand.
type NavId = 'home' | 'contracts' | 'search' | 'obligations' | 'renewals' | 'counterparties' | 'reporting' | 'admin'

const NAV: { section: string | null; items: { id: NavId | string; label: string; icon: LucideIcon }[] }[] = [
  {
    section: null,
    items: [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'contracts', label: 'Contracts', icon: FileText },
      { id: 'search', label: 'Search', icon: Search },
    ],
  },
  {
    section: 'In flight',
    items: [
      { id: 'requests', label: 'Requests', icon: Inbox },
      { id: 'reviews', label: 'My reviews', icon: GitCompare },
      { id: 'approvals', label: 'Approvals', icon: CheckCircle2 },
      { id: 'signatures', label: 'Signatures', icon: Signature },
    ],
  },
  {
    section: 'In force',
    items: [
      { id: 'obligations', label: 'Obligations', icon: ListChecks },
      { id: 'renewals', label: 'Renewals', icon: RefreshCw },
    ],
  },
  {
    section: 'Resources',
    items: [
      { id: 'counterparties', label: 'Counterparties', icon: Building2 },
      { id: 'library', label: 'Templates & clauses', icon: Library },
      { id: 'reporting', label: 'Reporting', icon: BarChart3 },
    ],
  },
]

export function AppFrame({
  path,
  active,
  title,
  actions,
  children,
}: {
  path: string
  active: NavId
  title: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border-strong/70 bg-surface shadow-e3 ring-1 ring-black/[0.02]">
      {/* Browser chrome: just enough to read as "a real web app", no more. */}
      <div className="flex h-9 items-center gap-3 border-b border-border bg-surface-sunken px-3.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
        </div>
        <div className="mx-auto flex h-6 w-full min-w-0 max-w-xs items-center justify-center rounded-md bg-surface px-3 font-mono text-[11px] text-ink-muted ring-1 ring-border">
          <span className="truncate">app.mangodocs.ai{path}</span>
        </div>
        <div className="w-[42px]" aria-hidden="true" />
      </div>

      <div className="flex h-[25rem] sm:h-[28rem]">
        <aside className="hidden w-44 shrink-0 flex-col border-r border-border bg-background px-2.5 pb-2.5 pt-3 md:flex">
          <div className="mb-2.5 flex items-center gap-1.5 px-2">
            <LogoMark className="h-4 w-4" />
            <span className="text-[13px] font-bold tracking-tight text-ink">MangoDocs</span>
          </div>
          {NAV.map((group, gi) => (
            <div key={gi} className={gi ? 'mt-2.5' : undefined}>
              {group.section && (
                <p className="mb-0.5 px-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                  {group.section}
                </p>
              )}
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-2 rounded-md px-2 py-[3px] text-[12px] ${
                    item.id === active ? 'bg-mango-50 font-semibold text-mango-800' : 'text-ink-secondary'
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
              ))}
            </div>
          ))}
          <div
            className={`mt-auto flex items-center gap-2 rounded-md px-2 py-[3px] text-[12px] ${
              active === 'admin' ? 'bg-mango-50 font-semibold text-mango-800' : 'text-ink-secondary'
            }`}
          >
            <Settings className="h-3.5 w-3.5" />
            Admin
          </div>
        </aside>

        <div className="relative min-w-0 flex-1 overflow-hidden bg-background">
          {/* A screen taller than the frame fades out, like a cropped screenshot, rather than being cut. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-background" />
          <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-4 sm:px-5">
            <h4 className="truncate text-[15px] font-semibold tracking-tight text-ink">{title}</h4>
            {actions}
          </div>
          <div className="px-4 pb-4 sm:px-5">{children}</div>
        </div>
      </div>
    </div>
  )
}

// Small shared pieces, sized for the mock (a real screen, shrunk ~80%).

type Tone = 'neutral' | 'mango' | 'danger' | 'success' | 'info'

const TONES: Record<Tone, string> = {
  neutral: 'bg-surface-sunken text-ink-secondary',
  mango: 'bg-mango-100 text-mango-800',
  danger: 'bg-danger-100 text-danger-700',
  success: 'bg-success-100 text-success-700',
  info: 'bg-info-100 text-info-700',
}

export function Chip({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${TONES[tone]}`}
    >
      {children}
    </span>
  )
}

export function Cite({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 rounded bg-surface-sunken px-1 py-px font-mono text-[10px] text-ink-secondary">
      {children}
    </span>
  )
}

export function Panel({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-lg border border-border bg-surface shadow-e1 ${className}`}>{children}</div>
}

// `hide` lists column indexes dropped below `sm`, with `mobile` as the
// template for what's left — a phone shows fewer columns, never a squashed table.
export function MockTable({
  columns,
  rows,
  template,
  mobile,
  hide = [],
}: {
  columns: string[]
  rows: ReactNode[][]
  template: string
  mobile: string
  hide?: number[]
}) {
  const style = { '--t': template, '--tm': mobile } as CSSProperties
  const grid = 'grid gap-3 [grid-template-columns:var(--tm)] sm:[grid-template-columns:var(--t)]'
  const cell = (j: number) => (hide.includes(j) ? 'hidden sm:block' : '')
  return (
    <Panel className="overflow-hidden">
      <div
        style={style}
        className={`${grid} border-b border-border bg-surface-sunken/60 px-3.5 py-2 text-[10.5px] font-semibold uppercase tracking-[0.05em] text-ink-muted`}
      >
        {columns.map((c, j) => (
          <span key={j} className={`truncate ${cell(j)}`}>
            {c}
          </span>
        ))}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          style={style}
          className={`${grid} items-center border-b border-border px-3.5 py-2.5 text-[12px] text-ink-secondary last:border-b-0`}
        >
          {r.map((c, j) => (
            <div key={j} className={`min-w-0 truncate ${j === 0 ? 'font-medium text-ink' : ''} ${cell(j)}`}>
              {c}
            </div>
          ))}
        </div>
      ))}
    </Panel>
  )
}
