import { LegalDocumentView } from '@/components/legal/LegalDocumentView'
import { cookiePolicy } from '@/content/legal/cookiePolicy'
import { useLanguage } from '@/i18n/LanguageContext'

export function CookiePolicyPage() {
  const { language } = useLanguage()
  return <LegalDocumentView document={cookiePolicy[language]} />
}
