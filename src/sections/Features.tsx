import {
  CalendarClock,
  ClipboardCheck,
  FilePen,
  GitPullRequestArrow,
  History,
  Lock,
  MessageSquareText,
  TriangleAlert,
} from 'lucide-react'
import { SectionHeading } from '@/components/Section'

const FEATURES = [
  {
    icon: CalendarClock,
    title: 'Renewals, on your timeline',
    body: 'A 400-day runway before every expiry, computed from the real extracted date — not a spreadsheet that went stale.',
  },
  {
    icon: ClipboardCheck,
    title: 'Obligations with real due dates',
    body: 'Every promise across every contract in one list, with a human-confirmed due date and an overdue filter that means something.',
  },
  {
    icon: TriangleAlert,
    title: 'Risk you can explain',
    body: 'No black-box score. Every flag traces to a real fact — a missing liability cap, no termination right, no data-processing clause.',
  },
  {
    icon: MessageSquareText,
    title: 'Ask in plain English',
    body: '“Which contracts expire in the next 90 days?” Every answer cites the contracts it came from — or says there aren’t any.',
  },
  {
    icon: GitPullRequestArrow,
    title: 'Approvals that route themselves',
    body: 'Set a rule once — “supplier agreements over £250k need Finance” — and the right contracts reach the right people.',
  },
  {
    icon: FilePen,
    title: 'Drafting from your own templates',
    body: 'Fill real values into your approved wording. Nothing invented, nothing left half-filled.',
  },
  {
    icon: History,
    title: 'An audit trail that’s real',
    body: 'Every approval, signature, hold and retention decision logged with who, when and why — at the moment it happened.',
  },
  {
    icon: Lock,
    title: 'Retention & legal holds',
    body: 'Contracts past retention are flagged, never auto-deleted. A legal hold overrides everything until a person releases it.',
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-border bg-surface py-20 sm:py-28">
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="What it does"
          title="Reads contracts the way a lawyer would, at the speed a computer can."
        />
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-mango-50 text-mango-800 ring-1 ring-inset ring-mango-100">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-secondary">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
