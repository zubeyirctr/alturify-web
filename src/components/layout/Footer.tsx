import { Link, useLocation } from 'react-router-dom'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { useLanguage } from '@/i18n/LanguageContext'
import { ROUTES } from '@/lib/routes'

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-2 w-2" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.8c0-1.38-.03-3.16-1.98-3.16-1.98 0-2.28 1.5-2.28 3.06V21H9z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-2 w-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

// TODO: hesap açılınca gerçek URL eklenecek
const SOCIAL_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', href: '#', Icon: LinkedInIcon },
  { id: 'instagram', label: 'Instagram', href: '#', Icon: InstagramIcon },
]

const linkClassName = 'text-body-md text-on-surface-variant transition-colors hover:text-secondary'

// Column links are a mix of same-page hash anchors (only meaningful on the
// homepage), a mailto link, and real routes to the legal pages — this picks
// the right element/href for each so they work correctly from any page.
function FooterLink({ href, label }: { href: string; label: string }) {
  const { pathname } = useLocation()

  if (href.startsWith('#')) {
    const isHome = pathname === ROUTES.home
    return (
      <a href={isHome ? href : `${ROUTES.home}${href}`} className={linkClassName}>
        {label}
      </a>
    )
  }

  if (href.startsWith('mailto:')) {
    return (
      <a href={href} className={linkClassName}>
        {label}
      </a>
    )
  }

  return (
    <Link to={href} className={linkClassName}>
      {label}
    </Link>
  )
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-auto px-2 pb-4 md:px-8">
      <div className="mx-auto max-w-shell border-t border-outline-variant/40 pt-8">
        <div className="grid grid-cols-2 gap-8 pb-8 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <img
              src="/alturify-logo-horizontal.svg"
              alt={t.footer.brand}
              className="h-[36px] w-auto"
            />
            <p className="max-w-[32ch] text-body-md text-on-surface-variant">
              {t.footer.description}
            </p>
            <div className="mt-1 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ id, label, href, Icon }) => (
                <a
                  key={id}
                  href={href}
                  aria-label={label}
                  onClick={(event) => event.preventDefault()}
                  className="glass-surface flex h-4 w-4 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:text-secondary"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {t.footer.columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-2">
              <p className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-background">
                {column.heading}
              </p>
              <nav className="flex flex-col gap-1.5">
                {column.links.map((link) => (
                  <FooterLink key={link.label} href={link.href} label={link.label} />
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-outline-variant/40 py-4 md:flex-row">
          <span className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
            © {new Date().getFullYear()} {t.footer.copyright}
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  )
}
