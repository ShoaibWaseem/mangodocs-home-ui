import { API_BASE_URL } from '@/config'

// One page open → mangodocs-api's /api/public/visit, which counts it
// (cookieless: nothing is stored in the browser, see the privacy notice).
// Skipped when the visitor asks not to be tracked (Global Privacy Control or
// Do Not Track) and for automated browsers. Fire-and-forget: a failure here
// must never affect the page.
export function countVisit() {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean }
  if (nav.globalPrivacyControl || nav.doNotTrack === '1' || nav.webdriver) return

  // URL-encoded, like the interest form: a CORS simple request, no preflight.
  const body = new URLSearchParams({ path: location.pathname, referrer: document.referrer })
  fetch(`${API_BASE_URL}/api/public/visit`, { method: 'POST', body, credentials: 'omit', keepalive: true }).catch(
    () => {},
  )
}
