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
        <div className="mb-6 flex flex-col items-center gap-1 text-center">
          <Badge tone="primary">{t.contact.badge}</Badge>
          <h2 className="text-headline-md text-on-background">{t.contact.heading}</h2>
          <p className="max-w-prose text-body-md text-on-surface-variant">
            {t.contact.subheading}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="glass-surface light-leak extruded-glow rounded-lg p-4">
            <ScheduleWidget />
          </div>

          <Card>
            {submitted ? (
              <p className="text-body-md text-on-background">{t.contact.form.successMessage}</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
      </FadeInView>
    </section>
  )
}
