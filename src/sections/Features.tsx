import { Band, Numbered, SectionHeading } from '@/components/Section'

const FEATURES = [
  {
    title: 'Renewal tracking',
    body: 'Each expiry is tracked from 400 days out, using the date extracted from the contract.',
  },
  {
    title: 'Obligations and due dates',
    body: 'Obligations from all your contracts in one list, each with a confirmed due date and an overdue filter.',
  },
  {
    title: 'Explainable risk flags',
    body: 'Each flag points to a specific finding, such as a missing liability cap, no termination right or no data-processing clause.',
  },
  {
    title: 'Questions in plain English',
    body: 'Ask “Which contracts expire in the next 90 days?” and the answer cites the contracts it used, or says there are none.',
  },
  {
    title: 'Approval routing',
    body: 'Set a rule such as “supplier agreements over £250k need Finance” and matching contracts go to the right approvers.',
  },
  {
    title: 'Drafting from templates',
    body: 'Start new contracts from your approved templates and clause wording.',
  },
  {
    title: 'Audit trail',
    body: 'Every approval, signature, legal hold and retention decision is logged with who, when and why.',
  },
  {
    title: 'Retention & legal holds',
    body: 'Contracts past their retention period are flagged for review, not deleted automatically. A legal hold stays in place until someone releases it.',
  },
]

export function Features() {
  return (
    <Band id="features">
      <SectionHeading
        eyebrow="What it does"
        title="Renewals, obligations, risk and approvals, all from the same extracted terms."
      />
      <div className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Numbered key={f.title} n={i + 1} title={f.title}>
            {f.body}
          </Numbered>
        ))}
      </div>
    </Band>
  )
}
