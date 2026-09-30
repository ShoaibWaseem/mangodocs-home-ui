import { ContractCard } from '@/components/ContractCard'
import { Band, SectionHeading } from '@/components/Section'

export function Reading() {
  return (
    <Band className="overflow-x-clip">
      {/* minmax(0, 1fr): let the card shrink to a phone's width instead of widening the page. */}
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
        <SectionHeading
          eyebrow="Extraction"
          title="Every term, with the page it came from."
          lede="MangoDocs extracts the key terms from each contract and links every one to its clause. If a contract doesn’t state a term, it is shown as not stated rather than guessed."
        />
        <ContractCard />
      </div>
    </Band>
  )
}
