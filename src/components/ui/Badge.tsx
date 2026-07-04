import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type BadgeTone = 'primary' | 'secondary' | 'tertiary' | 'error'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

const tones: Record<BadgeTone, string> = {
  primary: 'bg-primary-container/10 text-primary border-primary-container/40',
  secondary: 'bg-secondary-container/10 text-secondary border-secondary-container/40',
  tertiary: 'bg-tertiary-container/10 text-tertiary border-tertiary-container/40',
  error: 'bg-error-container/10 text-error border-error/40',
}

export function Badge({ className, tone = 'primary', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-1.5 py-1',
        'font-sans text-label-caps uppercase',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
