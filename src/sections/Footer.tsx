import { Logo } from '@/components/Logo'
import { APP_URL, CONTACT_EMAIL } from '@/config'

const LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#security', label: 'Security' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/privacy', label: 'Privacy' },
  { href: APP_URL, label: 'Sign in' },
  { href: `mailto:${CONTACT_EMAIL}`, label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-ink-muted">Contract intelligence that never guesses.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-secondary">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="container mt-8 max-w-6xl">
        <p className="border-t border-border pt-6 text-xs text-ink-muted">
          © {new Date().getFullYear()} MangoDocs. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
