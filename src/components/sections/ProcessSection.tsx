import { Badge } from '@/components/ui/Badge'
import { FadeInView } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'

export function ProcessSection() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-shell pb-12 lg:pb-24">
      <div className="mb-6 flex flex-col items-start gap-1">
        <Badge tone="secondary">{t.process.badge}</Badge>
        <h2 className="text-headline-md text-on-background">{t.process.heading}</h2>
        <p className="max-w-prose text-body-md text-on-surface-variant">
          {t.process.subheading}
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-3">
        <div className="absolute top-4 right-0 left-0 hidden h-px bg-outline-variant/40 md:block" />

        {t.process.steps.map((step, index) => (
          <FadeInView key={step.title} delay={index * 0.1} className="relative flex flex-col gap-2">
            <span className="glass-surface font-tech relative flex h-4 w-4 items-center justify-center rounded-full text-label-caps text-primary">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-body-lg font-semibold text-on-background">{step.title}</h3>
            <p className="text-body-md text-on-surface-variant">{step.description}</p>
          </FadeInView>
        ))}
      </div>
    </section>
  )
}
