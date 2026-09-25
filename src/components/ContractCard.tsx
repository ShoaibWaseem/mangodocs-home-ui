import { FileText, Quote } from 'lucide-react'

// Illustrative product mock for the hero. Deliberately shows a "Not stated"
// term — the never-guess behaviour is the pitch, so the picture should prove it.
const TERMS: { label: string; value: string; cite?: string; missing?: boolean }[] = [
  { label: 'Counterparty', value: 'Kestrel Logistics Ltd', cite: 'p.1' },
  { label: 'Auto-renewal', value: '12 months, unless notice served', cite: '§14.2' },
  { label: 'Notice deadline', value: '3 Jan 2027', cite: '§14.3' },
  { label: 'Liability cap', value: '£2,000,000 aggregate', cite: '§9.1' },
  { label: 'Governing law', value: 'Not stated in document', missing: true },
]

export function ContractCard() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-mango-100 via-mango-50 to-transparent opacity-80 blur-2xl"
      />
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-e3">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-mango-50 text-mango-800">
            <FileText className="h-[18px] w-[18px]" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">Kestrel — Master Services Agreement</p>
            <p className="truncate text-xs text-ink-muted">Google Drive · Supplier contracts / 2025</p>
          </div>
          <span className="ml-auto shrink-0 rounded-full bg-mango-100 px-2.5 py-1 text-xs font-semibold text-mango-800">
            Expiring soon
          </span>
        </div>

        <dl className="divide-y divide-border">
          {TERMS.map((t) => (
            <div
              key={t.label}
              className="grid grid-cols-[7.5rem_1fr] items-center gap-3 px-5 py-3 sm:grid-cols-[9rem_1fr]"
            >
              <dt className="text-xs font-medium text-ink-muted">{t.label}</dt>
              <dd className="flex min-w-0 items-center justify-between gap-2">
                {t.missing ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border-strong px-2.5 py-0.5 text-xs font-medium text-ink-muted">
                    {t.value}
                  </span>
                ) : (
                  <span className="truncate text-sm font-medium text-ink">{t.value}</span>
                )}
                {t.cite && (
                  <span className="shrink-0 rounded bg-surface-sunken px-1.5 py-0.5 font-mono text-[11px] text-ink-secondary">
                    {t.cite}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-border bg-surface-sunken px-5 py-4">
          <div className="flex gap-3">
            <Quote className="mt-0.5 h-4 w-4 shrink-0 text-mango-700" />
            <p className="font-serif text-[0.9375rem] italic leading-relaxed text-ink-secondary">
              “This Agreement shall renew automatically for successive periods of twelve (12) months unless either party
              gives not less than ninety (90) days’ written notice…”
            </p>
          </div>
          <p className="mt-2 pl-7 font-mono text-[11px] text-ink-muted">Source · §14.2, page 11</p>
        </div>
      </div>
    </div>
  )
}
