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
    title: 'Renewal tracking',
    body: 'Each expiry is tracked from 400 days out, using the date extracted from the contract.',
  },
  {
    icon: ClipboardCheck,
    title: 'Obligations and due dates',
    body: 'Obligations from all your contracts in one list, each with a confirmed due date and an overdue filter.',
  },
  {
    icon: TriangleAlert,
    title: 'Explainable risk flags',
    body: 'Each flag points to a specific finding, such as a missing liability cap, no termination right or no data-processing clause.',
  },
  {
    icon: MessageSquareText,
    title: 'Questions in plain English',
    body: 'Ask “Which contracts expire in the next 90 days?” and the answer cites the contracts it used, or says there are none.',
  },
  {
    icon: GitPullRequestArrow,
    title: 'Approval routing',
    body: 'Set a rule such as “supplier agreements over £250k need Finance” and matching contracts go to the right approvers.',
  },
  {
    icon: FilePen,
    title: 'Drafting from templates',
    body: 'Start new contracts from your approved templates and clause wording.',
  },
  {
    icon: History,
    title: 'Audit trail',
    body: 'Every approval, signature, legal hold and retention decision is logged with who, when and why.',
  },
  {
    icon: Lock,
    title: 'Retention & legal holds',
    body: 'Contracts past their retention period are flagged for review, not deleted automatically. A legal hold stays in place until someone releases it.',
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-border bg-surface py-20 sm:py-28">
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="What it does"
          title="Renewals, obligations, risk and approvals, all from the same extracted terms."
        />
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            // Phones: icon beside the text, so eight features don't become one very long column.
            <div key={f.title} className="flex gap-4 sm:block">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-mango-50 text-mango-800 ring-1 ring-inset ring-mango-100">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="mt-2 font-semibold text-ink sm:mt-4">{f.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-secondary">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
