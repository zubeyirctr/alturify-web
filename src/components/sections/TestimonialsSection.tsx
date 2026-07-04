import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { FadeInView } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'

export function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-shell pb-8 lg:pb-16">
      <div className="mb-6 flex flex-col items-start gap-1">
        <Badge tone="tertiary">{t.testimonials.badge}</Badge>
        <h2 className="text-headline-md text-on-background">{t.testimonials.heading}</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {t.testimonials.items.map((testimonial, index) => (
          <FadeInView key={testimonial.name + index} delay={index * 0.1}>
            <Card interactive className="flex h-full flex-col gap-4">
              <p className="text-body-md text-on-surface-variant">“{testimonial.quote}”</p>
              <div className="mt-auto flex items-center gap-2">
                <span className="glass-surface flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
                  <svg className="h-2 w-2" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#social-icon" />
                  </svg>
                </span>
                <span>
                  <p className="text-body-md font-semibold text-on-background">
                    {testimonial.name}
                  </p>
                  <p className="text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
                    {testimonial.role}
                  </p>
                </span>
              </div>
            </Card>
          </FadeInView>
        ))}
      </div>
    </section>
  )
}
