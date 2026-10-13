import { RECAPTCHA_SITE_KEY } from '@/config'

// reCAPTCHA Enterprise (score-based, no challenge) for the interest form only.
// The script, and the cookies it sets, load the first time someone starts
// filling in the form, never on page open, so a visitor who doesn't use the
// form gets no third-party script at all (the privacy notice says exactly
// this). mangodocs-api's app/core/recaptcha.py checks the token.

type Grecaptcha = {
  enterprise: {
    ready: (cb: () => void) => void
    execute: (siteKey: string, options: { action: string }) => Promise<string>
  }
}

let loading: Promise<Grecaptcha> | null = null

export function loadRecaptcha(): Promise<Grecaptcha> {
  loading ??= new Promise<Grecaptcha>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.onload = () => {
      const g = (window as unknown as { grecaptcha?: Grecaptcha }).grecaptcha
      if (g) g.enterprise.ready(() => resolve(g))
      else reject(new Error('reCAPTCHA missing'))
    }
    script.onerror = () => reject(new Error('reCAPTCHA failed to load'))
    document.head.appendChild(script)
  }).catch((err: unknown) => {
    loading = null // let a later attempt retry
    throw err
  })
  return loading
}

// A fresh token for one submission (tokens expire after two minutes), or ''
// if reCAPTCHA is blocked or down: the server then refuses the submission and
// the form's error message offers the email address instead.
export async function recaptchaToken(action: string): Promise<string> {
  try {
    const g = await loadRecaptcha()
    return await g.enterprise.execute(RECAPTCHA_SITE_KEY, { action })
  } catch {
    return ''
  }
}
