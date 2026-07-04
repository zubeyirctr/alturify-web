import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function Card({ className, interactive = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'glass-surface light-leak extruded-glow rounded-lg p-4',
        interactive &&
          'glow-ring cursor-pointer transition-transform duration-300 hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
