import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/sections/Footer'
import { CONTACT_EMAIL } from '@/config'

// Covers mangodocs.ai (this site and its interest form) only — customers'
// contract data is governed by their own agreement. Keep every statement
// literally true: if analytics, cookies or a new processor are ever added,
// this page changes in the same commit.
const UPDATED = '27 September 2026'

function H({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 text-xl font-semibold tracking-tight text-ink">{children}</h2>
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 leading-relaxed text-ink-secondary">{children}</p>
}

const Mail = () => (
  <a
    href={`mailto:${CONTACT_EMAIL}`}
    className="font-medium text-primary-text underline decoration-mango-300 underline-offset-4 hover:decoration-mango-700"
  >
    {CONTACT_EMAIL}
  </a>
)

export function Privacy() {
  return (
    <div id="top">
      <Header />
      <main className="container max-w-3xl py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary-text">Privacy</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Privacy notice</h1>
        <p className="mt-4 text-sm text-ink-muted">Last updated {UPDATED}</p>

        <P>
          This notice explains what happens to personal information you share with MangoDocs through this website,
          mangodocs.ai. It’s short because we collect very little. If your organisation uses the MangoDocs application,
          the data in it is covered by your organisation’s agreement with us, not by this notice.
        </P>

        <H>What we collect</H>
        <P>
          Only what you type into the “Request a demo” form: your name, work email and company, plus your role and a
          message if you add them.
        </P>
        <P>
          Like any website, the services that host it record technical information such as IP addresses and browser
          types in their logs, to keep the site secure and working.
        </P>

        <H>What we don’t do</H>
        <P>
          This site sets no cookies and runs no analytics, advertising or tracking scripts. Its fonts are served from
          our own site, so visiting it doesn’t send your details to a font provider either.
        </P>

        <H>Why we use it</H>
        <P>
          To reply to your enquiry and arrange a demo if you want one. Our lawful basis is legitimate interests: you
          asked us to get in touch, and we use your details for nothing else. We never sell them or add you to a mailing
          list.
        </P>

        <H>Where it’s kept, and who else handles it</H>
        <P>
          Form submissions are stored in our database in Google Cloud’s London region. The website itself is delivered
          by Google’s Firebase Hosting. Google acts as our processor for both, under its data-processing terms.
        </P>

        <H>How long we keep it</H>
        <P>For as long as we need it to follow up on your enquiry. Ask us to delete it at any time and we will.</P>

        <H>Your rights</H>
        <P>
          Under UK data-protection law you can ask to see the information we hold about you, have it corrected or
          deleted, or object to how we use it. Email <Mail /> and a person will reply. If you’re unhappy with how we’ve
          handled your information, you can complain to the Information Commissioner’s Office at{' '}
          <a
            href="https://ico.org.uk/make-a-complaint/"
            className="font-medium text-primary-text underline decoration-mango-300 underline-offset-4 hover:decoration-mango-700"
          >
            ico.org.uk
          </a>
          .
        </P>

        <H>Contact</H>
        <P>
          Questions about this notice or your information: <Mail />.
        </P>
      </main>
      <Footer />
    </div>
  )
}
