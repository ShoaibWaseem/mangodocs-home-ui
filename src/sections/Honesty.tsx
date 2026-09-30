import { Band, Eyebrow } from '@/components/Section'
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
    <Band tone="stone">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Eyebrow>Why MangoDocs</Eyebrow>
          <h2 className="display-2 mt-6 text-ink">
            A contract platform that’s <span className="text-mango-700">honest</span> about what it knows.
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            Many contract AI tools give you a summary and expect you to trust it. MangoDocs shows its sources: each fact
            links to the document it came from, each risk flag to the clause behind it, and each action to the person
            who took it.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            If a document doesn’t state something, MangoDocs says so rather than filling the gap.
          </p>
        </div>

        <div ref={ref} data-visible={inView || undefined} className="self-center">
          <div className="caps hidden grid-cols-[1fr_1fr_1fr] gap-4 pb-4 text-ink-muted sm:grid">
            <span>Question</span>
            <span>A guessing tool</span>
            <span className="text-mango-800">MangoDocs</span>
          </div>
          {COMPARE.map((row, i) => (
            <div
              key={row.question}
              className="grid gap-2 border-t border-hairline py-6 text-[15px] last:border-b sm:grid-cols-[1fr_1fr_1fr] sm:gap-4"
            >
              <span className="text-ink">{row.question}</span>
              {/* Phones stack each row, so the column headings become inline labels. */}
              <span className="text-ink-muted">
                <span className="caps mr-3 text-[10px] sm:hidden">Guess</span>
                <span style={{ transitionDelay: `${i * ROW_STAGGER_MS}ms` }} className="strike">
                  {row.guess}
                </span>
              </span>
              <span
                style={{ transitionDelay: `${i * ROW_STAGGER_MS + ANSWER_AFTER_MS}ms` }}
                className="honest-answer font-medium text-ink"
              >
                <span className="caps mr-3 text-[10px] text-mango-800 sm:hidden">MangoDocs</span>
                {row.honest}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Band>
  )
}
