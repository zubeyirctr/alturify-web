import { Button } from '@/components/ui/Button'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="top" className="mx-auto max-w-shell pt-4 pb-8 lg:pt-16 lg:pb-24">
      <RevealGroup className="mx-auto flex max-w-[52ch] flex-col items-center gap-4 text-center">
        <RevealItem>
          <h1 className="text-headline-lg-mobile text-gradient-signal lg:text-display-lg">
            {t.hero.headline}
          </h1>
        </RevealItem>
        <RevealItem>
          <p className="max-w-prose text-body-lg text-on-surface-variant">
            {t.hero.subheading}
          </p>
        </RevealItem>
        <RevealItem className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          <Button variant="primary" size="lg">
            {t.hero.ctaPrimary}
          </Button>
          <Button variant="secondary" size="lg">
            {t.hero.ctaSecondary}
          </Button>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}
