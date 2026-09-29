import { ContractCard } from '@/components/ContractCard'
import { SectionHeading } from '@/components/Section'

export function Reading() {
  return (
    <section className="overflow-x-clip py-20 sm:py-28">
      {/* minmax(0, 1fr): let the card shrink to a phone's width instead of widening the page. */}
      <div className="container grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <SectionHeading
          eyebrow="Extraction"
          title="Every term, with the page it came from."
          lede="MangoDocs extracts the key terms from each contract and links every one to its clause. If a contract doesn’t state a term, it is shown as not stated rather than guessed."
        />
        <ContractCard />
      </div>
    </section>
  )
}
