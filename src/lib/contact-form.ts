export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  problem: 2000,
  expectedSolution: 2000,
} as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Bots tend to fill every field, including ones hidden from real users.
export const HONEYPOT_FIELD_NAME = 'company_website'

// Real users need at least this long to read the form and type into it.
const MIN_SUBMIT_DELAY_MS = 1500

export type ContactFormValues = {
  name: string
  email: string
  problem: string
  expectedSolution: string
}

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, 'required' | 'invalidEmail' | 'tooLong'>>

// Strips characters with no legitimate use in a name/message field and collapses
// whitespace, so nothing resembling markup ever ends up in the submitted payload.
export function sanitizeText(value: string): string {
  return value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim()
}

export function validateContactForm(values: ContactFormValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {}

  for (const field of Object.keys(CONTACT_FIELD_LIMITS) as (keyof ContactFormValues)[]) {
    const value = values[field]
    if (!value) {
      errors[field] = 'required'
      continue
    }
    if (value.length > CONTACT_FIELD_LIMITS[field]) {
      errors[field] = 'tooLong'
    }
  }

  if (values.email && !errors.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = 'invalidEmail'
  }

  return errors
}

// True when the submission looks automated: a honeypot field was filled in,
// or the form was submitted faster than a human could plausibly fill it out.
export function isLikelySpam(formData: FormData, mountedAt: number): boolean {
  const honeypot = formData.get(HONEYPOT_FIELD_NAME)
  if (typeof honeypot === 'string' && honeypot.length > 0) return true
  return Date.now() - mountedAt < MIN_SUBMIT_DELAY_MS
}
