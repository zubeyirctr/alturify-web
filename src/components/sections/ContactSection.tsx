import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { FadeInView } from '@/components/motion/Reveal'
import { ScheduleWidget } from '@/components/sections/ScheduleWidget'
import { useLanguage } from '@/i18n/LanguageContext'
import {
  CONTACT_FIELD_LIMITS,
  HONEYPOT_FIELD_NAME,
  isLikelySpam,
  sanitizeText,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormValues,
} from '@/lib/contact-form'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
        {label}
      </span>
      {children}
      {error ? <span className="text-body-md text-error">{error}</span> : null}
    </label>
  )
}

export function ContactSection() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<ContactFieldErrors>({})
  const mountedAt = useRef(Date.now())

  const errorMessages = t.contact.form.errors

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    // Bots that fill the honeypot or submit implausibly fast are shown a fake
    // success so they don't learn to route around the check.
    if (isLikelySpam(formData, mountedAt.current)) {
      setSubmitted(true)
      form.reset()
      return
    }

    const values: ContactFormValues = {
      name: sanitizeText(String(formData.get('name') ?? '')),
      email: sanitizeText(String(formData.get('email') ?? '')),
      problem: sanitizeText(String(formData.get('problem') ?? '')),
      expectedSolution: sanitizeText(String(formData.get('expectedSolution') ?? '')),
    }

    const validationErrors = validateContactForm(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})

    // TODO(backend): once a real endpoint exists, POST `values` there instead
    // of logging — add server-side validation, CSRF protection, and rate
    // limiting there too, since none of the client-side checks above can be
    // trusted once a request can be sent directly to the API.
    if (import.meta.env.DEV) {
      console.log('Contact form submitted (placeholder — no backend):', values)
    }
    setSubmitted(true)
    form.reset()
  }

  return (
    <section id="contact" className="mx-auto max-w-shell pb-8 lg:pb-16">
      <FadeInView>
        <div className="mb-6 flex justify-center">
          <Badge tone="primary">{t.contact.badge}</Badge>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="glass-surface light-leak extruded-glow rounded-lg p-4">
            <h3 className="text-headline-md text-on-background">{t.contact.schedule.heading}</h3>
            <p className="mt-1 mb-4 text-body-md text-on-surface-variant">
              {t.contact.schedule.description}
            </p>
            <ScheduleWidget />
          </div>

          <Card>
            {submitted ? (
              <p className="text-body-md text-on-background">{t.contact.form.successMessage}</p>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                <h3 className="text-headline-md text-on-background">{t.contact.form.heading}</h3>

                {/* Honeypot: hidden from real users, invisible to screen readers, but
                    still present in the DOM so form-filling bots tend to fill it in. */}
                <label
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                  tabIndex={-1}
                >
                  Bırakınız / Leave blank
                  <input
                    type="text"
                    name={HONEYPOT_FIELD_NAME}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>

                <Field label={t.contact.form.name} error={errors.name && errorMessages[errors.name]}>
                  <Input name="name" required maxLength={CONTACT_FIELD_LIMITS.name} />
                </Field>
                <Field label={t.contact.form.email} error={errors.email && errorMessages[errors.email]}>
                  <Input name="email" type="email" required maxLength={CONTACT_FIELD_LIMITS.email} />
                </Field>
                <Field label={t.contact.form.problem} error={errors.problem && errorMessages[errors.problem]}>
                  <Textarea name="problem" rows={2} required maxLength={CONTACT_FIELD_LIMITS.problem} />
                </Field>
                <Field
                  label={t.contact.form.expectedSolution}
                  error={errors.expectedSolution && errorMessages[errors.expectedSolution]}
                >
                  <Textarea
                    name="expectedSolution"
                    rows={2}
                    required
                    maxLength={CONTACT_FIELD_LIMITS.expectedSolution}
                  />
                </Field>
                <Button type="submit" variant="primary" size="md" className="mt-1">
                  {t.contact.form.submit}
                </Button>
              </form>
            )}
          </Card>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-1.5 text-center sm:flex-row sm:gap-4">
          <a
            href={`mailto:${t.contact.info.email}`}
            className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant transition-colors hover:text-secondary"
          >
            {t.contact.info.email}
          </a>
          <span className="hidden text-on-surface-variant/40 sm:inline">•</span>
          <span className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
            {t.contact.info.location}
          </span>
        </div>
      </FadeInView>
    </section>
  )
}
