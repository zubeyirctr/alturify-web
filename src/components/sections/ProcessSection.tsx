import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { Badge } from '@/components/ui/Badge'
import { FadeInView } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'

export function ProcessSection() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const stepCount = t.process.steps.length
    const index = Math.min(stepCount - 1, Math.max(0, Math.floor(latest * stepCount)))
    setActiveIndex(index)
  })

  return (
    <section className="mx-auto max-w-shell pb-8 lg:pb-16">
      <div className="mb-6 flex flex-col items-start gap-1">
        <Badge tone="secondary">{t.process.badge}</Badge>
        <h2 className="text-headline-md text-on-background">{t.process.heading}</h2>
        <p className="max-w-prose text-body-md text-on-surface-variant">
          {t.process.subheading}
        </p>
      </div>

      <div ref={containerRef} className="relative grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-3">
        <div className="absolute top-4 right-0 left-0 hidden h-px bg-outline-variant/40 md:block" />
        <motion.div
          className="absolute top-4 left-0 hidden h-px w-full origin-left bg-accent-cyan md:block"
          style={{ scaleX: lineScale, boxShadow: '0 0 8px var(--glow-cyan)' }}
        />

        {t.process.steps.map((step, index) => {
          const isActive = index === activeIndex
          return (
            <FadeInView
              key={step.title}
              delay={index * 0.1}
              className="relative flex flex-col gap-2"
            >
              <span
                className={cn(
                  'glass-surface font-tech relative flex h-4 w-4 items-center justify-center rounded-full text-label-caps transition-all duration-300',
                  isActive
                    ? 'scale-125 border-accent-cyan bg-accent-cyan/20 text-accent-cyan shadow-[0_0_16px_2px_var(--glow-cyan)]'
                    : 'text-primary opacity-50',
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3
                className={cn(
                  'text-body-lg font-semibold transition-colors duration-300',
                  isActive ? 'text-on-background' : 'text-on-surface-variant',
                )}
              >
                {step.title}
              </h3>
              <p className="text-body-md text-on-surface-variant">{step.description}</p>
            </FadeInView>
          )
        })}
      </div>
    </section>
  )
}
