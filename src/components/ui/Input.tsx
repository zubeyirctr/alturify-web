import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-6 w-full rounded border border-white/10 border-b-2 border-b-outline-variant',
          'bg-surface-container-low/60 px-2 backdrop-blur-md',
          'font-sans text-body-md text-on-surface placeholder:text-on-surface-variant/60',
          'outline-none transition-all duration-200',
          'focus:border-white/15 focus:border-b-secondary focus:shadow-[0_0_16px_2px_var(--glow-cyan)]',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
