import { useState } from 'react'
import { cn } from '@/lib/cn'

export interface CalendarProps {
  locale: string
  selectedDate: Date | null
  onSelect: (date: Date) => void
  minDate?: Date
}

function startOfDay(date: Date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getMonthCells(viewedMonth: Date) {
  const year = viewedMonth.getFullYear()
  const month = viewedMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekdayMondayIndexed = (firstDay.getDay() + 6) % 7

  const cells: (Date | null)[] = []
  for (let i = 0; i < firstWeekdayMondayIndexed; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day))
  return cells
}

function getWeekdayLabels(locale: string) {
  return Array.from({ length: 7 }, (_, i) => {
    const reference = new Date(2024, 0, 1 + i) // 2024-01-01 is a Monday
    return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(reference)
  })
}

export function Calendar({ locale, selectedDate, onSelect, minDate }: CalendarProps) {
  const today = startOfDay(new Date())
  const floor = minDate ? startOfDay(minDate) : today
  const [viewedMonth, setViewedMonth] = useState(
    () => new Date((selectedDate ?? today).getFullYear(), (selectedDate ?? today).getMonth(), 1),
  )

  const cells = getMonthCells(viewedMonth)
  const weekdayLabels = getWeekdayLabels(locale)
  const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    viewedMonth,
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewedMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
          className="glow-ring flex h-4 w-4 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:text-on-background"
          aria-label="Previous month"
        >
          ‹
        </button>
        <p className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-background">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => setViewedMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
          className="glow-ring flex h-4 w-4 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:text-on-background"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdayLabels.map((label) => (
          <span
            key={label}
            className="flex h-3 items-center justify-center text-label-caps uppercase text-on-surface-variant"
          >
            {label}
          </span>
        ))}

        {cells.map((date, index) => {
          if (!date) return <span key={`blank-${index}`} />

          const disabled = date < floor
          const selected = selectedDate ? isSameDay(date, selectedDate) : false
          const isToday = isSameDay(date, today)

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={cn(
                'flex h-4 w-4 items-center justify-center rounded-md text-body-md transition-all',
                disabled && 'pointer-events-none text-on-surface-variant/30',
                !disabled && !selected && 'text-on-surface hover:bg-surface-container-high',
                !selected && isToday && 'outline outline-1 outline-secondary/60',
                selected &&
                  'bg-primary-container text-on-primary-container shadow-[0_0_12px_2px_var(--glow-indigo-strong)]',
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
