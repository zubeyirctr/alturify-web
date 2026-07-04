import { useState } from 'react'
import { Calendar } from '@/components/ui/Calendar'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/i18n/LanguageContext'
import { getAvailableSlots } from '@/lib/appointment-slots'
import { cn } from '@/lib/cn'

export function ScheduleWidget() {
  const { t, language } = useLanguage()
  const locale = language === 'tr' ? 'tr-TR' : 'en-US'

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const slots = selectedDate ? getAvailableSlots(selectedDate) : []

  const formattedDate = selectedDate
    ? new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(selectedDate)
    : null

  if (confirmed) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <span className="glass-surface flex h-6 w-6 items-center justify-center rounded-full text-headline-md text-secondary">
          ✓
        </span>
        <h3 className="text-body-lg font-semibold text-on-background">
          {t.appointment.successTitle}
        </h3>
        <p className="text-body-md text-on-surface-variant">{t.appointment.successMessage}</p>
        {formattedDate && selectedTime && (
          <p className="font-tech text-body-md text-primary">
            {formattedDate} — {selectedTime}
          </p>
        )}
        <Button
          variant="secondary"
          size="md"
          className="mt-2"
          onClick={() => {
            setConfirmed(false)
            setSelectedDate(null)
            setSelectedTime(null)
          }}
        >
          {t.appointment.changeButton}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
        {t.appointment.selectDatePrompt}
      </p>
      <Calendar
        locale={locale}
        selectedDate={selectedDate}
        onSelect={(date) => {
          setSelectedDate(date)
          setSelectedTime(null)
        }}
      />

      <p className="mt-1 font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
        {t.appointment.selectTimePrompt}
      </p>

      {!selectedDate && (
        <p className="text-body-md text-on-surface-variant">{t.appointment.selectDatePrompt}</p>
      )}

      {selectedDate && slots.length === 0 && (
        <p className="text-body-md text-on-surface-variant">{t.appointment.noSlotsMessage}</p>
      )}

      {selectedDate && slots.length > 0 && (
        <div className="grid grid-cols-3 gap-1.5">
          {slots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedTime(slot)}
              className={cn(
                'glass-surface rounded-md px-1.5 py-1 font-tech text-body-md transition-all',
                slot === selectedTime
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_12px_2px_var(--glow-indigo-strong)]'
                  : 'text-on-surface hover:bg-surface-container-high hover:shadow-[0_0_12px_0_var(--glow-indigo)]',
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      )}

      <Button
        variant="primary"
        size="lg"
        className="mt-1"
        disabled={!selectedDate || !selectedTime}
        onClick={() => setConfirmed(true)}
      >
        {t.appointment.confirmButton}
      </Button>
    </div>
  )
}
