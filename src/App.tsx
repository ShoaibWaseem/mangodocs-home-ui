import { Header } from '@/components/Header'
import { Hero } from '@/sections/Hero'
import { Problem } from '@/sections/Problem'
import { HowItWorks } from '@/sections/HowItWorks'
import { Features } from '@/sections/Features'
import { Honesty } from '@/sections/Honesty'
import { ProductTour } from '@/sections/ProductTour'
import { Security } from '@/sections/Security'
import { InterestForm } from '@/sections/InterestForm'
import { Footer } from '@/sections/Footer'

export function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Honesty />
        <ProductTour />
        <Security />
        <InterestForm />
      </main>
      <Footer />
    </div>
  )
}
