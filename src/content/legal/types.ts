export type LegalSection = {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export type LegalDocument = {
  title: string
  lastUpdated: string
  sections: LegalSection[]
}

export type LegalDocumentByLanguage = {
  tr: LegalDocument
  en: LegalDocument
}
