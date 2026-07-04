import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { useLanguage } from '@/i18n/LanguageContext'

const SOCIAL_ICONS = ['x-icon', 'github-icon', 'discord-icon', 'bluesky-icon']

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-auto px-2 pb-4 md:px-8">
      <div className="mx-auto max-w-shell border-t border-outline-variant/40 pt-8">
        <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-4 w-4 items-center justify-center rounded-md bg-primary-container/20">
                <span className="absolute inset-0 rounded-md border border-primary-container/50" />
                <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(192,193,255,0.8)]" />
              </span>
              <span className="font-sans text-body-lg font-semibold tracking-tight text-on-background">
                {t.footer.brand}
              </span>
            </span>
            <p className="max-w-[32ch] text-body-md text-on-surface-variant">
              {t.footer.description}
            </p>
            <div className="mt-1 flex items-center gap-2">
              {SOCIAL_ICONS.map((icon) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={icon}
                  className="glass-surface flex h-4 w-4 items-center justify-center rounded-md"
                >
                  <svg className="icon-invert h-2 w-2" role="presentation" aria-hidden="true">
                    <use href={`/icons.svg#${icon}`} />
                  </svg>
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
                {column.links.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-body-md text-on-surface-variant transition-colors hover:text-secondary"
                  >
                    {link}
                  </a>
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
