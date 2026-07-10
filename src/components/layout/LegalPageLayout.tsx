import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import { Footer } from '@/components/layout/Footer'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { FadeInView } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'
import { ROUTES } from '@/lib/routes'

function LegalHeader() {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 px-2 pt-2 md:px-8">
      <div className="glass-surface light-leak mx-auto flex h-8 max-w-shell items-center justify-between rounded-lg px-2.5">
        <Link to={ROUTES.home} className="flex items-center gap-1.5">
          <span className="relative flex h-4 w-4 items-center justify-center rounded-md bg-primary-container/20">
            <span className="absolute inset-0 rounded-md border border-primary-container/50" />
            <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(192,193,255,0.8)]" />
          </span>
          <span className="hidden font-sans text-body-lg font-semibold tracking-tight whitespace-nowrap text-on-background sm:inline">
            Alturify
          </span>
        </Link>

        <Link
          to={ROUTES.home}
          className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant transition-colors hover:text-secondary"
        >
          {t.legal.backToHome}
        </Link>

        <LanguageSwitcher />
      </div>
    </header>
  )
}

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: ReactNode
}) {
  return (
    <PageShell>
      <LegalHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-2 py-6 md:px-8 lg:py-12">
        <FadeInView>
          <div className="glass-surface light-leak extruded-glow rounded-lg p-4 md:p-8">
            <h1 className="text-headline-lg-mobile text-on-background lg:text-headline-lg">{title}</h1>
            <p className="mt-2 font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
              {lastUpdated}
            </p>
            <div className="mt-6 flex flex-col gap-6">{children}</div>
          </div>
        </FadeInView>
      </main>

      <Footer />
    </PageShell>
  )
}
