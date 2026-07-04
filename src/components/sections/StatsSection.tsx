import { Badge } from '@/components/ui/Badge'
import { ProgressPulse } from '@/components/ui/ProgressPulse'
import { CountUp } from '@/components/ui/CountUp'
import { FadeInView } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'

export function StatsSection() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-shell pb-8 lg:pb-16">
      <FadeInView>
        <div className="glass-surface light-leak extruded-glow relative overflow-hidden rounded-lg p-4">
          <div className="mesh-drift pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative flex items-center justify-between">
            <Badge tone="secondary">{t.stats.badge}</Badge>
            <ProgressPulse label={t.stats.live} />
          </div>

          <div className="relative mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {t.stats.items.map((stat) => (
              <div key={stat.label} className="glass-surface rounded-md px-2 py-2">
                <p className="font-tech text-headline-md text-on-background">
                  <CountUp value={stat.value} />
                </p>
                <p className="text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInView>
    </section>
  )
}
