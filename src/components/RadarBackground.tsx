import { useEffect, useRef } from 'react'

interface Blip {
  x: number
  y: number
  alpha: number
  decay: number
  size: number
}

export default function RadarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let angle = 0
    const blips: Blip[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const centerX = () => canvas.width / 2
    const centerY = () => canvas.height / 2
    const maxRadius = () => Math.max(canvas.width, canvas.height) * 0.6

    const addBlip = () => {
      const r = Math.random() * maxRadius() * 0.9
      const a = angle + (Math.random() - 0.5) * 0.3
      blips.push({
        x: centerX() + Math.cos(a) * r,
        y: centerY() + Math.sin(a) * r,
        alpha: 0.8 + Math.random() * 0.2,
        decay: 0.003 + Math.random() * 0.005,
        size: 1.5 + Math.random() * 3,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cx = centerX()
      const cy = centerY()
      const mr = maxRadius()

      // Subtle sonar gradient from center
      const sonarGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, mr)
      sonarGrad.addColorStop(0, 'rgba(57, 255, 20, 0.03)')
      sonarGrad.addColorStop(0.5, 'rgba(57, 255, 20, 0.01)')
      sonarGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = sonarGrad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw concentric rings — very faint
      for (let i = 1; i <= 5; i++) {
        const r = (mr / 5) * i
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(57, 255, 20, ${0.02 + i * 0.005})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw crosshairs — barely visible
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.025)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(cx - mr, cy)
      ctx.lineTo(cx + mr, cy)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx, cy - mr)
      ctx.lineTo(cx, cy + mr)
      ctx.stroke()

      // Diagonal lines
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.015)'
      ctx.beginPath()
      ctx.moveTo(cx - mr * 0.707, cy - mr * 0.707)
      ctx.lineTo(cx + mr * 0.707, cy + mr * 0.707)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx + mr * 0.707, cy - mr * 0.707)
      ctx.lineTo(cx - mr * 0.707, cy + mr * 0.707)
      ctx.stroke()

      // Draw sweep as a filled arc with gradient — subtle
      const sweepAngle = 0.6
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      for (let i = 0; i < 40; i++) {
        const a = angle - (sweepAngle / 40) * i
        const alpha = (1 - i / 40) * 0.06
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, mr, a - 0.015, a + 0.015)
        ctx.closePath()
        ctx.fillStyle = `rgba(57, 255, 20, ${alpha})`
        ctx.fill()
      }

      // Main sweep line — thin, subdued
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * mr, cy + Math.sin(angle) * mr)
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.2)'
      ctx.lineWidth = 1.5
      ctx.shadowColor = '#39FF14'
      ctx.shadowBlur = 8
      ctx.stroke()
      ctx.shadowBlur = 0

      ctx.restore()

      // Center dot — small glow
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(57, 255, 20, 0.35)'
      ctx.shadowColor = '#39FF14'
      ctx.shadowBlur = 12
      ctx.fill()
      ctx.shadowBlur = 0

      // Center pulse ring
      const pulseRadius = 6 + Math.sin(Date.now() * 0.002) * 3
      ctx.beginPath()
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(57, 255, 20, 0.15)'
      ctx.lineWidth = 0.5
      ctx.stroke()

      // Draw and update blips — dimmer
      for (let i = blips.length - 1; i >= 0; i--) {
        const b = blips[i]
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(57, 255, 20, ${b.alpha * 0.4})`
        ctx.shadowColor = '#39FF14'
        ctx.shadowBlur = 5
        ctx.fill()
        ctx.shadowBlur = 0

        b.alpha -= b.decay
        if (b.alpha <= 0) {
          blips.splice(i, 1)
        }
      }

      // Advance angle — slow rotation
      angle += 0.008

      // Fewer blips
      if (Math.random() < 0.08) {
        addBlip()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.6 }} />
}
