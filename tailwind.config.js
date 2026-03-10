/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#39FF14',
          blue: '#00f0ff',
          pink: '#ff00ff',
          purple: '#a855f7',
          yellow: '#fbbf24',
          orange: '#fb923c',
          red: '#ef4444',
        },
        cyber: {
          black: '#0a0a0a',
          dark: '#0f172a',
          grid: '#1e293b',
        }
      },
      animation: {
        'grid-scroll': 'grid-scroll 20s linear infinite',
        'float-particle': 'float-particle linear infinite',
        'orb-pulse': 'orb-pulse 6s ease-in-out infinite alternate',
        'ring-rotate': 'ring-rotate 8s linear infinite',
        'ring-pulse': 'ring-pulse 3s ease-in-out infinite',
        'scan': 'scan 4s ease-in-out infinite',
        'ekg-flow': 'ekg-flow 2s linear infinite',
        'brain-appear': 'brain-appear 2s ease-out infinite',
        'progress-shift': 'progress-shift 3s linear infinite',
        'stream-flow': 'stream-flow 25s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'dot-travel': 'dot-travel 4s ease-in-out infinite',
        'step-pulse': 'step-pulse 4s ease-in-out infinite',
        'glitch': 'glitch 2s infinite',
        'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
        'data-flow': 'data-flow 15s linear infinite',
        'neon-flicker': 'neon-flicker 3s infinite',
        'matrix-rain': 'matrix-rain 10s linear infinite',
        'cyber-grid': 'cyber-grid 30s linear infinite',
      },
      keyframes: {
        'grid-scroll': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(60px, 60px)' }
        },
        'float-particle': {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) scale(1)', opacity: '0' }
        },
        'orb-pulse': {
          '0%': { transform: 'scale(1)', opacity: '0.1' },
          '100%': { transform: 'scale(1.3)', opacity: '0.2' }
        },
        'ring-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'ring-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.1)', opacity: '0.6' }
        },
        'scan': {
          '0%, 100%': { top: '0', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' }
        },
        'ekg-flow': {
          '0%': { strokeDashoffset: '60' },
          '100%': { strokeDashoffset: '-100' }
        },
        'brain-appear': {
          '0%, 60%': { opacity: '0', transform: 'scale(0.5)', filter: 'drop-shadow(0 0 0 rgba(57,255,20,0))' },
          '70%': { opacity: '1', transform: 'scale(1.2)', filter: 'drop-shadow(0 0 15px rgba(57,255,20,1))' },
          '80%, 100%': { opacity: '1', transform: 'scale(1)', filter: 'drop-shadow(0 0 6px rgba(57,255,20,0.6))' }
        },
        'progress-shift': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' }
        },
        'stream-flow': {
          '0%': { top: '-20px', opacity: '0' },
          '5%': { opacity: '1' },
          '95%': { opacity: '1' },
          '100%': { top: '100vh', opacity: '0' }
        },
        'fade-up': {
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        'dot-travel': {
          '0%': { left: '10%', opacity: '0' },
          '10%': { opacity: '1' },
          '50%': { left: '50%' },
          '90%': { opacity: '1' },
          '100%': { left: '90%', opacity: '0' }
        },
        'step-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' }
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' }
        },
        'cyber-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(57,255,20,0.5), inset 0 0 20px rgba(57,255,20,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(57,255,20,0.8), inset 0 0 30px rgba(57,255,20,0.2)' }
        },
        'hologram': {
          '0%, 100%': { opacity: '1', transform: 'translateY(0)' },
          '25%': { opacity: '0.8', transform: 'translateY(-2px)' },
          '50%': { opacity: '1', transform: 'translateY(0)' },
          '75%': { opacity: '0.9', transform: 'translateY(2px)' }
        },
        'data-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
          '75%': { opacity: '1' },
          '85%': { opacity: '0.8' }
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'cyber-grid': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' }
        }
      }
    },
  },
  plugins: [],
}
