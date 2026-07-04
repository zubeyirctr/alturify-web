import { type ReactNode } from 'react'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="void-field flex min-h-svh flex-col text-on-background">
      {children}
    </div>
  )
}
