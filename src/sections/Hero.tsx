import { ArrowRight, Check } from 'lucide-react'
import { ButtonLink } from '@/components/Button'
import { MangoAtom } from '@/components/MangoAtom'
import { DEMO_URL } from '@/config'

const POINTS = ['Google Drive & SharePoint', 'Nothing moved or migrated', 'Every fact cited']

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container grid max-w-6xl items-center gap-14 pb-20 pt-12 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-secondary shadow-e1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Contract intelligence for legal &amp; ops teams
          </p>
          <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl">
            Contract intelligence that <span className="font-serif font-semibold italic text-mango-700">never</span>{' '}
            guesses.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-secondary">
            MangoDocs connects to the folders where your contracts are stored. It reads each contract, tracks renewals
            and obligations, and links every fact to its clause. If a contract doesn’t state something, MangoDocs says
            so.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={DEMO_URL}>
              Book a demo <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-ink-secondary">
                <Check className="h-4 w-4 text-success-500" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <MangoAtom />
      </div>
    </section>
  )
}
