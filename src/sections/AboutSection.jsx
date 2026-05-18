import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { ShieldCheck, Sparkles, Code2, Cpu } from 'lucide-react'
import { fadeIn, staggerContainer } from '../animations/motionVariants'

const stats = [
  { label: 'Projects', value: 128 },
  { label: 'Technologies', value: 42 },
  { label: 'AI Solutions', value: 67 },
  { label: 'Client Satisfaction', value: 98 },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 })

  const [counts, setCounts] = useState({
    Projects: 0,
    Technologies: 0,
    'AI Solutions': 0,
    'Client Satisfaction': 0,
  })

  useEffect(() => {
    if (!isInView) return

    stats.forEach((stat) => {
      const target = stat.value
      animate(0, target, {
        duration: 1.8,
        ease: 'easeOut',
        onUpdate(value) {
          setCounts((current) => ({
            ...current,
            [stat.label]: Math.round(value),
          }))
        },
      })
    })
  }, [isInView])

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_28%)] blur-3xl" />
      <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-purple/15 blur-3xl" />
      <div className="absolute left-0 bottom-12 h-44 w-44 rounded-full bg-cyan/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="space-y-10"
        >
          <motion.span variants={fadeIn('up', 0.1)} className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan/90 shadow-glow">
            <Sparkles className="h-4 w-4" /> About Heviora Technologies
          </motion.span>
          <motion.div variants={fadeIn('up', 0.2)} className="space-y-6 max-w-xl">
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Heviora Technologies is a next-generation AI and software development company focused on intelligent digital products, scalable systems, and futuristic user experiences.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              We partner with visionary teams to build premium software that feels cinematic, performs at scale, and adapts to the demands of tomorrow’s AI-driven enterprises.
            </p>
          </motion.div>
          <div className="section-divider mt-10 mb-10" />
          <motion.div variants={fadeIn('up', 0.25)} className="grid gap-5 sm:grid-cols-3">
            <div className="glass-card rounded-[32px] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Mission</p>
              <p className="mt-4 text-lg font-semibold text-white">Create intelligent digital products that redefine modern experiences.</p>
            </div>
            <div className="glass-card rounded-[32px] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Vision</p>
              <p className="mt-4 text-lg font-semibold text-white">Be the trusted architect of premium AI systems at enterprise scale.</p>
            </div>
            <div className="glass-card rounded-[32px] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Approach</p>
              <p className="mt-4 text-lg font-semibold text-white">Innovation-driven engineering combined with cinematic product design.</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeIn('up', 0.3)} className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#07112b]/80 p-8 shadow-[0_45px_130px_rgba(7,11,28,0.45)] backdrop-blur-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.12),transparent_20%)]" />
          <div className="absolute inset-x-4 top-4 h-14 rounded-full bg-white/5 blur-2xl" />
          <div className="relative grid gap-6">
            <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-3xl bg-cyan/10 text-cyan shadow-glow">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">AI-driven Intelligence</p>
                  <p className="text-xl font-semibold text-white">Futuristic systems powered by advanced ML and automation.</p>
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-300">
                Our solutions blend adaptive intelligence and human-first design to create resilient digital products.
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[28px] border border-white/10 bg-[#0c1a33]/90 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <p className="text-4xl font-semibold text-white">{counts[stat.label]}{stat.label === 'Client Satisfaction' ? '%' : '+'}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.28em] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-cyan/15 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan/90">Floating UI</p>
                <p className="mt-3 text-lg font-semibold text-white">Glass-like dashboards with premium neon edges.</p>
              </div>
              <div className="rounded-[28px] border border-purple/15 bg-white/5 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1.5">
                <p className="text-sm uppercase tracking-[0.28em] text-purple/90">Animated motion</p>
                <p className="mt-3 text-lg font-semibold text-white">Cinematic scroll reveals and interactive visual layers.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
