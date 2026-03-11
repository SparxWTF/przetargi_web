import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import RadarBackground from './components/RadarBackground'
import ProcessFlow from './components/ProcessFlow'
import {
  Search,
  Radar,
  BarChart3,
  Users,
  Mail,
  LogIn,
  Target,
  Loader,
  Zap,
  Eye,
  TrendingUp,
  Activity,
  Cpu,
  Database,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

function App() {
  const [typingText, setTypingText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const phrases = useMemo(
    () => [
      'skanuje rynek zamówień...',
      'analizuje Twoje produkty...',
      'znajduje idealne dopasowania...',
      'monitoruje konkurencję...',
      'optymalizuje strategię...',
    ],
    [],
  )

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    if (!isDeleting) {
      if (charIndex < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setTypingText(currentPhrase.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, 35)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setTypingText(currentPhrase.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, 15)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(false)
          setPhraseIndex((phraseIndex + 1) % phrases.length)
        }, 0)
        return () => clearTimeout(timeout)
      }
    }
  }, [charIndex, isDeleting, phraseIndex, phrases])

  useEffect(() => {
    const particleContainer = document.getElementById('particles')
    if (particleContainer && particleContainer.childElementCount === 0) {
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div')
        p.className = 'particle'
        const size = Math.random() * 4 + 2
        p.style.width = size + 'px'
        p.style.height = size + 'px'
        p.style.left = Math.random() * 100 + '%'
        p.style.animationDuration = Math.random() * 10 + 8 + 's'
        p.style.animationDelay = Math.random() * 10 + 's'
        particleContainer.appendChild(p)
      }
    }
  }, [])

  const navItems = [
    { href: '#funkcje', icon: Target, label: 'Funkcje' },
    { href: '#jak-dziala', icon: Radar, label: 'Jak działa' },
    { href: '#dla-kogo', icon: Users, label: 'Dla kogo' },
    { href: '#kontakt', icon: Mail, label: 'Kontakt' },
  ]

  return (
    <div className="min-h-screen flex flex-col text-white relative bg-cyber-black">
      {/* ═══ BACKGROUND LAYERS ═══ */}
      <RadarBackground />
      <div className="cyber-grid-bg fixed inset-0 z-0"></div>
      <div className="grid-bg fixed inset-0 z-0"></div>

      {/* Subtle sonar glow — single green */}
      <div
        className="fixed"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(57,255,20,0.06) 0%, rgba(57,255,20,0.02) 30%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      ></div>

      {/* Data Streams */}
      <div
        className="data-stream-enhanced flex items-center gap-1"
        style={{ left: '3%', animationDelay: '0s', top: '10%' }}
      >
        <Zap className="w-2 h-2 text-neon-green" /> SKANOWANIE:AKTYWNE <Zap className="w-2 h-2 text-neon-green" />{' '}
        DOPASOWANIE:0.94 <Zap className="w-2 h-2 text-neon-green" /> CPV:33141000
      </div>
      <div
        className="data-stream-enhanced flex items-center gap-1"
        style={{ left: '25%', animationDelay: '4s', top: '18%' }}
      >
        <Eye className="w-2 h-2 text-neon-green" /> ANALIZA:PRZETWARZANIE <Cpu className="w-2 h-2 text-neon-green" />{' '}
        SILNIK:AKTYWNY
      </div>
      <div
        className="data-stream-enhanced flex items-center gap-1"
        style={{ left: '55%', animationDelay: '8s', top: '6%' }}
      >
        <Database className="w-2 h-2 text-neon-green" /> RYNEK:MONITOROWANY{' '}
        <TrendingUp className="w-2 h-2 text-neon-green" /> SZANSE:127
      </div>
      <div
        className="data-stream-enhanced flex items-center gap-1"
        style={{ left: '75%', animationDelay: '12s', top: '22%' }}
      >
        <Radar className="w-2 h-2 text-neon-green" /> RADAR:ONLINE <Activity className="w-2 h-2 text-neon-green" />{' '}
        TRAFNOŚĆ:94.7%
      </div>

      {/* Particles */}
      <div id="particles" className="fixed inset-0 pointer-events-none z-0"></div>

      {/* ═══ NAVBAR ═══ */}
      <nav
        className="sticky top-0 z-50 border-b border-neon-green/10"
        style={{ background: 'rgba(2,2,4,0.92)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-0">
          {/* Logo: radar icon + name */}
          <a href="/" className="flex items-center gap-2.5 py-3 group">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              {/* Rings */}
              <circle cx="16" cy="16" r="13" stroke="#39FF14" strokeWidth="1" opacity="0.25" />
              <circle cx="16" cy="16" r="9" stroke="#39FF14" strokeWidth="0.8" opacity="0.2" />
              <circle cx="16" cy="16" r="5" stroke="#39FF14" strokeWidth="0.6" opacity="0.15" />
              {/* Crosshairs */}
              <line x1="16" y1="2" x2="16" y2="30" stroke="#39FF14" strokeWidth="0.4" opacity="0.12" />
              <line x1="2" y1="16" x2="30" y2="16" stroke="#39FF14" strokeWidth="0.4" opacity="0.12" />
              {/* Sweep */}
              <line
                x1="16"
                y1="16"
                x2="27"
                y2="7"
                stroke="#39FF14"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 16 16"
                  to="360 16 16"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </line>
              <path d="M16,16 L27,7 A13,13 0 0,0 16,3 Z" fill="#39FF14" opacity="0.06">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 16 16"
                  to="360 16 16"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
              {/* Center */}
              <circle cx="16" cy="16" r="1.5" fill="#39FF14" opacity="0.6" />
              {/* Blip */}
              <circle cx="22" cy="10" r="1" fill="#39FF14" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            <span className="text-base font-black tracking-tight glitch-text" data-text="PRZETARGI RADAR">
              PRZETARGI RADAR
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link flex items-center gap-1.5 text-xs">
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </a>
            ))}
            <a href="/accounts/login/" className="neon-button ml-4 text-xs !py-2 !px-4 flex items-center gap-1.5">
              <LogIn className="w-3.5 h-3.5" /> ZALOGUJ
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-neon-green p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t border-neon-green/10 px-4 py-4 flex flex-col gap-2"
            style={{ background: 'rgba(10,10,10,0.95)' }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="nav-link flex items-center gap-2 py-2 text-sm"
              >
                <item.icon className="w-4 h-4 text-neon-green" />
                {item.label}
              </a>
            ))}
            <a href="/accounts/login/" className="neon-button mt-2 text-center text-sm !py-2.5">
              <LogIn className="w-4 h-4 inline mr-2" /> ZALOGUJ SIĘ
            </a>
          </motion.div>
        )}
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-24">
        {/* Scan Line */}
        <div className="scan-line"></div>

        {/* Hero Radar Icon */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: 'spring' }}
        >
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border border-neon-green/10 animate-spin"
              style={{ animationDuration: '8s' }}
            ></div>
            {/* Middle ring */}
            <div
              className="absolute inset-2 rounded-full border border-dashed border-neon-green/20 animate-spin"
              style={{ animationDuration: '12s', animationDirection: 'reverse' }}
            ></div>
            {/* Inner glow */}
            <div
              className="absolute inset-4 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.1) 0%, transparent 70%)' }}
            ></div>
            {/* Search icon */}
            <Search
              className="w-10 h-10 absolute"
              style={{ color: '#39FF14', opacity: 0.15, transform: 'rotate(-15deg)' }}
            />
            {/* Radar icon */}
            <Radar
              className="w-16 h-16 relative"
              style={{ color: '#39FF14', filter: 'drop-shadow(0 0 15px rgba(57,255,20,0.6))' }}
            />
          </div>
        </motion.div>

        {/* Glitch Title */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none">
            <span className="text-white">PRZETARGI</span>
            <br className="sm:hidden" />
            <span className="glitch-text ml-2 sm:ml-4" data-text="RADAR">
              RADAR
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="text-base md:text-xl text-slate-400 text-center mb-4 tracking-wide max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Inteligentne dopasowania zamówień publicznych
        </motion.p>

        <motion.p
          className="text-sm md:text-lg text-slate-500 text-center max-w-2xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Jeden system, <span className="text-white font-semibold">tysiące przetargów</span>, dopasowanych do Twojej
          oferty — algorytm szuka, Ty decydujesz
        </motion.p>

        {/* Typing Effect Terminal */}
        <motion.div
          className="cyber-border rounded-xl px-6 sm:px-8 py-4 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 shrink-0" style={{ color: '#39FF14' }} />
            <span className="text-sm font-mono shrink-0" style={{ color: '#39FF14', opacity: 0.7 }}>
              RADAR:&gt;
            </span>
            <span className="text-sm font-mono" style={{ color: '#39FF14' }}>
              {typingText}
            </span>
            <span className="typing-cursor"></span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="/accounts/login/" className="neon-button flex items-center justify-center gap-2 text-sm !py-3 !px-8">
            <Radar className="w-4 h-4" /> URUCHOM RADAR
          </a>
          <a
            href="#funkcje"
            className="flex items-center justify-center gap-2 text-sm py-3 px-8 rounded-lg border border-slate-700 text-slate-400 hover:border-neon-green/30 hover:text-neon-green transition-all"
          >
            <ChevronDown className="w-4 h-4" /> DOWIEDZ SIĘ WIĘCEJ
          </a>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="cyber-border corner-accents rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold tracking-wider" style={{ color: '#39FF14', opacity: 0.8 }}>
                STATUS SYSTEMU
              </span>
              <span
                className="text-[10px] font-mono px-3 py-1 rounded border"
                style={{ color: '#39FF14', borderColor: 'rgba(57,255,20,0.4)', background: 'rgba(57,255,20,0.08)' }}
              >
                AKTYWNY
              </span>
            </div>
            <div className="relative">
              <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(30,41,59,0.8)' }}>
                <div className="progress-glow h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] mt-3 font-mono">
                <span className="text-slate-500">SILNIK ANALITYCZNY</span>
                <span className="font-bold" style={{ color: '#39FF14' }}>
                  65%
                </span>
                <span className="text-slate-500">W BUDOWIE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ FEATURE CARDS ═══ */}
      <section id="funkcje" className="relative z-10 px-4 pb-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              <span className="text-white">MODUŁY </span>
              <span className="glitch-text" data-text="SYSTEMU">
                SYSTEMU
              </span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Poznaj kluczowe funkcjonalności Przetargi Radar — każdy moduł to osobna warstwa inteligencji
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Inteligentne Dopasowania */}
            <motion.div
              className="hologram-card corner-accents rounded-2xl p-8 text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.04, y: -8 }}
            >
              <div className="flex justify-center mb-6 relative">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center border border-neon-green/30"
                  style={{ background: 'rgba(57,255,20,0.05)' }}
                >
                  <Target className="w-8 h-8 feature-icon group-hover:animate-pulse" />
                </div>
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-neon-green rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 12px #39FF14' }}
                ></div>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 tracking-wide">INTELIGENTNE DOPASOWANIA</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                System automatycznie porównuje Twoje produkty z aktualnymi zamówieniami publicznymi i wskazuje najlepsze
                dopasowania w czasie rzeczywistym
              </p>
              <div className="flex items-center justify-center gap-2 text-xs" style={{ color: '#fbbf24' }}>
                <Loader className="w-3 h-3 animate-spin" />
                <span className="font-mono">AKTYWNY</span>
              </div>
            </motion.div>

            {/* Card 2: Monitoring Przetargów */}
            <motion.div
              className="hologram-card corner-accents rounded-2xl p-8 text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              whileHover={{ scale: 1.04, y: -8 }}
            >
              <div className="flex justify-center mb-6 relative">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center border border-neon-green/20"
                  style={{ background: 'rgba(57,255,20,0.03)' }}
                >
                  <BarChart3
                    className="w-8 h-8"
                    style={{ color: '#39FF14', filter: 'drop-shadow(0 0 10px rgba(57,255,20,0.6))' }}
                  />
                </div>
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse"
                  style={{ background: '#39FF14', boxShadow: '0 0 10px #39FF14' }}
                ></div>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 tracking-wide">MONITORING PRZETARGÓW</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Ciągłe skanowanie rynku zamówień publicznych — powiadomienia o nowych przetargach, analiza trendów i
                ocena szans
              </p>
              <div className="flex items-center justify-center gap-2 text-xs" style={{ color: '#fbbf24' }}>
                <Loader className="w-3 h-3 animate-spin" />
                <span className="font-mono">AKTYWNY</span>
              </div>
            </motion.div>

            {/* Card 3: Mapa Rynku Zdrowia */}
            <motion.div
              className="hologram-card corner-accents rounded-2xl p-8 text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.04, y: -8 }}
            >
              <div className="flex justify-center mb-6 relative">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center border border-neon-green/20"
                  style={{ background: 'rgba(57,255,20,0.03)' }}
                >
                  <Database
                    className="w-8 h-8"
                    style={{ color: '#39FF14', filter: 'drop-shadow(0 0 10px rgba(57,255,20,0.5))' }}
                  />
                </div>
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse"
                  style={{ background: '#39FF14', boxShadow: '0 0 10px #39FF14' }}
                ></div>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 tracking-wide">MAPA RYNKU ZDROWIA</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Poznaj trendy rynkowe i dane publiczne o zamawiających — liczba szpitali, łóżek, ich kategorie oraz
                wolumen i wartość realizowanych świadczeń
              </p>
              <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(57,255,20,0.5)' }}>
                <Cpu className="w-3 h-3" />
                <span className="font-mono">W PRZYGOTOWANIU</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="jak-dziala" className="relative z-10 px-4 pb-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              <span className="text-white">JAK </span>
              <span className="glitch-text" data-text="DZIAŁA">
                DZIAŁA
              </span>
              <span className="text-white"> ?</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Od surowych danych do gotowych dopasowań — cały proces w jednym systemie
            </p>
          </motion.div>

          <ProcessFlow />
        </div>
      </section>

      {/* ═══ FOR WHO ═══ */}
      <section id="dla-kogo" className="relative z-10 px-4 pb-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              <span className="text-white">DLA </span>
              <span className="glitch-text" data-text="KOGO">
                KOGO
              </span>
              <span className="text-white"> ?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'PRODUCENCI',
                desc: 'Szukasz przetargów na swoje produkty? System dopasuje je automatycznie.',
                icon: Cpu,
              },
              {
                title: 'DYSTRYBUTORZY',
                desc: 'Monitoruj rynek zamówień publicznych w swoim segmencie 24/7.',
                icon: Activity,
              },
              {
                title: 'HANDLOWCY',
                desc: 'Bądź pierwszy — dostawaj powiadomienia szybciej niż konkurencja.',
                icon: Zap,
              },
              {
                title: 'SZPITALE',
                desc: 'Znajdź najlepszych dostawców i optymalizuj koszty zamówień.',
                icon: Database,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="hologram-card rounded-xl p-6 flex items-start gap-4"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border border-neon-green/20"
                  style={{ background: 'rgba(57,255,20,0.05)' }}
                >
                  <item.icon
                    className="w-6 h-6"
                    style={{ color: '#39FF14', filter: 'drop-shadow(0 0 6px #39FF1480)' }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-wider mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA / CONTACT ═══ */}
      <section id="kontakt" className="relative z-10 px-4 pb-24 scroll-mt-20">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="cyber-border corner-accents rounded-2xl p-10 md:p-16">
            <Radar
              className="w-12 h-12 mx-auto mb-6"
              style={{ color: '#39FF14', filter: 'drop-shadow(0 0 20px #39FF14)' }}
            />
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="text-white">GOTOWY NA </span>
              <span className="glitch-text" data-text="START">
                START
              </span>
              <span className="text-white"> ?</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Dołącz do systemu i zacznij skanować rynek przetargów dopasowanych do Twojej oferty
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/accounts/login/"
                className="neon-button flex items-center justify-center gap-2 text-sm !py-3 !px-8 cursor-pointer"
              >
                <LogIn className="w-4 h-4" /> ZALOGUJ SIĘ
              </a>
              <a
                href="mailto:krzysztof@sparx.wtf"
                className="flex items-center justify-center gap-2 text-sm py-3 px-8 rounded-lg border border-slate-700 text-slate-400 hover:border-neon-green/30 hover:text-neon-green transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" /> KONTAKT
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 border-t border-neon-green/10 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Radar className="w-4 h-4" style={{ color: '#39FF14' }} />
            <span className="text-xs font-mono text-slate-500">PRZETARGI RADAR &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="text-xs text-slate-600">
            <span className="font-mono">INTELIGENTNY SYSTEM RADAROWY</span>
            <span className="mx-2">—</span>
            <span className="italic">Bo życie jest za krótkie, żeby czytać BZP samemu</span>
          </div>
          <div className="text-[10px] text-slate-700">
            with <span style={{ color: '#39FF14' }}>♥</span> from Sparx
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
