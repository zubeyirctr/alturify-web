import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Badge } from '@/components/ui/Badge'
import { FadeInView } from '@/components/motion/Reveal'
import { useLanguage } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'

export function FAQSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="mx-auto max-w-shell pb-12 lg:pb-24">
      <div className="mb-6 flex flex-col items-start gap-1">
        <Badge tone="secondary">{t.faq.badge}</Badge>
        <h2 className="text-headline-md text-on-background">{t.faq.heading}</h2>
      </div>

      <div className="mx-auto flex max-w-prose flex-col gap-2">
        {t.faq.items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <FadeInView key={item.question} delay={index * 0.05}>
              <div className="glass-surface light-leak rounded-lg">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-3 py-2 text-left"
                >
                  <span className="text-body-md font-semibold text-on-background">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 font-tech text-body-lg text-secondary transition-transform duration-200',
                      isOpen && 'rotate-45',
                    )}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-3 pb-3 text-body-md text-on-surface-variant">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInView>
          )
        })}
      </div>
    </section>
  )
}
