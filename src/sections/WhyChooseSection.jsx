import { motion } from 'framer-motion'
import { Award, CloudCog, Sparkles, Rocket, ShieldCheck, LayoutDashboard } from 'lucide-react'
import { fadeIn, staggerContainer } from '../animations/motionVariants'

const reasons = [
  {
    title: 'AI-first development',
    description: 'Intelligent systems are embedded in every digital product we build, not bolted on later.',
    icon: Sparkles,
  },
  {
    title: 'Scalable architecture',
    description: 'Cloud-native systems designed to grow with your business and maintain premium reliability.',
    icon: CloudCog,
  },
  {
    title: 'Premium UI/UX',
    description: 'Cinematic interfaces that delight users while maintaining efficiency and clarity.',
    icon: LayoutDashboard,
  },
  {
    title: 'Fast deployment',
    description: 'Accelerated delivery pipelines ensure secure, high-quality releases on a predictable cadence.',
    icon: Rocket,
  },
  {
    title: 'Modern technologies',
    description: 'We build with the latest AI, cloud, and frontend standards for competitive advantage.',
    icon: Award,
  },
  {
    title: 'Startup innovation',
    description: 'Lean, experimental product development that moves fast and iterates confidently.',
    icon: ShieldCheck,
  },
]

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.12),transparent_26%)]" />
      <div className="absolute left-10 top-10 h-56 w-56 rounded-full bg-cyan/10 blur-3xl" />
      <div className="absolute right-10 bottom-10 h-64 w-64 rounded-full bg-purple/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 max-w-xl"
        >
          <motion.span variants={fadeIn('up', 0.1)} className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan/90 shadow-glow">
            Why Choose Us
          </motion.span>
          <motion.h2 variants={fadeIn('up', 0.2)} className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Why Choose Heviora Technologies
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.3)} className="mt-6 text-lg leading-8 text-slate-300">
            Our approach blends AI innovation, scalable architecture, premium design, and fast delivery to help visionary companies outpace the competition.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <article
                key={reason.title}
                className="group glass-card relative overflow-hidden rounded-[32px] p-8 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-x-6 top-6 h-0.5 rounded-full bg-gradient-to-r from-cyan/30 via-transparent to-purple/30" />
                <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-cyan/10 blur-3xl opacity-60" />
                <div className="relative z-10 flex items-center justify-center h-14 w-14 rounded-3xl border border-white/10 bg-[#0b1c36]/80 text-cyan shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative z-10 mt-6 text-2xl font-semibold text-white">{reason.title}</h3>
                <p className="relative z-10 mt-4 text-sm leading-7 text-slate-300">{reason.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
