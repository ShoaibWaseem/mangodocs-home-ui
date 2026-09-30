import { ButtonLink } from '@/components/Button'
import { MangoAtom } from '@/components/MangoAtom'
import { DEMO_URL } from '@/config'
import { Meta } from '@/components/Section'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 text-neutral-50"
    >
      <div className="container grid max-w-6xl items-center gap-12 pb-20 pt-32 sm:pb-28 sm:pt-40 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">
          <Meta items={['Contract intelligence', 'For legal & ops teams']} className="text-white/55" />
          <h1 className="display-1 mt-8">
            Contract intelligence that <span className="text-mango-400">never</span> guesses.
          </h1>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            MangoDocs connects to the folders where your contracts are stored. It reads each contract, tracks renewals
            and obligations, and links every fact to its clause. If a contract doesn’t state something, MangoDocs says
            so.
          </p>
          <Meta items={['Google Drive', 'SharePoint', 'Every fact cited']} className="mt-10 text-white" />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={DEMO_URL} variant="mango">
              Request a demo <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink href="#how-it-works" variant="ghost-light">
              How it works
            </ButtonLink>
          </div>
          <p className="caps mt-6 text-[10px] text-white/55">Nothing moved or migrated</p>
        </div>
        <div className="lg:order-1">
          <MangoAtom />
        </div>
      </div>
    </section>
  )
}
