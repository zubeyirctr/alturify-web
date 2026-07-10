const STORAGE_KEY = 'alturify-cookie-consent'

export type CookieConsentChoice = 'accepted' | 'rejected'

export function getCookieConsent(): CookieConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'rejected' ? value : null
  } catch {
    // localStorage can throw in private browsing / storage-disabled contexts.
    return null
  }
}

export function setCookieConsent(choice: CookieConsentChoice): void {
  try {
    localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Ignore — worst case the banner reappears next visit.
  }
}

// Any future analytics/tracking script should gate its initialization on
// this, so nothing non-essential runs before the visitor has accepted.
export function hasAnalyticsConsent(): boolean {
  return getCookieConsent() === 'accepted'
}
