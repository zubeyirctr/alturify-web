export const ALL_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
]

export function getAvailableSlots(date: Date): string[] {
  const day = date.getDay()
  if (day === 0 || day === 6) return []
  const seed = date.getDate() + date.getMonth() * 31
  return ALL_SLOTS.filter((_, index) => (seed + index) % 3 !== 0)
}
