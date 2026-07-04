import { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Calendar } from '@/components/ui/Calendar'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/i18n/LanguageContext'
import { useAppointmentModal } from '@/context/AppointmentModalContext'
import { getAvailableSlots } from '@/lib/appointment-slots'
import { cn } from '@/lib/cn'

export function AppointmentModal() {
  const { t, language } = useLanguage()
  const { isOpen, close } = useAppointmentModal()
  const locale = language === 'tr' ? 'tr-TR' : 'en-US'

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setSelectedDate(null)
        setSelectedTime(null)
        setConfirmed(false)
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  const slots = selectedDate ? getAvailableSlots(selectedDate) : []

  const formattedDate = selectedDate
    ? new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(selectedDate)
    : null

  return (
    <Modal open={isOpen} onClose={close} labelledBy="appointment-modal-title" className="max-w-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="appointment-modal-title" className="text-headline-md text-on-background">
            {t.appointment.title}
          </h2>
          <p className="mt-1 text-body-md text-on-surface-variant">{t.appointment.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label={t.appointment.closeButton}
          className="glow-ring flex h-4 w-4 shrink-0 items-center justify-center rounded-md text-body-lg text-on-surface-variant transition-colors hover:text-on-background"
        >
          ×
        </button>
      </div>

      {confirmed ? (
        <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
          <span className="glass-surface flex h-6 w-6 items-center justify-center rounded-full text-headline-md text-secondary">
            ✓
          </span>
          <h3 className="text-body-lg font-semibold text-on-background">
            {t.appointment.successTitle}
          </h3>
          <p className="max-w-prose text-body-md text-on-surface-variant">
            {t.appointment.successMessage}
          </p>
          {formattedDate && selectedTime && (
            <p className="font-tech text-body-md text-primary">
              {formattedDate} — {selectedTime}
            </p>
          )}
          <Button variant="secondary" size="md" className="mt-2" onClick={close}>
            {t.appointment.closeButton}
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
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
            </div>

            <div>
              <p className="mb-2 font-tech text-label-caps uppercase tracking-[0.1em] text-on-surface-variant">
                {t.appointment.selectTimePrompt}
              </p>

              {!selectedDate && (
                <p className="text-body-md text-on-surface-variant">
                  {t.appointment.selectDatePrompt}
                </p>
              )}

              {selectedDate && slots.length === 0 && (
                <p className="text-body-md text-on-surface-variant">
                  {t.appointment.noSlotsMessage}
                </p>
              )}

              {selectedDate && slots.length > 0 && (
                <div className="grid grid-cols-3 gap-1.5">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={cn(
                        'glass-surface rounded-md px-1.5 py-1 font-tech text-body-md transition-colors',
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
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2 border-t border-outline-variant/40 pt-4">
            {formattedDate && selectedTime && (
              <p className="text-body-md text-on-surface-variant">
                {formattedDate} — <span className="text-on-background">{selectedTime}</span>
              </p>
            )}
            <Button
              variant="primary"
              size="lg"
              disabled={!selectedDate || !selectedTime}
              onClick={() => setConfirmed(true)}
            >
              {t.appointment.confirmButton}
            </Button>
          </div>
        </>
      )}
    </Modal>
  )
}
