import { type TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full resize-none rounded border border-white/10 border-b-2 border-b-outline-variant',
          'bg-surface-container-low/60 px-2 py-1.5 backdrop-blur-md',
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

Textarea.displayName = 'Textarea'
