import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { Card } from '@/components/ui/Card'
import { PaperGlyph, CheckGlyph, OutputGlyph } from './AutomationIcons'
import { cn } from '@/lib/cn'

export interface AutomationStageCopy {
  label: string
  title: string
  description: string
  items: string[]
}

const VIEW_W = 800
const VIEW_H = 320
const ALIGNED_Y = 160
const PIPE_X_START = 260
const PIPE_X_END = 660
const OUTPUT_X = 720

const CHAOS_PAPERS = [
  { scattered: { x: 90, y: 60, rotate: -22 }, alignedX: 300, delay: 0 },
  { scattered: { x: 150, y: 215, rotate: 18 }, alignedX: 380, delay: 0.03 },
  { scattered: { x: 65, y: 150, rotate: 8 }, alignedX: 460, delay: 0.06 },
  { scattered: { x: 195, y: 95, rotate: -12 }, alignedX: 540, delay: 0.09 },
  { scattered: { x: 130, y: 265, rotate: 26 }, alignedX: 620, delay: 0.12 },
]

const CHAOS_LINKS: Array<[number, number]> = [
  [0, 2],
  [1, 3],
  [2, 4],
  [0, 4],
]

const DOT_CLASS = ['bg-on-surface-variant', 'bg-primary', 'bg-accent-cyan']

function ChaosParticle({
  progress,
  scattered,
  alignedX,
  delay,
}: {
  progress: MotionValue<number>
  scattered: { x: number; y: number; rotate: number }
  alignedX: number
  delay: number
}) {
  const settleStart = 0.05 + delay
  const settleEnd = 0.45 + delay
  const x = useTransform(progress, [settleStart, settleEnd], [scattered.x, alignedX])
  const y = useTransform(progress, [settleStart, settleEnd], [scattered.y, ALIGNED_Y])
  const rotate = useTransform(progress, [settleStart, settleEnd], [scattered.rotate, 0])
  const messyOpacity = useTransform(progress, [0.55, 0.68], [1, 0])
  const cleanOpacity = useTransform(progress, [0.55, 0.68], [0, 1])

  return (
    <motion.g style={{ x, y, rotate }}>
      <motion.g style={{ opacity: messyOpacity }}>
        <PaperGlyph className="text-on-surface-variant" />
      </motion.g>
      <motion.g style={{ opacity: cleanOpacity }}>
        <CheckGlyph className="text-accent-cyan" />
      </motion.g>
    </motion.g>
  )
}

function PulseRings({ className }: { className?: string }) {
  return (
    <>
      {[0, 1].map((i) => (
        <motion.circle
          key={i}
          r="10"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ opacity: 0.5, scale: 0.7 }}
          animate={{ opacity: [0.5, 0], scale: [0.7, 2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: i * 1 }}
        />
      ))}
    </>
  )
}

function AutomationScene({ progress }: { progress: MotionValue<number> }) {
  const pipelineDashoffset = useTransform(progress, [0.28, 0.58], [1, 0])
  const chaosLinksOpacity = useTransform(progress, [0.12, 0.3], [1, 0])
  const outputOpacity = useTransform(progress, [0.72, 0.86], [0, 1])
  const outputScale = useTransform(progress, [0.72, 0.86], [0.7, 1])

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="h-full w-full"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.g
        style={{ opacity: chaosLinksOpacity }}
        className="text-error/50"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 5"
      >
        {CHAOS_LINKS.map(([a, b], index) => {
          const pa = CHAOS_PAPERS[a].scattered
          const pb = CHAOS_PAPERS[b].scattered
          return <line key={index} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} />
        })}
      </motion.g>

      <motion.line
        x1={PIPE_X_START}
        y1={ALIGNED_Y}
        x2={PIPE_X_END}
        y2={ALIGNED_Y}
        className="text-accent-cyan"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        style={{ strokeDasharray: 1, strokeDashoffset: pipelineDashoffset }}
      />

      {CHAOS_PAPERS.map((paper, index) => (
        <ChaosParticle
          key={index}
          progress={progress}
          scattered={paper.scattered}
          alignedX={paper.alignedX}
          delay={paper.delay}
        />
      ))}

      <motion.g
        style={{
          opacity: outputOpacity,
          scale: outputScale,
          transformOrigin: `${OUTPUT_X}px ${ALIGNED_Y}px`,
        }}
      >
        <g transform={`translate(${OUTPUT_X}, ${ALIGNED_Y})`}>
          <PulseRings className="text-accent-cyan" />
          <OutputGlyph className="text-accent-cyan" />
        </g>
      </motion.g>
    </svg>
  )
}

function StageBullets({ items, toneIndex }: { items: string[]; toneIndex: number }) {
  return (
    <ul className="mt-3 flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-body-md text-on-surface-variant">
          <span className={cn('h-1 w-1 shrink-0 rounded-full', DOT_CLASS[toneIndex])} />
          {item}
        </li>
      ))}
    </ul>
  )
}

function AutomationStaticFrames({ stages }: { stages: AutomationStageCopy[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {stages.map((stage, index) => (
        <Card key={stage.label} className="flex flex-col items-center gap-2 text-center">
          <svg viewBox="0 0 60 60" className="h-14 w-14" role="presentation" aria-hidden="true">
            <g transform="translate(30,30)">
              {index === 0 && <PaperGlyph className="text-on-surface-variant" />}
              {index === 1 && <PaperGlyph className="text-primary" />}
              {index === 2 && <CheckGlyph className="text-accent-cyan" />}
            </g>
          </svg>
          <span className="font-tech text-label-caps uppercase tracking-[0.1em] text-accent-cyan">
            {String(index + 1).padStart(2, '0')} — {stage.label}
          </span>
          <h3 className="text-body-lg font-semibold text-on-background">{stage.title}</h3>
          <p className="text-body-md text-on-surface-variant">{stage.description}</p>
          <div className="text-left">
            <StageBullets items={stage.items} toneIndex={index} />
          </div>
        </Card>
      ))}
    </div>
  )
}

export function AutomationScrollStory({ stages }: { stages: AutomationStageCopy[] }) {
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

  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const [activeStage, setActiveStage] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(stages.length - 1, Math.max(0, Math.floor(latest * stages.length)))
    setActiveStage(index)
  })

  if (prefersReducedMotion || !isDesktop) {
    return <AutomationStaticFrames stages={stages} />
  }

  const stage = stages[activeStage]

  return (
    <div ref={containerRef} className="relative h-[280vh]">
      <div className="sticky top-[104px]">
        <div className="glass-surface light-leak extruded-glow rounded-lg p-4 md:p-6">
          <div className="mb-4 flex items-center justify-center gap-2">
            {stages.map((s, index) => (
              <span
                key={s.label}
                className={cn(
                  'h-1 w-10 rounded-full transition-colors duration-300',
                  index === activeStage ? 'bg-accent-cyan' : 'bg-outline-variant/40',
                )}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1.4fr_1fr] md:gap-8">
            <div className="relative aspect-[5/2] w-full overflow-hidden rounded-md">
              <AutomationScene progress={scrollYProgress} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-tech text-label-caps uppercase tracking-[0.1em] text-accent-cyan">
                  {String(activeStage + 1).padStart(2, '0')} — {stage.label}
                </span>
                <h3 className="mt-1 text-headline-md text-on-background">{stage.title}</h3>
                <p className="mt-1 text-body-md text-on-surface-variant">{stage.description}</p>
                <StageBullets items={stage.items} toneIndex={activeStage} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
