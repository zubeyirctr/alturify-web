import { LegalDocumentView } from '@/components/legal/LegalDocumentView'
import { privacyPolicy } from '@/content/legal/privacyPolicy'
import { useLanguage } from '@/i18n/LanguageContext'

export function PrivacyPolicyPage() {
  const { language } = useLanguage()
  return <LegalDocumentView document={privacyPolicy[language]} />
}
