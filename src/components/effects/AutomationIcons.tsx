/**
 * Small SVG glyphs shared by the hero automation loop and the "How It Works"
 * scroll story. Sized around their own origin (roughly -13..13) so callers can
 * position them freely via a wrapping <g transform="translate(...) rotate(...)">.
 * Colored via `currentColor` so a parent's text-color class controls the tint.
 */

export function PaperGlyph({ className }: { className?: string }) {
  return (
    <g className={className}>
      <rect
        x="-9"
        y="-12"
        width="18"
        height="24"
        rx="2"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M3 -12 L3 -6 L9 -6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1="-5" y1="-1" x2="5" y2="-1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="-5" y1="3" x2="5" y2="3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="-5" y1="7" x2="1" y2="7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </g>
  )
}

export function CheckGlyph({ className }: { className?: string }) {
  return (
    <g className={className}>
      <circle
        r="13"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M-6 0 L-1.5 5 L7 -6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}

export function OutputGlyph({ className }: { className?: string }) {
  return (
    <g className={className}>
      <rect
        x="-16"
        y="-14"
        width="32"
        height="28"
        rx="3"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <line x1="-10" y1="6" x2="-10" y2="-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="-2" y1="6" x2="-2" y2="-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="6" x2="6" y2="0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}
