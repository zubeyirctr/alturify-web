import { cn } from '@/lib/cn'

export interface ProgressPulseProps {
  label?: string
  className?: string
}

const RING_DELAYS = ['0s', '0.8s', '1.6s']

export function ProgressPulse({ label = 'Processing', className }: ProgressPulseProps) {
  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <span className="relative flex h-2 w-2 items-center justify-center">
        {RING_DELAYS.map((delay) => (
          <span
            key={delay}
            className="pulse-ring absolute h-2 w-2 rounded-full border border-accent-cyan"
            style={{ animationDelay: delay }}
          />
        ))}
        <span className="relative h-1 w-1 rounded-full bg-accent-cyan shadow-[0_0_8px_2px_rgba(0,212,255,0.7)]" />
      </span>
      <span className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
        {label}
      </span>
    </div>
  )
}
