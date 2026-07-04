import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext'
import { AppointmentModalProvider } from './context/AppointmentModalContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AppointmentModalProvider>
        <App />
      </AppointmentModalProvider>
    </LanguageProvider>
  </StrictMode>,
)
