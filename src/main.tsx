import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext'
import { AppointmentModalProvider } from './context/AppointmentModalContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <AppointmentModalProvider>
          <App />
        </AppointmentModalProvider>
      </LanguageProvider>
    </MotionConfig>
  </StrictMode>,
)
