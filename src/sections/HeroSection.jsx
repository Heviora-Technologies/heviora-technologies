import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight, Cpu, Sparkles, Code2, Layers, Cloud } from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import HeroCanvas from '../components/HeroCanvas'
import { fadeIn, staggerContainer } from '../animations/motionVariants'

export default function HeroSection() {
  const heroRef = useRef(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const glowX = useTransform(pointerX, (value) => value / 12)
  const glowY = useTransform(pointerY, (value) => value / 12)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      pointerX.set(x)
      pointerY.set(y)
    }

    hero.addEventListener('mousemove', handleMove)
    return () => hero.removeEventListener('mousemove', handleMove)
  }, [pointerX, pointerY])

  return (
    <section id="home" ref={heroRef} className="relative overflow-hidden border-b border-[rgba(59,130,246,0.16)] bg-[#050816] px-6 py-20 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 section-flow" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(0,175,255,0.16),transparent_40%)] blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-24 h-56 w-56 rounded-full bg-[#8B5CF6]/14 blur-3xl" />
      <div className="pointer-events-none absolute left-8 bottom-8 h-64 w-64 rounded-full bg-[#00AFFF]/08 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="relative z-10 max-w-2xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[rgba(59,130,246,0.22)] bg-[rgba(10,25,47,0.72)] px-4 py-3 text-xs uppercase tracking-[0.28em] text-cyan/90 shadow-glow backdrop-blur-xl transition duration-500 hover:border-[#00C2FF]/30 hover:shadow-[0_0_60px_rgba(0,194,255,0.24)]">
              <Sparkles className="h-4 w-4 text-[#66F2FF]" />
              AI-Powered Innovation
            </div>
            <motion.h1 variants={fadeIn('up', 0.15)} className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl xl:text-6xl">
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
            <motion.p variants={fadeIn('up', 0.25)} className="mt-6 max-w-xl text-lg leading-8 text-[#B8C1D1] sm:text-xl">
              Heviora Technologies creates AI-powered solutions and modern software that drive innovation, automate processes, and create real-world impact.
            </motion.p>

            <motion.div variants={fadeIn('up', 0.35)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                href="#services"
                className="group relative inline-flex overflow-hidden rounded-full border border-[#00C2FF]/40 bg-[#041627]/95 px-8 py-4 text-sm font-semibold text-[#EAF7FF] shadow-[0_0_60px_rgba(0,194,255,0.18)] transition duration-300 hover:border-[#66F2FF]/80"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#00C2FF]/20 via-transparent to-[#7B2EFF]/20 opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-3">
                  Explore Services
                  <ArrowRight className="h-4 w-4 text-[#66F2FF]" />
                </span>
                <span className="ripple-effect" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="group relative inline-flex overflow-hidden rounded-full border border-[#7B2EFF]/30 bg-[rgba(10,25,47,0.75)] px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:border-[#7B2EFF]/60 hover:bg-[rgba(123,46,255,0.12)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#7B2EFF]/15 via-transparent to-[#00C2FF]/15 opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="relative z-10">Get Started</span>
              </motion.a>
            </motion.div>

            <motion.div variants={fadeIn('up', 0.45)} className="mt-14 grid gap-4 sm:grid-cols-2">
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
                    className="rounded-[28px] border border-[rgba(59,130,246,0.18)] bg-[rgba(10,25,47,0.72)] px-5 py-4 text-white shadow-[0_24px_80px_rgba(0,175,255,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#00AFFF]/40 hover:bg-[rgba(10,25,47,0.9)]"
                  >
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#0a1b34]/90 text-[#00AFFF] shadow-[0_0_35px_rgba(0,175,255,0.18)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.5)}
            className="relative overflow-hidden rounded-[36px] border border-[rgba(59,130,246,0.35)] bg-[rgba(10,25,47,0.75)] p-4 shadow-[0_45px_160px_rgba(0,175,255,0.12)] backdrop-blur-3xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,175,255,0.16),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.14),transparent_24%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_60%)]" />
            <div className="relative h-[500px] overflow-hidden rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[#071426]/90 shadow-[0_0_80px_rgba(0,175,255,0.08)]">
              <HeroCanvas />
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-6 top-6 h-16 w-16 rounded-full bg-[#00AFFF]/12 blur-3xl" />
                <div className="absolute right-8 top-16 h-24 w-24 rounded-full bg-[#8B5CF6]/12 blur-3xl" />
                <div className="absolute left-6 bottom-8 rounded-full border border-[#00AFFF]/20 bg-[#00AFFF]/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white shadow-[0_0_40px_rgba(0,175,255,0.14)]">
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
