import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { en, type Dictionary } from './dictionaries/en'
import { tr } from './dictionaries/tr'

export type Language = 'tr' | 'en'

const dictionaries: Record<Language, Dictionary> = { en, tr }

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr')

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: dictionaries[language] }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
