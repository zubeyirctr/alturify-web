import { LegalDocumentView } from '@/components/legal/LegalDocumentView'
import { termsOfService } from '@/content/legal/termsOfService'
import { useLanguage } from '@/i18n/LanguageContext'

export function TermsOfServicePage() {
  const { language } = useLanguage()
  return <LegalDocumentView document={termsOfService[language]} />
}
