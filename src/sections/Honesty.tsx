import { Eyebrow } from '@/components/Section'
import { useInViewOnce } from '@/lib/useInViewOnce'

const COMPARE = [
  { question: 'Governing law?', guess: 'England & Wales', honest: 'Not stated in document' },
  { question: 'Liability cap?', guess: '“Standard” cap applies', honest: '£2,000,000 · §9.1, p.7' },
  { question: 'Risk rating?', guess: '72% confidence', honest: 'High: no termination right found' },
]

// Per row: the strike draws (400ms), then the honest answer fades in.
const ROW_STAGGER_MS = 80
const ANSWER_AFTER_MS = 400

export function Honesty() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>()

  return (
    <section className="bg-neutral-900 py-20 text-neutral-100 sm:py-28">
      <div className="container grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>
            <span className="text-mango-400">Why MangoDocs</span>
          </Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A contract platform that’s <span className="font-serif italic text-mango-400">honest</span> about what it
            knows.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">
            Many contract AI tools give you a summary and expect you to trust it. MangoDocs shows its sources: each fact
            links to the document it came from, each risk flag to the clause behind it, and each action to the person
            who took it.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-300">
            If a document doesn’t state something, MangoDocs says so rather than filling the gap.
          </p>
        </div>

        <div
          ref={ref}
          data-visible={inView || undefined}
          className="overflow-hidden rounded-lg border border-neutral-800"
        >
          <div className="hidden grid-cols-[1fr_1fr_1fr] bg-neutral-800/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-neutral-400 sm:grid">
            <span>Question</span>
            <span>A guessing tool</span>
            <span className="text-mango-400">MangoDocs</span>
          </div>
          {COMPARE.map((row, i) => (
            <div
              key={row.question}
              className="grid gap-1.5 border-t border-neutral-800 px-4 py-4 text-sm max-sm:[&:nth-child(2)]:border-t-0 sm:grid-cols-[1fr_1fr_1fr] sm:gap-3 sm:px-5"
            >
              <span className="font-medium text-neutral-100">{row.question}</span>
              {/* Phones stack each row, so the column headings become inline labels. */}
              <span className="text-neutral-400">
                <span className="mr-2 text-xs font-semibold uppercase tracking-[0.06em] text-neutral-500 sm:hidden">
                  Guess
                </span>
                <span style={{ transitionDelay: `${i * ROW_STAGGER_MS}ms` }} className="strike">
                  {row.guess}
                </span>
              </span>
              <span
                style={{ transitionDelay: `${i * ROW_STAGGER_MS + ANSWER_AFTER_MS}ms` }}
                className="honest-answer font-medium text-neutral-50"
              >
                <span className="mr-2 text-xs font-semibold uppercase tracking-[0.06em] text-mango-400 sm:hidden">
                  MangoDocs
                </span>
                {row.honest}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
