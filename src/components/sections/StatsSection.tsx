import { Badge } from '@/components/ui/Badge'
import { ProgressPulse } from '@/components/ui/ProgressPulse'
import { FadeInView } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'

export function StatsSection() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-shell pb-12 lg:pb-24">
      <FadeInView>
        <div className="glass-surface light-leak extruded-glow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <Badge tone="secondary">{t.stats.badge}</Badge>
            <ProgressPulse label={t.stats.live} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {t.stats.items.map((stat) => (
              <div key={stat.label} className="glass-surface rounded-md px-2 py-2">
                <p className="font-tech text-headline-md text-on-background">{stat.value}</p>
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
