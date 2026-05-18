import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const particleCount = 16
const particlePalette = ['rgba(59,130,246,0.18)', 'rgba(139,92,246,0.16)', 'rgba(56,189,248,0.12)']

function createParticles(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    size: 8 + Math.round(Math.random() * 12),
    top: `${Math.random() * 96 + 2}%`,
    left: `${Math.random() * 96 + 2}%`,
    delay: Math.random() * -12,
    duration: 18 + Math.random() * 18,
    color: particlePalette[index % particlePalette.length],
    opacity: 0.18 + Math.random() * 0.22,
    blur: 8 + Math.round(Math.random() * 24),
  }))
}

export default function SiteEffects() {
  const progressRef = useRef(null)
  const cursorRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const isSmallScreen = typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  const particles = useMemo(() => createParticles(isSmallScreen ? 10 : particleCount), [isSmallScreen])

  useEffect(() => {
    const handleLoad = () => {
      window.setTimeout(() => setLoading(false), 350)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => window.removeEventListener('load', handleLoad)
  }, [])

  useEffect(() => {
    const progress = progressRef.current
    const parallaxItems = Array.from(document.querySelectorAll('[data-parallax-speed]'))
    let ticking = false

    const updateScroll = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop || window.scrollY
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      const value = scrollHeight > 0 ? scrollTop / scrollHeight : 0

      if (progress) {
        progress.style.transform = `scaleX(${value})`
      }

      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallaxSpeed) || 0.06
        item.style.transform = `translate3d(0, ${Math.round(scrollTop * speed)}px, 0)`
      })

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    const supportsHover = window.matchMedia('(hover: hover)').matches
    if (!cursor || !supportsHover) return

    const updateCursor = (event) => {
      cursor.style.transform = `translate3d(${event.clientX - 24}px, ${event.clientY - 24}px, 0)`
      cursor.style.opacity = '1'
    }

    const hideCursor = () => {
      cursor.style.opacity = '0'
    }

    window.addEventListener('pointermove', updateCursor)
    window.addEventListener('pointerleave', hideCursor)
    window.addEventListener('pointercancel', hideCursor)

    return () => {
      window.removeEventListener('pointermove', updateCursor)
      window.removeEventListener('pointerleave', hideCursor)
      window.removeEventListener('pointercancel', hideCursor)
    }
  }, [])

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 overflow-hidden bg-transparent">
        <div ref={progressRef} className="scroll-progress-bar origin-left bg-gradient-to-r from-cyan to-purple" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="floating-particle"
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              filter: `blur(${particle.blur}px)`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div ref={cursorRef} className="glow-cursor" />

      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            className="site-loader"
          >
            <motion.div
              initial={{ scale: 0.72, opacity: 0.55 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              className="loader-ring"
            />
            <div className="mt-8 text-center text-sm uppercase tracking-[0.28em] text-slate-300">
              Loading Heviora Technologies
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
