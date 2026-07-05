import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { TiltIcon } from '@/components/ui/TiltIcon'
import { FadeInView } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'

const TONES = ['purple', 'cyan', 'pink'] as const

const TONE_ICON_CLASSES: Record<(typeof TONES)[number], string> = {
  purple: 'border-primary-container/50 bg-primary-container/20 text-primary',
  cyan: 'border-accent-cyan/50 bg-accent-cyan/20 text-accent-cyan',
  pink: 'border-accent-pink/50 bg-accent-pink/20 text-accent-pink',
}

function ServiceIcon({ tone }: { tone: (typeof TONES)[number] }) {
  return (
    <TiltIcon>
      <span
        className={cn(
          'relative flex h-6 w-6 items-center justify-center rounded-md border',
          TONE_ICON_CLASSES[tone],
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_10px_2px_currentColor]" />
      </span>
    </TiltIcon>
  )
}

export function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="services" className="mx-auto max-w-shell pb-8 lg:pb-16">
      <div className="mb-6 flex flex-col items-start gap-1">
        <Badge tone="primary">{t.services.badge}</Badge>
        <h2 className="text-headline-md text-on-background">{t.services.heading}</h2>
        {t.services.subheading && (
          <p className="max-w-prose text-body-md text-on-surface-variant">
            {t.services.subheading}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {t.services.items.map((service, index) => {
          const tone = TONES[index % TONES.length]
          return (
            <FadeInView key={service.title} delay={(index % 3) * 0.1}>
              <Card interactive className="flex h-full flex-col items-start gap-3">
                <ServiceIcon tone={tone} />
                <h3 className="text-body-lg font-semibold text-on-background">
                  {service.title}
                </h3>
                <p className="text-body-md text-on-surface-variant">{service.description}</p>
                <a
                  href="#"
                  className="mt-auto font-tech text-label-caps uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
                >
                  {t.services.linkLabel} →
                </a>
              </Card>
            </FadeInView>
          )
        })}
      </div>
    </section>
  )
}
