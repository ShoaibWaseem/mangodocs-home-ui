import { Eyebrow } from '@/components/Section'
import { useInViewOnce } from '@/lib/useInViewOnce'

const COMPARE = [
  { question: 'Governing law?', guess: 'England & Wales', honest: 'Not stated in document' },
  { question: 'Liability cap?', guess: '“Standard” cap applies', honest: '£2,000,000 · §9.1, p.7' },
  { question: 'Risk rating?', guess: '72% confidence', honest: 'High — no termination right found' },
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
            Most contract-AI tools hand you a summary and ask you to trust it. MangoDocs shows its work: every fact
            traces to the document it came from, every risk flag to the clause behind it, every action to the person who
            took it.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-300">
            And when a document genuinely doesn’t say something, MangoDocs tells you — instead of quietly filling the
            gap with something plausible.
          </p>
        </div>

        <div
          ref={ref}
          data-visible={inView || undefined}
          className="overflow-hidden rounded-lg border border-neutral-800"
        >
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-neutral-800/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-neutral-400 sm:px-5">
            <span>Question</span>
            <span>A guessing tool</span>
            <span className="text-mango-400">MangoDocs</span>
          </div>
          {COMPARE.map((row, i) => (
            <div
              key={row.question}
              className="grid grid-cols-[1fr_1fr_1fr] gap-3 border-t border-neutral-800 px-4 py-4 text-sm sm:px-5"
            >
              <span className="font-medium text-neutral-100">{row.question}</span>
              <span className="relative text-neutral-400">
                {row.guess}
                <span
                  aria-hidden="true"
                  style={{ transitionDelay: `${i * ROW_STAGGER_MS}ms` }}
                  className="strike-overlay absolute inset-0 line-through decoration-neutral-500"
                >
                  {row.guess}
                </span>
              </span>
              <span
                style={{ transitionDelay: `${i * ROW_STAGGER_MS + ANSWER_AFTER_MS}ms` }}
                className="honest-answer font-medium text-neutral-50"
              >
                {row.honest}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
