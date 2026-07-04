import { useEffect, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { PaperGlyph, CheckGlyph } from './AutomationIcons'

const NODE_X = 280
const START_X = -20
const END_X = 580
const CYCLE_DURATION = 7.2
const TIMES = [0, 0.44, 0.56, 1]

const PACKETS = [
  { delay: 0, y: -16, rotate: -18 },
  { delay: 2.4, y: 8, rotate: 16 },
  { delay: 4.8, y: -4, rotate: -10 },
]

function AnimatedPacket({ delay, y, rotate }: { delay: number; y: number; rotate: number }) {
  const shared = { duration: CYCLE_DURATION, repeat: Infinity, delay, times: TIMES, ease: 'easeInOut' as const }

  return (
    <motion.g
      initial={{ x: START_X, y, rotate }}
      animate={{
        x: [START_X, NODE_X, NODE_X, END_X],
        y: [y, 0, 0, 0],
        rotate: [rotate, 0, 0, 0],
      }}
      transition={shared}
    >
      <motion.g animate={{ opacity: [1, 1, 0, 0] }} transition={shared}>
        <PaperGlyph className="text-on-surface-variant" />
      </motion.g>
      <motion.g animate={{ opacity: [0, 0, 1, 1] }} transition={shared}>
        <CheckGlyph className="text-accent-cyan" />
      </motion.g>
    </motion.g>
  )
}

const ringVariants: Variants = {
  animate: {
    opacity: [0.6, 0],
    scale: [0.6, 2.4],
  },
}

export function AutomationLoop({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia('(min-width: 768px)').matches,
  )

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const onChange = () => setIsDesktop(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const animate = !prefersReducedMotion && isDesktop

  return (
    <svg
      viewBox="0 0 560 90"
      className={className}
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <line
        x1="20"
        y1="45"
        x2="540"
        y2="45"
        className="text-outline-variant"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />

      <g transform={`translate(${NODE_X}, 45)`}>
        {animate &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r="6"
              className="text-accent-cyan"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              variants={ringVariants}
              animate="animate"
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: i * 0.7 }}
            />
          ))}
        <circle
          r="6"
          className="text-accent-cyan"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>

      {animate ? (
        PACKETS.map((packet, index) => <AnimatedPacket key={index} {...packet} />)
      ) : (
        <g transform={`translate(${END_X - 30}, 45)`} className="text-accent-cyan">
          <CheckGlyph />
        </g>
      )}
    </svg>
  )
}
