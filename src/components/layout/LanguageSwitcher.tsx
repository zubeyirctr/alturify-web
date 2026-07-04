import { useLanguage, type Language } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'

const OPTIONS: { code: Language; label: string }[] = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language"
      className="glass-surface light-leak inline-flex items-center rounded-full p-0.5"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLanguage(option.code)}
          aria-pressed={language === option.code}
          className={cn(
            'rounded-full px-1.5 py-0.5 font-tech text-label-caps uppercase tracking-[0.1em]',
            'transition-colors duration-200',
            language === option.code
              ? 'bg-primary-container text-on-primary-container shadow-[0_0_12px_0_rgba(128,131,255,0.45)]'
              : 'text-on-surface-variant hover:text-on-background',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
