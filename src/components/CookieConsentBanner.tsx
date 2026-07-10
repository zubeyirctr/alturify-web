import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/i18n/LanguageContext'
import { ROUTES } from '@/lib/routes'
import { getCookieConsent, setCookieConsent, type CookieConsentChoice } from '@/lib/cookie-consent'

export function CookieConsentBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(getCookieConsent() === null)
  }, [])

  const choose = (choice: CookieConsentChoice) => {
    setCookieConsent(choice)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label={t.cookieBanner.heading}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] px-2 pb-2 md:px-8 md:pb-4"
        >
          <div className="glass-surface light-leak extruded-glow mx-auto flex max-w-shell flex-col gap-3 rounded-lg p-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-prose">
              <p className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-background">
                {t.cookieBanner.heading}
              </p>
              <p className="mt-1 text-body-md text-on-surface-variant">
                {t.cookieBanner.description}{' '}
                <Link
                  to={ROUTES.cookiePolicy}
                  className="text-secondary underline underline-offset-2 hover:text-primary"
                >
                  {t.cookieBanner.learnMore}
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <Button variant="secondary" size="md" onClick={() => choose('rejected')}>
                {t.cookieBanner.reject}
              </Button>
              <Button variant="primary" size="md" onClick={() => choose('accepted')}>
                {t.cookieBanner.accept}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
