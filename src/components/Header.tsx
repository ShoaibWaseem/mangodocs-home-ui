import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ButtonLink } from '@/components/Button'
import { APP_URL, DEMO_URL } from '@/config'

const NAV = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#product', label: 'Product' },
  { href: '/#security', label: 'Security' },
  { href: '/#faq', label: 'FAQ' },
]

// Over the homepage's dark hero the header is transparent with light text;
// once the hero scrolls away (or the menu opens) it becomes a paper bar.
// Pages without a dark hero pass overDark={false} and are always the bar.
export function Header({ overDark = false }: { overDark?: boolean }) {
  const [open, setOpen] = useState(false)
  const [pastHero, setPastHero] = useState(!overDark)

  useEffect(() => {
    if (!overDark) return
    const hero = document.getElementById('hero')
    const onScroll = () => setPastHero(window.scrollY > (hero?.offsetHeight ?? 600) - 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [overDark])

  const light = !pastHero && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        light ? 'bg-transparent text-neutral-50' : 'border-b border-hairline bg-paper text-ink'
      }`}
    >
      <div className="container flex h-16 max-w-6xl items-center justify-between">
        <a href="/#top" aria-label="MangoDocs home">
          <Logo inverted={light} />
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`caps transition-colors ${light ? 'text-white/70 hover:text-white' : 'text-ink-muted hover:text-ink'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-7 md:flex">
          <a
            href={APP_URL}
            className={`caps transition-colors ${light ? 'text-white/70 hover:text-white' : 'text-ink-muted hover:text-ink'}`}
          >
            Sign in
          </a>
          <ButtonLink href={DEMO_URL} variant={light ? 'mango' : 'dark'} className="h-10 px-5">
            Request a demo
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
        </button>
      </div>

      <nav
        data-open={open || undefined}
        className="mobile-menu container max-w-6xl pb-8"
        aria-label="Mobile"
        id="mobile-menu"
      >
        <ul className="border-t border-hairline">
          {NAV.map((item) => (
            <li key={item.href} className="border-b border-hairline">
              <a href={item.href} onClick={() => setOpen(false)} className="caps block py-4 text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3">
          <ButtonLink href={DEMO_URL} onClick={() => setOpen(false)}>
            Request a demo →
          </ButtonLink>
          <a href={APP_URL} className="caps py-3 text-center text-ink-muted">
            Sign in
          </a>
        </div>
      </nav>
    </header>
  )
}
