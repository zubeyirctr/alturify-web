import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface AppointmentModalContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const AppointmentModalContext = createContext<AppointmentModalContextValue | null>(null)

export function AppointmentModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const value = useMemo<AppointmentModalContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  )

  return (
    <AppointmentModalContext.Provider value={value}>{children}</AppointmentModalContext.Provider>
  )
}

export function useAppointmentModal() {
  const ctx = useContext(AppointmentModalContext)
  if (!ctx) throw new Error('useAppointmentModal must be used within an AppointmentModalProvider')
  return ctx
}
