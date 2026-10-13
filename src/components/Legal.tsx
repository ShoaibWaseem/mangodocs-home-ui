import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/sections/Footer'
import { COMPANY, CONTACT_EMAIL } from '@/config'

// Shared layout and type for the legal pages (/privacy, /terms).

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <div id="top">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="container max-w-3xl pb-24 pt-32 focus:outline-none sm:pb-32 sm:pt-40">
        <p className="caps text-mango-800">{eyebrow}</p>
        <h1 className="display-1 mt-6 text-ink">{title}</h1>
        <p className="caps mt-8 text-ink-muted">Last updated {updated}</p>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export function H({ children }: { children: ReactNode }) {
  return <h2 className="display-3 mt-14 text-ink">{children}</h2>
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{children}</p>
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-ink underline decoration-mango-500 underline-offset-4 hover:decoration-ink">
      {children}
    </a>
  )
}

export const Mail = () => <A href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</A>

// "MangoDocs" on these pages means this company.
export const CompanyIdentity = () => (
  <>
    {COMPANY.legalName}, a company registered in England and Wales (company number {COMPANY.number}), whose registered
    office is at {COMPANY.address}
  </>
)
