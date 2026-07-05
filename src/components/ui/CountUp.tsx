import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useLanguage } from '@/i18n/LanguageContext'

interface ParsedValue {
  prefix: string
  suffix: string
  target: number
  decimals: number
}

/**
 * Extracts the numeric portion of a display string (e.g. "12.400+", "%99,2",
 * "24/7") and its target value, locale-aware: Turkish uses "." for grouping
 * and "," for decimals, the opposite of English — so the same digit run can
 * mean a different number depending on language.
 */
function parseValue(raw: string, isTurkish: boolean): ParsedValue | null {
  const match = raw.match(/[\d.,]+/)
  if (!match || match.index === undefined) return null

  const numberText = match[0]
  const decimalChar = isTurkish ? ',' : '.'
  const groupChar = isTurkish ? '.' : ','

  const withoutGroups = numberText.split(groupChar).join('')
  const decimals = withoutGroups.includes(decimalChar)
    ? (withoutGroups.split(decimalChar)[1]?.length ?? 0)
    : 0
  const target = parseFloat(withoutGroups.replace(decimalChar, '.'))

  return {
    prefix: raw.slice(0, match.index),
    suffix: raw.slice(match.index + numberText.length),
    target,
    decimals,
  }
}

const DURATION_MS = 1400

export function CountUp({ value }: { value: string }) {
  const { language } = useLanguage()
  const locale = language === 'tr' ? 'tr-TR' : 'en-US'
  const isTurkish = language === 'tr'

  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const parsed = useMemo(() => parseValue(value, isTurkish), [value, isTurkish])
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: parsed?.decimals ?? 0,
        maximumFractionDigits: parsed?.decimals ?? 0,
      }),
    [locale, parsed?.decimals],
  )

  const [display, setDisplay] = useState(() =>
    parsed ? `${parsed.prefix}${formatter.format(0)}${parsed.suffix}` : value,
  )

  useEffect(() => {
    if (!parsed) {
      setDisplay(value)
      return
    }
    if (!isInView) {
      setDisplay(`${parsed.prefix}${formatter.format(0)}${parsed.suffix}`)
      return
    }

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
      setDisplay(`${parsed!.prefix}${formatter.format(current)}${parsed!.suffix}`)

      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, parsed, value, formatter])

  return <span ref={ref}>{display}</span>
}
