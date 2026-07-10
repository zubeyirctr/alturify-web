import { LegalPageLayout } from '@/components/layout/LegalPageLayout'
import type { LegalDocument } from '@/content/legal/types'

export function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <LegalPageLayout title={document.title} lastUpdated={document.lastUpdated}>
      {document.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-headline-md text-on-background">{section.heading}</h2>
          {section.paragraphs?.map((paragraph, index) => (
            <p key={index} className="mt-2 text-body-md text-on-surface-variant">
              {paragraph}
            </p>
          ))}
          {section.list ? (
            <ul className="mt-2 flex flex-col gap-1 pl-5 text-body-md text-on-surface-variant [&>li]:list-disc">
              {section.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </LegalPageLayout>
  )
}
