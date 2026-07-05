import { Badge } from '@/components/ui/Badge'
import { AutomationScrollStory } from '@/components/effects/AutomationScrollStory'
import { useLanguage } from '@/i18n/LanguageContext'

export function ProcessSection() {
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="mx-auto max-w-shell pb-8 lg:pb-16">
      <div className="mb-6 flex flex-col items-start gap-1">
        <Badge tone="secondary">{t.process.badge}</Badge>
        <h2 className="text-headline-md text-on-background">{t.process.heading}</h2>
        <p className="max-w-prose text-body-md text-on-surface-variant">
          {t.process.subheading}
        </p>
      </div>

      <AutomationScrollStory stages={t.process.stages} />
    </section>
  )
}
