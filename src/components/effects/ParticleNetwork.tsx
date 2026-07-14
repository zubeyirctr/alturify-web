import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

const NODE_COUNT = 40
const LINK_DISTANCE = 130
const SPEED = 0.15

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Decorative only — skip entirely on mobile and when motion is reduced,
    // rather than just hiding it visually, to avoid wasted CPU/battery.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    if (prefersReducedMotion || !isDesktop) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let nodes: Node[] = []

    // The hero's box size isn't stable at mount — web fonts swapping in
    // reflow it after first paint, and a plain 'resize' window listener
    // only fires for actual viewport changes, not content-driven ones. If
    // the canvas backing store is sized before that settles, it's stuck at
    // the wrong dimensions forever and the browser stretches it to fit,
    // inflating every node/line. ResizeObserver reports the real box size
    // whenever it changes, including that first reflow.
    function resize() {
      const nextWidth = canvas!.clientWidth
      const nextHeight = canvas!.clientHeight
      if (nextWidth === 0 || nextHeight === 0) return

      width = nextWidth
      height = nextHeight
      canvas!.width = Math.floor(width * dpr)
      canvas!.height = Math.floor(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (nodes.length === 0) {
        nodes = Array.from({ length: NODE_COUNT }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
        }))
      }
    }

    let rafId = 0
    function frame() {
      if (width === 0 || height === 0) {
        rafId = requestAnimationFrame(frame)
        return
      }

      ctx!.clearRect(0, 0, width, height)

      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * 0.3
            ctx!.strokeStyle = `rgba(128, 131, 255, ${opacity})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      for (const node of nodes) {
        ctx!.fillStyle = 'rgba(192, 193, 255, 0.55)'
        ctx!.beginPath()
        ctx!.arc(node.x, node.y, 1.6, 0, Math.PI * 2)
        ctx!.fill()
      }

      rafId = requestAnimationFrame(frame)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    rafId = requestAnimationFrame(frame)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
    />
  )
}
