import { Band, SectionHeading } from '@/components/Section'

// Keep every claim here literally true of the deployed system. Deliberately
// no hosting locations or provider names on the public site: those are
// shared with prospects in a security review, not advertised.
const ITEMS = [
  {
    title: 'Your files stay untouched',
    body: 'MangoDocs reads from Google Drive and SharePoint. It never moves, edits or deletes your existing files.',
  },
  {
    title: 'Encrypted throughout',
    body: 'Contract data is encrypted in transit and at rest.',
  },
  {
    title: 'Two-factor sign-in',
    body: 'Authenticator-app (TOTP) two-factor authentication, plus role-based access within your organisation.',
  },
  {
    title: 'Full audit trail',
    body: 'Sign-ins, approvals, holds and retention decisions are logged with who, when and why.',
  },
]

export function Security() {
  return (
    <Band id="security" tone="stone">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          eyebrow="Security"
          title="How your contracts are protected."
          lede="Your contracts stay in your own Drive or SharePoint. MangoDocs reads them there."
        />
        <ul className="lg:pt-10">
          {ITEMS.map((item) => (
            <li key={item.title} className="border-t border-hairline py-7 last:border-b">
              <h3 className="caps text-ink">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Band>
  )
}
