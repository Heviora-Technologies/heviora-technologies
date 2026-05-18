import { motion } from 'framer-motion'
import { Cloud, Cpu, Layers, Sparkles, Code2, Monitor, ShieldCheck } from 'lucide-react'
import { fadeIn, staggerContainer } from '../animations/motionVariants'

const services = [
  {
    icon: Cpu,
    title: 'AI Solutions',
    description: 'Custom intelligence systems powered by adaptive machine learning models.',
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Premium full-stack applications designed for performance and scale.',
  },
  {
    icon: Monitor,
    title: 'UI/UX Design',
    description: 'Futuristic interfaces crafted for immersive human experiences.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Scalability',
    description: 'Elastic infrastructure that scales with your enterprise ambitions.',
  },
  {
    icon: Layers,
    title: 'SaaS Development',
    description: 'Turnkey SaaS products with elegant workflows and premium reliability.',
  },
  {
    icon: ShieldCheck,
    title: 'Automation Systems',
    description: 'Smart automation pipelines to accelerate business operations.',
  },
]

export default function SolutionsSection() {
  return (
    <section id="services" className="relative overflow-x-hidden border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_30%)] blur-3xl" />
      <div className="absolute left-10 top-20 h-56 w-56 rounded-full bg-purple/15 blur-3xl" />
      <div className="absolute right-10 bottom-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-16 max-w-4xl"
        >
          <motion.span variants={fadeIn('up', 0.1)} className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan/90 shadow-glow">
            Premium Services
          </motion.span>
          <motion.h2 variants={fadeIn('up', 0.2)} className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Crafting intelligent products, scalable platforms, and cinematic software journeys.
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.3)} className="mt-6 text-lg leading-8 text-slate-300">
            Heviora delivers a premium blend of AI engineering, web craftsmanship, and cloud-native systems for modern enterprise brands.
          </motion.p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="glass-card group relative overflow-hidden rounded-[34px] px-6 py-8 shadow-[0_30px_100px_rgba(0,175,255,0.12)] transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                style={{ perspective: 1200 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.12),_transparent_22%)] opacity-60" />
                <div className="absolute inset-x-6 top-6 h-0.5 rounded-full bg-gradient-to-r from-cyan/30 via-transparent to-purple/30" />
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-[#0b172d]/80 text-cyan shadow-[0_0_50px_rgba(6,182,212,0.18)] transition duration-300 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="relative z-10 mt-8 space-y-4">
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
                <div className="pointer-events-none absolute -right-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-cyan/10 blur-2xl opacity-70" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
