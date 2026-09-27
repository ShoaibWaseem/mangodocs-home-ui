import { Eye, KeyRound, MapPin, ScrollText } from 'lucide-react'
import { SectionHeading } from '@/components/Section'

// Keep every claim here literally true of the deployed system — see
// CLAUDE.md's Gemini/Vertex section before adding anything about where AI
// processing happens (it is not currently EU-resident).
const ITEMS = [
  {
    icon: Eye,
    title: 'Your files stay untouched',
    body: 'MangoDocs reads from Google Drive and SharePoint. It never moves, edits or deletes your existing files.',
  },
  {
    icon: MapPin,
    title: 'Hosted in London',
    body: 'The application and its database run in Google Cloud’s London region.',
  },
  {
    icon: KeyRound,
    title: 'Two-factor sign-in',
    body: 'Authenticator-app (TOTP) two-factor authentication, plus role-based access within your organisation.',
  },
  {
    icon: ScrollText,
    title: 'Full audit trail',
    body: 'Sign-ins, approvals, holds and retention decisions are logged with who, when and why.',
  },
]

export function Security() {
  return (
    <section id="security" className="scroll-mt-16 border-t border-border bg-surface py-20 sm:py-28">
      <div className="container max-w-6xl">
        <SectionHeading
          eyebrow="Security"
          title="Built for documents that matter."
          lede="Your contracts stay where they are. MangoDocs just reads them."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex gap-4 rounded-lg border border-border p-6">
              <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-mango-700" />
              <div>
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-secondary">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
