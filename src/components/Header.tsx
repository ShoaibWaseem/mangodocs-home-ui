import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ButtonLink } from '@/components/Button'
import { APP_URL, DEMO_URL } from '@/config'

const NAV = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#product', label: 'Product' },
  { href: '#security', label: 'Security' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled || open ? 'border-b border-border bg-background/90 backdrop-blur' : 'border-b border-transparent'
      }`}
    >
      <div className="container flex h-16 max-w-6xl items-center justify-between">
        <a href="#top" aria-label="MangoDocs home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-ink-secondary hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={APP_URL} className="text-sm font-semibold text-ink-secondary hover:text-ink">
            Sign in
          </a>
          <ButtonLink href={DEMO_URL} className="h-9 px-4 text-sm">
            Book a demo
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav
        data-open={open || undefined}
        className="mobile-menu container max-w-6xl pb-6"
        aria-label="Mobile"
        id="mobile-menu"
      >
        <ul className="flex flex-col gap-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2.5 text-base font-medium text-ink-secondary hover:bg-surface-sunken"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          <ButtonLink href={DEMO_URL}>Book a demo</ButtonLink>
          <ButtonLink href={APP_URL} variant="secondary">
            Sign in
          </ButtonLink>
        </div>
      </nav>
    </header>
  )
}
