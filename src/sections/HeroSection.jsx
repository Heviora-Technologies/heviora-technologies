import { Suspense, useEffect, useRef, lazy, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight, Cpu, Sparkles, Code2, Layers, Cloud } from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import { ImageLoader } from '../components/LoadingStates'
import { fadeIn, staggerContainer } from '../animations/motionVariants'
import { isMobile, setupDeviceDetectionListener } from '../utils/deviceDetection'

// Lazy load HeroCanvas for faster initial page load
const HeroCanvas = lazy(() => import('../components/HeroCanvas'))

export default function HeroSection() {
  const heroRef = useRef(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const glowX = useTransform(pointerX, (value) => value / 12)
  const glowY = useTransform(pointerY, (value) => value / 12)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    setIsMobileView(isMobile())
    const cleanup = setupDeviceDetectionListener(() => {
      setIsMobileView(isMobile())
    })
    
    const hero = heroRef.current
    if (!hero || isMobile()) return // Skip mouse interaction on mobile

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      pointerX.set(x)
      pointerY.set(y)
    }

    hero.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      cleanup()
      hero.removeEventListener('mousemove', handleMove)
    }
  }, [pointerX, pointerY])

  return (
    <section id="home" ref={heroRef} className="relative w-full overflow-x-hidden border-b border-[rgba(59,130,246,0.16)] bg-[#050816] px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <div className="pointer-events-none absolute inset-0 section-flow" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(0,175,255,0.16),transparent_40%)] blur-3xl" />
      <div className="pointer-events-none absolute right-4 top-24 h-40 w-40 rounded-full bg-[#8B5CF6]/14 blur-3xl sm:right-8 sm:h-56 sm:w-56" />
      <div className="pointer-events-none absolute left-4 bottom-8 h-48 w-48 rounded-full bg-[#00AFFF]/08 blur-3xl sm:left-8 sm:h-64 sm:w-64" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="relative z-10 flex w-full flex-col"
          >
            <div className="mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-[rgba(59,130,246,0.22)] bg-[rgba(10,25,47,0.72)] px-4 py-3 text-xs uppercase tracking-[0.28em] text-cyan/90 shadow-glow backdrop-blur-xl transition duration-500 hover:border-[#00C2FF]/30 hover:shadow-[0_0_60px_rgba(0,194,255,0.24)]">
              <Sparkles className="h-4 w-4 shrink-0 text-[#66F2FF]" />
              AI-Powered Innovation
            </div>
            <motion.h1 variants={fadeIn('up', 0.15)} className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-6xl">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
                  className="block"
                >Building Intelligent</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.22 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] via-[#7B2EFF] to-[#66F2FF]"
                >Digital Experiences</motion.span>
              </span>
            </motion.h1>
            <motion.p variants={fadeIn('up', 0.25)} className="mt-6 w-full max-w-xl text-base leading-7 text-[#B8C1D1] sm:text-lg sm:leading-8">
              Heviora Technologies creates AI-powered solutions and modern software that drive innovation, automate processes, and create real-world impact.
            </motion.p>

            <motion.div variants={fadeIn('up', 0.35)} className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#services"
                className="group relative inline-flex w-full overflow-hidden rounded-full border border-[#00C2FF]/40 bg-[#041627]/95 px-8 py-3 text-sm font-semibold text-[#EAF7FF] shadow-[0_0_60px_rgba(0,194,255,0.18)] transition-all duration-300 hover:border-[#66F2FF]/80 hover:scale-105 active:scale-95 sm:w-auto sm:py-4"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#00C2FF]/20 via-transparent to-[#7B2EFF]/20 opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center justify-center gap-3 sm:justify-start">
                  Explore Services
                  <ArrowRight className="h-4 w-4 text-[#66F2FF]" />
                </span>
                <span className="ripple-effect" />
              </a>
              <a
                href="#contact"
                className="group relative inline-flex w-full overflow-hidden rounded-full border border-[#7B2EFF]/30 bg-[rgba(10,25,47,0.75)] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#7B2EFF]/60 hover:bg-[rgba(123,46,255,0.12)] hover:scale-105 active:scale-95 sm:w-auto sm:py-4"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#7B2EFF]/15 via-transparent to-[#00C2FF]/15 opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="relative z-10">Get Started</span>
              </a>
            </motion.div>

            <motion.div variants={fadeIn('up', 0.45)} className="mt-10 w-full grid gap-3 sm:grid-cols-2 sm:gap-4">
              {[
                { label: 'AI Solutions', icon: Cpu },
                { label: 'Software Development', icon: Code2 },
                { label: 'UI/UX Design', icon: Layers },
                { label: 'Cloud Solutions', icon: Cloud },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="w-full rounded-2xl border border-[rgba(59,130,246,0.18)] bg-[rgba(10,25,47,0.72)] px-4 py-3 text-white shadow-[0_24px_80px_rgba(0,175,255,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#00AFFF]/40 hover:bg-[rgba(10,25,47,0.9)] sm:px-5 sm:py-4 sm:rounded-[28px]"
                  >
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0a1b34]/90 text-[#00AFFF] shadow-[0_0_35px_rgba(0,175,255,0.18)] sm:h-12 sm:w-12 sm:rounded-3xl">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold text-white sm:text-sm">{item.label}</p>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.5)}
            className="relative w-full overflow-hidden rounded-2xl border border-[rgba(59,130,246,0.35)] bg-[rgba(10,25,47,0.75)] p-3 shadow-[0_45px_160px_rgba(0,175,255,0.12)] backdrop-blur-3xl sm:rounded-[36px] sm:p-4"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,175,255,0.16),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.14),transparent_24%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_60%)]" />
            <div className="relative aspect-square w-full sm:aspect-video overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#071426]/90 shadow-[0_0_80px_rgba(0,175,255,0.08)] sm:rounded-[30px]">
              {isMobileView ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#071426] to-[#0a1b34]">
                   <div className="absolute h-40 w-40 rounded-full bg-[#00AFFF]/20 blur-3xl"></div>
                   <div className="absolute h-32 w-32 rounded-full bg-[#7B2EFF]/20 blur-2xl"></div>
                   <div className="relative z-10 text-center">
                     <div className="mx-auto mb-4 h-16 w-16 rounded-full border border-[#00AFFF]/30 bg-[#00AFFF]/10 shadow-[0_0_30px_rgba(0,175,255,0.2)] flex items-center justify-center">
                        <Cpu className="h-8 w-8 text-[#66F2FF]" />
                     </div>
                     <span className="text-xs font-semibold tracking-widest text-white/80 uppercase">AI Core Active</span>
                   </div>
                </div>
              ) : (
                <Suspense fallback={<ImageLoader />}>
                  <HeroCanvas />
                </Suspense>
              )}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-4 top-4 h-12 w-12 rounded-full bg-[#00AFFF]/12 blur-3xl sm:left-6 sm:top-6 sm:h-16 sm:w-16" />
                <div className="absolute right-4 top-12 h-16 w-16 rounded-full bg-[#8B5CF6]/12 blur-3xl sm:right-8 sm:top-16 sm:h-24 sm:w-24" />
                <div className="absolute left-4 bottom-4 rounded-full border border-[#00AFFF]/20 bg-[#00AFFF]/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white shadow-[0_0_40px_rgba(0,175,255,0.14)] sm:left-6 sm:bottom-8 sm:px-4 sm:py-2 sm:text-xs">
                  Live intelligence grid
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
