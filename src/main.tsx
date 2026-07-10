import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext'
import { AppointmentModalProvider } from './context/AppointmentModalContext'
import { ScrollToTop } from './ScrollToTop'
import { CookieConsentBanner } from '@/components/CookieConsentBanner'
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage'
import { TermsOfServicePage } from '@/pages/TermsOfServicePage'
import { CookiePolicyPage } from '@/pages/CookiePolicyPage'
import { KvkkPage } from '@/pages/KvkkPage'
import { ROUTES } from '@/lib/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <AppointmentModalProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path={ROUTES.home} element={<App />} />
              <Route path={ROUTES.privacyPolicy} element={<PrivacyPolicyPage />} />
              <Route path={ROUTES.termsOfService} element={<TermsOfServicePage />} />
              <Route path={ROUTES.cookiePolicy} element={<CookiePolicyPage />} />
              <Route path={ROUTES.kvkk} element={<KvkkPage />} />
            </Routes>
            <CookieConsentBanner />
          </BrowserRouter>
        </AppointmentModalProvider>
      </LanguageProvider>
    </MotionConfig>
  </StrictMode>,
)
