import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { useLanguage } from '@/i18n/LanguageContext'
import { useAppointmentModal } from '@/context/AppointmentModalContext'

export function Header() {
  const { t } = useLanguage()
  const { open } = useAppointmentModal()

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.howItWorks, href: '#how-it-works' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 px-2 pt-2 md:px-8">
      <div className="glass-surface light-leak mx-auto flex h-8 max-w-shell items-center justify-between rounded-lg px-2.5">
        <a href="#top" className="flex items-center">
          <img
            src="/alturify-logo-horizontal.svg"
            alt="Alturify"
            className="h-[28px] w-auto md:h-[36px]"
          />
        </a>

        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant transition-colors hover:text-secondary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <Button variant="primary" size="md" className="whitespace-nowrap" onClick={open}>
            {t.header.cta}
          </Button>
        </div>
      </div>
    </header>
  )
}
