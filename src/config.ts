// Every outbound link on the page lives here, so a destination changes in one place.
export const APP_URL = 'https://app.mangodocs.ai'
export const CONTACT_EMAIL = 'hello@mangodocs.ai'
// Every "Book a demo" button scrolls to the interest form at the bottom of the
// home page. Links are `/#…`, not `#…`, so they also work from /privacy.
export const DEMO_URL = '/#interest'
// mangodocs-api — the interest form posts to its /api/public/interest route.
// Build-time (Vite), so changing it means a rebuild + redeploy — and the
// connect-src in firebase.json's Content-Security-Policy must change with it.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://api.mangodocs.ai'

// The legal entity behind MangoDocs, shown on /privacy and /terms. Bracketed
// values are placeholders: vite.config.ts refuses a production build while
// any remain, so the legal pages can't ship half-filled.
export const COMPANY = {
  legalName: '[COMPANY LEGAL NAME]',
  number: '[COMPANY NUMBER]',
  address: '[REGISTERED OFFICE ADDRESS]',
  icoNumber: '[ICO REGISTRATION NUMBER]',
}
