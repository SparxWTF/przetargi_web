import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ── terminal log lines ── */
const terminalLines = [
  { prefix: '[BZP]', text: 'Połączono ze źródłem danych...', delay: 0 },
  { prefix: '[BZP]', text: 'Pobrano 2,847 nowych ogłoszeń', delay: 800 },
  { prefix: '[TED]', text: 'Skanowanie europejskich zamówień...', delay: 1600 },
  { prefix: '[TED]', text: 'Znaleziono 412 przetargów z kategorii medycznej', delay: 2400 },
  { prefix: '[RADAR]', text: 'Uruchamianie modelu dopasowań...', delay: 3200 },
  { prefix: '[RADAR]', text: 'Analiza CPV: 33141000 → dopasowanie 94.2%', delay: 4000 },
  { prefix: '[RADAR]', text: 'Analiza CPV: 33162000 → dopasowanie 87.6%', delay: 4800 },
  { prefix: '[APP]', text: 'Czyszczenie i walidacja wyników...', delay: 5600 },
  { prefix: '[APP]', text: 'Generowanie powiadomień → 23 dopasowania', delay: 6400 },
  { prefix: '[RYNEK]', text: 'Aktualizacja danych rynkowych...', delay: 7200 },
  { prefix: '[RYNEK]', text: 'Trendy: wzrost +12% w segmencie ortopedycznym', delay: 8000 },
  { prefix: '[OK]', text: 'Pipeline zakończony — gotowe do przeglądu', delay: 8800 },
]

/* ── diagram node definitions (% based positions for SVG viewBox 1000×520) ── */
// Source DB nodes (scattered left)
const sources = [
  { id: 'bzp', label: 'BZP', x: 60, y: 80 },
  { id: 'ted', label: 'TED', x: 40, y: 180 },
  { id: 'gus', label: 'GUS', x: 75, y: 280 },
  { id: 'nfz', label: 'NFZ', x: 30, y: 370 },
]

// Main pipeline nodes
const pipeNodes = [
  { id: 'fetch', num: '01', label: 'POBIERANIE\nDANYCH', status: 'FETCHING', x: 250, y: 260 },
  { id: 'radar', num: '02', label: 'RADAR\nMODEL', status: 'PROCESSING', x: 460, y: 260 },
  { id: 'notify', num: '03', label: 'WYNIKI', status: 'NOTIFYING', x: 670, y: 260 },
  { id: 'market', num: '04', label: 'ANALIZA\nRYNKU', status: 'ANALYZING', x: 880, y: 260 },
]

// Descriptions below nodes
const descriptions = [
  { x: 250, y: 395, text: 'Automatycznie skanujemy BZP,', text2: 'TED i inne źródła 24/7' },
  { x: 460, y: 395, text: 'Algorytm analizuje treść', text2: 'i porównuje z Twoimi produktami' },
  { x: 670, y: 395, text: 'Gotowe dopasowania z oceną', text2: 'trafności — reagujesz na najlepsze' },
  { x: 880, y: 395, text: 'Trendy rynkowe, wolumen', text2: 'i dane publiczne o zamawiających' },
]

/* ── animated particle along a path ── */
function Particle({ path, delay, dur }: { path: string; delay: number; dur: number }) {
  return (
    <>
      <circle r="3" fill="#39FF14" opacity="0">
        <animateMotion path={path} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
        <animate
          attributeName="opacity"
          values="0;0.9;0.9;0"
          dur={`${dur}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </circle>
      <circle r="6" fill="#39FF14" opacity="0">
        <animateMotion path={path} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
        <animate
          attributeName="opacity"
          values="0;0.15;0.15;0"
          dur={`${dur}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </circle>
    </>
  )
}

/* ── hexagon shape for main nodes ── */
function hexPoints(cx: number, cy: number, r: number) {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return pts.join(' ')
}

/* ── main component ── */
export default function ProcessFlow() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const cycleRef = useRef(0)

  useEffect(() => {
    const CYCLE_MS = 11000

    function runCycle() {
      const cycle = ++cycleRef.current
      setVisibleLines([])
      const ids: ReturnType<typeof setTimeout>[] = []
      terminalLines.forEach((line, i) => {
        ids.push(
          setTimeout(() => {
            if (cycleRef.current !== cycle) return
            setVisibleLines((prev) => [...prev, i])
          }, line.delay),
        )
      })
      return ids
    }

    let timeoutIds = runCycle()
    const interval = setInterval(() => {
      timeoutIds.forEach(clearTimeout)
      timeoutIds = runCycle()
    }, CYCLE_MS)

    return () => {
      clearInterval(interval)
      timeoutIds.forEach(clearTimeout)
      cycleRef.current = -1
    }
  }, [])

  const prefixColor = (prefix: string) => {
    if (prefix.includes('OK')) return '#4ade80'
    if (prefix.includes('APP')) return '#6ee770'
    if (prefix.includes('RYNEK')) return '#4ade80'
    return '#39FF14'
  }

  // Connection paths (source → fetch)
  const srcPaths = sources.map((s) => `M${s.x},${s.y} C${s.x + 80},${s.y} ${250 - 80},260 250,260`)

  // Pipeline paths (node → node)
  const pipePaths = [
    `M${250 + 48},260 L${460 - 48},260`,
    `M${460 + 48},260 L${670 - 48},260`,
    `M${670 + 48},260 L${880 - 48},260`,
  ]

  return (
    <div className="space-y-10">
      {/* ── Network Diagram ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Desktop SVG diagram */}
        <svg
          viewBox="0 0 1000 470"
          className="w-full hidden md:block"
          style={{ filter: 'drop-shadow(0 0 1px rgba(57,255,20,0.2))' }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="g" />
              <feMerge>
                <feMergeNode in="g" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#39FF14" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#39FF14" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#39FF14" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Source → Fetch connections */}
          {srcPaths.map((d, i) => (
            <g key={`src-${i}`}>
              <path d={d} fill="none" stroke="#39FF14" strokeWidth="1" opacity="0.12" strokeDasharray="4 4" />
              <Particle path={d} delay={i * 0.8} dur={2.5} />
            </g>
          ))}

          {/* Pipeline connections */}
          {pipePaths.map((d, i) => (
            <g key={`pipe-${i}`}>
              <line
                x1={pipeNodes[i].x + 48}
                y1={260}
                x2={pipeNodes[i + 1].x - 48}
                y2={260}
                stroke="url(#lineGrad)"
                strokeWidth="2"
              />
              {/* Arrow head */}
              <polygon
                points={`${pipeNodes[i + 1].x - 52},255 ${pipeNodes[i + 1].x - 48},260 ${pipeNodes[i + 1].x - 52},265`}
                fill="#39FF14"
                opacity="0.3"
              />
              <Particle path={d} delay={i * 0.6 + 1} dur={1.8} />
              <Particle path={d} delay={i * 0.6 + 2.2} dur={1.8} />
            </g>
          ))}

          {/* Source DB nodes */}
          {sources.map((s, i) => (
            <g key={s.id}>
              {/* Outer pulse */}
              <circle cx={s.x} cy={s.y} r="18" fill="none" stroke="#39FF14" strokeWidth="0.5" opacity="0.15">
                <animate attributeName="r" values="18;24;18" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                <animate
                  attributeName="opacity"
                  values="0.15;0.05;0.15"
                  dur="3s"
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Node circle */}
              <circle cx={s.x} cy={s.y} r="18" fill="rgba(5,15,5,0.9)" stroke="#39FF14" strokeWidth="1" opacity="0.5" />
              {/* DB icon lines */}
              <ellipse
                cx={s.x}
                cy={s.y - 4}
                rx="8"
                ry="4"
                fill="none"
                stroke="#39FF14"
                strokeWidth="0.8"
                opacity="0.6"
              />
              <line
                x1={s.x - 8}
                y1={s.y - 4}
                x2={s.x - 8}
                y2={s.y + 4}
                stroke="#39FF14"
                strokeWidth="0.8"
                opacity="0.4"
              />
              <line
                x1={s.x + 8}
                y1={s.y - 4}
                x2={s.x + 8}
                y2={s.y + 4}
                stroke="#39FF14"
                strokeWidth="0.8"
                opacity="0.4"
              />
              <ellipse
                cx={s.x}
                cy={s.y + 4}
                rx="8"
                ry="4"
                fill="none"
                stroke="#39FF14"
                strokeWidth="0.8"
                opacity="0.4"
              />
              {/* Label */}
              <text
                x={s.x}
                y={s.y + 28}
                textAnchor="middle"
                fill="#39FF14"
                fontSize="10"
                fontFamily="monospace"
                opacity="0.6"
              >
                {s.label}
              </text>
            </g>
          ))}

          {/* Main pipeline nodes (hexagons) */}
          {pipeNodes.map((node, i) => (
            <g key={node.id}>
              {/* Outer glow pulse */}
              <polygon
                points={hexPoints(node.x, node.y, 50)}
                fill="none"
                stroke="#39FF14"
                strokeWidth="0.5"
                opacity="0.1"
              >
                <animate
                  attributeName="opacity"
                  values="0.1;0.25;0.1"
                  dur="3s"
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </polygon>
              {/* Hex body */}
              <polygon
                points={hexPoints(node.x, node.y, 44)}
                fill="rgba(5,15,5,0.95)"
                stroke="#39FF14"
                strokeWidth="1.5"
                opacity="0.7"
                filter="url(#glow)"
              />
              {/* Inner hex accent */}
              <polygon
                points={hexPoints(node.x, node.y, 34)}
                fill="none"
                stroke="#39FF14"
                strokeWidth="0.3"
                opacity="0.2"
              />

              {/* Step number */}
              <text
                x={node.x}
                y={node.y - 10}
                textAnchor="middle"
                fill="#39FF14"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="900"
                opacity="0.4"
              >
                {node.num}
              </text>
              {/* Label (2 lines) */}
              {node.label.split('\n').map((line, li) => (
                <text
                  key={li}
                  x={node.x}
                  y={node.y + 5 + li * 13}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  letterSpacing="1"
                >
                  {line}
                </text>
              ))}

              {/* Status badge below hex */}
              <rect
                x={node.x - 28}
                y={node.y + 50}
                width="56"
                height="16"
                rx="3"
                fill="rgba(57,255,20,0.06)"
                stroke="#39FF14"
                strokeWidth="0.5"
                opacity="0.4"
              />
              <text
                x={node.x}
                y={node.y + 62}
                textAnchor="middle"
                fill="#39FF14"
                fontSize="7"
                fontFamily="monospace"
                opacity="0.5"
              >
                {node.status}
              </text>
              {/* Animated dot in status */}
              <circle cx={node.x - 22} cy={node.y + 58} r="1.5" fill="#39FF14">
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="1.5s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}

          {/* Descriptions below each node */}
          {descriptions.map((d, i) => (
            <g key={`desc-${i}`}>
              <text x={d.x} y={d.y} textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="sans-serif">
                {d.text}
              </text>
              <text x={d.x} y={d.y + 14} textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="sans-serif">
                {d.text2}
              </text>
            </g>
          ))}
        </svg>

        {/* Mobile: vertical list fallback */}
        <div className="md:hidden space-y-6">
          {pipeNodes.map((node, i) => (
            <motion.div
              key={node.id}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              {/* Hex icon */}
              <div className="shrink-0 relative">
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <polygon
                    points={hexPoints(28, 28, 26)}
                    fill="rgba(5,15,5,0.95)"
                    stroke="#39FF14"
                    strokeWidth="1.2"
                    opacity="0.7"
                  />
                  <text
                    x="28"
                    y="24"
                    textAnchor="middle"
                    fill="#39FF14"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="900"
                    opacity="0.4"
                  >
                    {node.num}
                  </text>
                  <text
                    x="28"
                    y="36"
                    textAnchor="middle"
                    fill="#39FF14"
                    fontSize="6"
                    fontFamily="monospace"
                    opacity="0.6"
                  >
                    {node.status}
                  </text>
                </svg>
                {/* Vertical connector line */}
                {i < pipeNodes.length - 1 && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full w-px h-6"
                    style={{ background: 'rgba(57,255,20,0.2)' }}
                  />
                )}
              </div>
              {/* Text */}
              <div className="pt-1">
                <h3 className="text-white font-bold text-sm tracking-wider mb-1">{node.label.replace('\n', ' ')}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {descriptions[i].text} {descriptions[i].text2}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Terminal / Command Line Log ── */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div
          className="rounded-xl overflow-hidden border border-neon-green/10"
          style={{ background: 'rgba(2,4,2,0.95)' }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 border-b border-neon-green/10"
            style={{ background: 'rgba(57,255,20,0.03)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#39FF14', opacity: 0.4 }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#39FF14', opacity: 0.2 }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#39FF14', opacity: 0.1 }} />
            </div>
            <span className="text-[10px] font-mono ml-2" style={{ color: '#39FF14', opacity: 0.5 }}>
              radar-pipeline — live
            </span>
          </div>
          {/* Terminal body */}
          <div className="p-4 h-56 overflow-hidden font-mono text-xs leading-relaxed">
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                className="flex gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ color: prefixColor(line.prefix), opacity: 0.7 }}>{line.prefix}</span>
                <span className="text-slate-500">{line.text}</span>
              </motion.div>
            ))}
            {/* Blinking cursor */}
            <div className="flex items-center gap-1 mt-1">
              <span style={{ color: '#39FF14', opacity: 0.5 }}>{'>'}</span>
              <motion.span
                className="inline-block w-2 h-3.5"
                style={{ background: '#39FF14' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
