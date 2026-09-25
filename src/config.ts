// Every outbound link on the page lives here, so a destination changes in one place.
export const APP_URL = 'https://app.mangodocs.ai'
export const CONTACT_EMAIL = 'hello@mangodocs.ai'
// Every "Book a demo" button scrolls to the interest form at the bottom of the page.
export const DEMO_URL = '#interest'
// mangodocs-api — the interest form posts to its /api/public/interest route.
// Build-time (Vite), so changing it means a rebuild + redeploy.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://api.mangodocs.ai'
