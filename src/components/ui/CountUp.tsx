import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

interface ParsedValue {
  prefix: string
  suffix: string
  target: number
  decimals: number
  decimalSeparator: string
}

function parseValue(raw: string): ParsedValue | null {
  const match = raw.match(/\d+(?:[.,]\d+)?/)
  if (!match || match.index === undefined) return null

  const numberText = match[0]
  const decimalSeparator = numberText.includes(',') ? ',' : '.'
  const normalized = numberText.replace(',', '.')
  const decimals = normalized.includes('.') ? normalized.split('.')[1].length : 0

  return {
    prefix: raw.slice(0, match.index),
    suffix: raw.slice(match.index + numberText.length),
    target: parseFloat(normalized),
    decimals,
    decimalSeparator,
  }
}

const DURATION_MS = 1400

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const parsedRef = useRef(parseValue(value))
  const parsed = parsedRef.current

  const [display, setDisplay] = useState(() =>
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value,
  )

  useEffect(() => {
    if (!parsed || !isInView) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    let rafId = 0
    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / DURATION_MS)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = parsed!.target * eased
      const formatted = current.toFixed(parsed!.decimals).replace('.', parsed!.decimalSeparator)
      setDisplay(`${parsed!.prefix}${formatted}${parsed!.suffix}`)

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, parsed, value])

  return <span ref={ref}>{display}</span>
}
