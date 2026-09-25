import { Logo } from '@/components/Logo'
import { APP_URL, CONTACT_EMAIL } from '@/config'

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-ink-muted">Contract intelligence that never guesses.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-secondary">
          <a href="#features" className="hover:text-ink">
            Features
          </a>
          <a href="#security" className="hover:text-ink">
            Security
          </a>
          <a href={APP_URL} className="hover:text-ink">
            Sign in
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">
            Contact
          </a>
        </div>
      </div>
      <div className="container mt-8 max-w-6xl">
        <p className="text-xs text-ink-muted">© {new Date().getFullYear()} MangoDocs. All rights reserved.</p>
      </div>
    </footer>
  )
}
