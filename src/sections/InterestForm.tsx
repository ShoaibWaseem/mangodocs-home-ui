import { useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Band, Eyebrow, Meta } from '@/components/Section'
import { buttonClass } from '@/components/Button'
import { API_BASE_URL, CONTACT_EMAIL } from '@/config'

type Status = 'idle' | 'submitting' | 'done' | 'error'
type FieldErrors = Partial<Record<'name' | 'email' | 'company' | 'role' | 'message', string>>

const inputClass =
  'mt-2 block w-full rounded-none border-0 bg-field px-4 py-3 text-ink ring-1 ring-inset ring-transparent transition-[box-shadow] duration-150 placeholder:text-neutral-400 focus:outline-none focus:ring-mango-600 aria-[invalid=true]:ring-danger-500'

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
      <label htmlFor={id} className="caps text-ink-muted">
        {label}
        {optional && <span className="normal-case tracking-normal"> (optional)</span>}
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
    <Band id="interest" tone="stone">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Request a demo</Eyebrow>
          <h2 className="display-1 mt-6 text-ink">See what’s in your contracts.</h2>
          <Meta items={['Your own contracts', 'Every fact cited']} className="mt-8 text-ink" />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-muted">
            Tell us about your team and we’ll arrange a demo using your own contracts.
          </p>
          <p className="mt-6 text-[15px] text-ink-muted">
            Prefer email?{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-ink underline decoration-mango-500 underline-offset-4 hover:decoration-ink"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div>
          {status === 'done' ? (
            <div className="flex min-h-[22rem] flex-col justify-center border-t border-hairline animate-in-soft">
              <CheckCircle2 className="h-8 w-8 text-mango-700" strokeWidth={1.25} />
              <h3 className="display-3 mt-6 text-ink">Thanks, we’ll be in touch.</h3>
              <p className="mt-3 max-w-sm text-[15px] text-ink-muted">We’ll reply to your work email shortly.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
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
              <div className="grid gap-6 sm:grid-cols-2">
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
                <p role="alert" className="bg-danger-100 px-4 py-3 text-sm text-danger-700">
                  Something went wrong sending that. Please try again, or email us at {CONTACT_EMAIL}.
                </p>
              )}

              <div className="flex flex-col gap-5">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`${buttonClass('dark')} w-full disabled:cursor-progress disabled:opacity-80 sm:w-fit`}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Request a demo <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
                <p className="text-xs leading-relaxed text-ink-muted">
                  We’ll only use these details to contact you about MangoDocs.{' '}
                  <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
                    Privacy notice
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </Band>
  )
}
