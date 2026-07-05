import { useState, type FormEvent, type ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { FadeInView } from '@/components/motion/Reveal'
import { ScheduleWidget } from '@/components/sections/ScheduleWidget'
import { useLanguage } from '@/i18n/LanguageContext'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
        {label}
      </span>
      {children}
    </label>
  )
}

export function ContactSection() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    console.log('Contact form submitted (placeholder — no backend):', data)
    setSubmitted(true)
    event.currentTarget.reset()
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <h3 className="text-headline-md text-on-background">{t.contact.form.heading}</h3>
                <Field label={t.contact.form.name}>
                  <Input name="name" required />
                </Field>
                <Field label={t.contact.form.email}>
                  <Input name="email" type="email" required />
                </Field>
                <Field label={t.contact.form.problem}>
                  <Textarea name="problem" rows={2} required />
                </Field>
                <Field label={t.contact.form.expectedSolution}>
                  <Textarea name="expectedSolution" rows={2} required />
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
