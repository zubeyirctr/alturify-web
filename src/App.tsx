import { useEffect } from 'react'
import { PageShell } from '@/components/layout/PageShell'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemsSection } from '@/components/sections/ProblemsSection'
import { SolutionsSection } from '@/components/sections/SolutionsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { AppointmentModal } from '@/components/modals/AppointmentModal'
import { CursorTrail } from '@/components/effects/CursorTrail'
import { SectionDivider } from '@/components/ui/SectionDivider'
import { useLanguage } from '@/i18n/LanguageContext'

function App() {
  const { t, language } = useLanguage()

  useEffect(() => {
    document.title = t.meta.title
    document.documentElement.lang = language
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [t, language])

  return (
    <PageShell>
      <Header />

      <main className="px-2 md:px-8">
        <HeroSection />
        <SectionDivider />
        <ProblemsSection />
        <SolutionsSection />
        <SectionDivider />
        <ProcessSection />
        <SectionDivider />
        <StatsSection />
        <SectionDivider />
        <ServicesSection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider />
        <FAQSection />
        <SectionDivider />
        <ContactSection />
      </main>

      <Footer />
      <AppointmentModal />
      <CursorTrail />
    </PageShell>
  )
}

export default App
