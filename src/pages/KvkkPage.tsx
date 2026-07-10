import { LegalDocumentView } from '@/components/legal/LegalDocumentView'
import { kvkk } from '@/content/legal/kvkk'
import { useLanguage } from '@/i18n/LanguageContext'

export function KvkkPage() {
  const { language } = useLanguage()
  return <LegalDocumentView document={kvkk[language]} />
}
