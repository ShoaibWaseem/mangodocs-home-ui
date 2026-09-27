import { useState, type FormEvent, type ReactNode } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Eyebrow } from '@/components/Section'
import { API_BASE_URL, CONTACT_EMAIL } from '@/config'

type Status = 'idle' | 'submitting' | 'done' | 'error'
type FieldErrors = Partial<Record<'name' | 'email' | 'company' | 'role' | 'message', string>>

const inputClass =
  'mt-1.5 block w-full rounded-md border border-border-strong bg-surface px-3.5 py-2.5 text-ink shadow-e1 transition-[border-color,box-shadow] duration-150 placeholder:text-ink-muted focus:border-mango-700 focus:outline-none focus:ring-2 focus:ring-mango-200 aria-[invalid=true]:border-danger-500'

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger-700">
          {error}
        </p>
      )}
    </div>
  )
}

export function InterestForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setErrors({})

    // URL-encoded, not JSON: a CORS "simple request" with no preflight —
    // see mangodocs-api's app/api/public_routes.py for why that matters.
    const body = new URLSearchParams()
    new FormData(e.currentTarget).forEach((value, key) => body.append(key, String(value)))

    try {
      const res = await fetch(`${API_BASE_URL}/api/public/interest`, { method: 'POST', body, credentials: 'omit' })
      if (res.ok) {
        setStatus('done')
        return
      }
      if (res.status === 400) {
        const data = (await res.json()) as { errors?: FieldErrors }
        setErrors(data.errors ?? {})
        setStatus('idle')
        return
      }
      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const invalid = (key: keyof FieldErrors) =>
    errors[key] ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` } : {}

  return (
    <section id="interest" className="scroll-mt-16 border-t border-border bg-mango-50 py-20 sm:py-28">
      <div className="container grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="lg:pt-4">
          <Eyebrow>Get early access</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            See what’s really in your contracts.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-secondary">
            Tell us a little about your team and we’ll be in touch to set up a demo on your own documents — renewals,
            obligations and risk, every fact cited.
          </p>
          <p className="mt-6 text-sm text-ink-muted">
            Rather email?{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary-text underline underline-offset-2">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6 shadow-e2 sm:p-8">
          {status === 'done' ? (
            <div className="flex min-h-[22rem] flex-col items-center justify-center text-center animate-in-soft">
              <CheckCircle2 className="h-10 w-10 text-success-500" />
              <h3 className="mt-4 text-xl font-semibold text-ink">Thanks — we’ll be in touch.</h3>
              <p className="mt-2 max-w-sm text-ink-secondary">
                We’ve got your details and will reply to your work email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name" error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    required
                    maxLength={200}
                    autoComplete="name"
                    className={inputClass}
                    {...invalid('name')}
                  />
                </Field>
                <Field id="email" label="Work email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={320}
                    autoComplete="email"
                    autoCapitalize="none"
                    className={inputClass}
                    {...invalid('email')}
                  />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="company" label="Company" error={errors.company}>
                  <input
                    id="company"
                    name="company"
                    required
                    maxLength={200}
                    autoComplete="organization"
                    className={inputClass}
                    {...invalid('company')}
                  />
                </Field>
                <Field id="role" label="Role" optional error={errors.role}>
                  <input
                    id="role"
                    name="role"
                    maxLength={200}
                    autoComplete="organization-title"
                    placeholder="e.g. Head of Legal"
                    className={inputClass}
                    {...invalid('role')}
                  />
                </Field>
              </div>
              <Field id="message" label="What are you hoping to solve?" optional error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={2000}
                  className={`${inputClass} resize-y`}
                  {...invalid('message')}
                />
              </Field>

              {/* Honeypot — hidden from people and screen readers, so only bots fill it. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {status === 'error' && (
                <p role="alert" className="rounded-md bg-danger-100 px-3.5 py-2.5 text-sm text-danger-700">
                  Something went wrong sending that. Please try again, or email us at {CONTACT_EMAIL}.
                </p>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-relaxed text-ink-muted sm:max-w-[16rem]">
                  We’ll only use these details to contact you about MangoDocs.{' '}
                  <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
                    Privacy notice
                  </a>
                </p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-neutral-900 px-5 text-[0.9375rem] font-semibold text-neutral-50 shadow-e1 transition-[transform,background-color] duration-150 ease-out hover:bg-neutral-800 active:scale-[0.97] disabled:cursor-progress disabled:opacity-80"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Request a demo <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
