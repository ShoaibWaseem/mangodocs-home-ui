import { Logo } from '@/components/Logo'
import { APP_URL, CONTACT_EMAIL } from '@/config'

const LINKS = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#product', label: 'Product' },
  { href: '/#security', label: 'Security' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/privacy', label: 'Privacy' },
  { href: APP_URL, label: 'Sign in' },
]

export function Footer() {
  return (
    <footer className="bg-field pb-10 pt-20">
      <div className="container max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <p className="mt-4 text-[15px] text-ink-muted">Contract intelligence that never guesses.</p>
          <nav aria-label="Footer" className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} className="caps text-ink-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 grid gap-8 border-t border-hairline pt-10 sm:grid-cols-2">
          <div>
            <p className="caps text-ink-muted">Hosting</p>
            <p className="mt-3 text-sm text-ink-secondary">Google Cloud, London region</p>
          </div>
          <div className="sm:text-right">
            <p className="caps text-ink-muted">Contact</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-block text-sm text-ink-secondary hover:text-ink">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <p className="caps mt-10 border-t border-hairline pt-8 text-[10px] text-ink-muted">
          © {new Date().getFullYear()} MangoDocs. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
