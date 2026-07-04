import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const base =
  'inline-flex items-center justify-center gap-1 rounded font-sans text-body-md font-medium ' +
  'transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
  'disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]'

const sizes: Record<ButtonSize, string> = {
  md: 'h-6 px-3',
  lg: 'h-7 px-4 text-body-lg',
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-container text-on-primary-container shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] ' +
    'hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_0_20px_2px_rgba(99,102,241,0.5)] ' +
    'hover:brightness-[1.06]',
  secondary:
    'glass-surface text-on-surface border-outline-variant hover:border-primary-container ' +
    'hover:shadow-[0_0_20px_0_rgba(99,102,241,0.3)]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
