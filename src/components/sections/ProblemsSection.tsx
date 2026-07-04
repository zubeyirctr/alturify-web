import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { FadeInView } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'

function ProblemIcon() {
  return (
    <span className="relative flex h-6 w-6 items-center justify-center rounded-md border border-error/40 bg-error-container/15 text-error">
      <span className="font-tech text-body-md font-bold">!</span>
    </span>
  )
}

export function ProblemsSection() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-shell pb-8 lg:pb-16">
      <div className="mb-6 flex flex-col items-start gap-1">
        <Badge tone="error">{t.problems.badge}</Badge>
        <h2 className="text-headline-md text-on-background">{t.problems.heading}</h2>
        <p className="max-w-prose text-body-md text-on-surface-variant">
          {t.problems.subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {t.problems.items.map((problem, index) => (
          <FadeInView key={problem.title} delay={index * 0.1}>
            <Card interactive className="flex h-full flex-col items-start gap-3">
              <ProblemIcon />
              <h3 className="text-body-lg font-semibold text-on-background">{problem.title}</h3>
              <p className="text-body-md text-on-surface-variant">{problem.description}</p>
            </Card>
          </FadeInView>
        ))}
      </div>
    </section>
  )
}
