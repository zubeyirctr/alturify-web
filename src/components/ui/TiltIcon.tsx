import { useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

const RESET_STYLE: CSSProperties = {
  transform: 'perspective(300px) rotateX(0deg) rotateY(0deg)',
}

export function TiltIcon({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [style, setStyle] = useState<CSSProperties>(RESET_STYLE)

  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  function handleMouseMove(event: React.MouseEvent<HTMLSpanElement>) {
    if (prefersReducedMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(300px) rotateX(${(-py * 22).toFixed(2)}deg) rotateY(${(px * 22).toFixed(2)}deg)`,
    })
  }

  function handleMouseLeave() {
    setStyle(RESET_STYLE)
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cn('inline-block transition-transform duration-150 ease-out', className)}
    >
      {children}
    </span>
  )
}
