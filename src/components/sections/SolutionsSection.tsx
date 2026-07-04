import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { FadeInView } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'

function SolutionIcon() {
  return (
    <span className="relative flex h-6 w-6 items-center justify-center rounded-md border border-primary-container/50 bg-primary-container/20 text-primary">
      <span className="font-tech text-body-md font-bold">✓</span>
    </span>
  )
}

export function SolutionsSection() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-shell pb-12 lg:pb-24">
      <div className="mb-6 flex flex-col items-start gap-1">
        <Badge tone="primary">{t.solutions.badge}</Badge>
        <h2 className="text-headline-md text-on-background">{t.solutions.heading}</h2>
        <p className="max-w-prose text-body-md text-on-surface-variant">
          {t.solutions.subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {t.solutions.items.map((solution, index) => (
          <FadeInView key={solution.title} delay={index * 0.1}>
            <Card className="flex h-full flex-col items-start gap-3">
              <SolutionIcon />
              <h3 className="text-body-lg font-semibold text-on-background">{solution.title}</h3>
              <p className="text-body-md text-on-surface-variant">{solution.description}</p>
            </Card>
          </FadeInView>
        ))}
      </div>
    </section>
  )
}
