import { ContractCard } from '@/components/ContractCard'
import { SectionHeading } from '@/components/Section'

export function Reading() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <SectionHeading
          eyebrow="What reading means"
          title="Every term, with the page it came from."
          lede="MangoDocs pulls out the terms that matter and links each one to its clause. When a contract doesn’t state something, it says so — it never fills the gap with a guess."
        />
        <ContractCard />
      </div>
    </section>
  )
}
