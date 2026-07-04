import { useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
  createdAt: number
}

const TRAIL_LIFETIME_MS = 1000
const MIN_SPAWN_DISTANCE = 6
const MAX_POINTS = 60

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFinePointer) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = window.innerWidth
    let height = window.innerHeight

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = Math.floor(width * dpr)
      canvas!.height = Math.floor(height * dpr)
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.scale(dpr, dpr)
    }

    const points: TrailPoint[] = []
    let lastX = -Infinity
    let lastY = -Infinity

    function handlePointerMove(event: PointerEvent) {
      const dx = event.clientX - lastX
      const dy = event.clientY - lastY
      if (dx * dx + dy * dy < MIN_SPAWN_DISTANCE * MIN_SPAWN_DISTANCE) return
      lastX = event.clientX
      lastY = event.clientY
      points.push({ x: event.clientX, y: event.clientY, createdAt: performance.now() })
      if (points.length > MAX_POINTS) points.shift()
    }

    let rafId = 0
    function frame() {
      const now = performance.now()
      while (points.length && now - points[0].createdAt > TRAIL_LIFETIME_MS) points.shift()

      ctx!.clearRect(0, 0, width, height)
      ctx!.globalCompositeOperation = 'lighter'

      for (const point of points) {
        const t = 1 - (now - point.createdAt) / TRAIL_LIFETIME_MS
        if (t <= 0) continue
        const radius = 1 + 2 * t

        const gradient = ctx!.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius)
        gradient.addColorStop(0, `rgba(192, 193, 255, ${0.3 * t})`)
        gradient.addColorStop(0.55, `rgba(183, 109, 255, ${0.14 * t})`)
        gradient.addColorStop(1, 'rgba(183, 109, 255, 0)')

        ctx!.fillStyle = gradient
        ctx!.beginPath()
        ctx!.arc(point.x, point.y, radius, 0, Math.PI * 2)
        ctx!.fill()
      }

      rafId = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    rafId = requestAnimationFrame(frame)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90]"
    />
  )
}
