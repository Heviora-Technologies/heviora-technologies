import { motion } from 'framer-motion'
import { Cloud, Database, Server, Code2, ShieldCheck, Sparkles, Cpu, Layers } from 'lucide-react'
import { fadeIn, staggerContainer } from '../animations/motionVariants'

const techItems = [
  { label: 'React', icon: Code2 },
  { label: 'Node.js', icon: Server },
  { label: 'MongoDB', icon: Database },
  { label: 'Express', icon: Layers },
  { label: 'Python', icon: Sparkles },
  { label: 'OpenAI', icon: Cpu },
  { label: 'AWS', icon: Cloud },
  { label: 'Tailwind CSS', icon: ShieldCheck },
]

export default function TrustedTechSection() {
  const items = [...techItems, ...techItems]

  return (
    <section id="trusted" className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.16),_transparent_28%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#8b5cf6]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 max-w-3xl"
        >
          <motion.span variants={fadeIn('up', 0.1)} className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan/90 shadow-glow">
            Trusted Technologies
          </motion.span>
          <motion.h2 variants={fadeIn('up', 0.2)} className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Built on premium AI infrastructure and modern dev platforms.
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.3)} className="mt-6 text-lg leading-8 text-slate-300">
            A floating suite of trusted tools and platforms powering modern AI solutions with speed, scale, and cinematic quality.
          </motion.p>
        </motion.div>

        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(11,18,40,0.45)] backdrop-blur-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.08),transparent_24%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/5" />
          <div className="relative space-y-8 py-8">
            <div className="overflow-hidden">
              <div className="tech-track flex min-w-full items-center gap-6 py-1">
                {items.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={`${item.label}-${index}`}
                      whileHover={{ y: -6, scale: 1.03 }}
                      className="group glass-card min-w-[220px] cursor-default rounded-[28px] p-6 transition duration-300"
                    >
                      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan/10 text-cyan shadow-glow transition duration-300 group-hover:bg-cyan/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-lg font-semibold text-white">{item.label}</p>
                      <p className="mt-2 text-sm text-slate-400">Premium stack</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="tech-track-reverse flex min-w-full items-center gap-6 py-1">
                {items.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={`${item.label}-rev-${index}`}
                      whileHover={{ y: -6, scale: 1.03 }}
                      className="group min-w-[220px] cursor-default rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(8,15,33,0.18)] transition duration-300"
                    >
                      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-purple/10 text-purple shadow-glow transition duration-300 group-hover:bg-purple/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-lg font-semibold text-white">{item.label}</p>
                      <p className="mt-2 text-sm text-slate-400">Trusted stack</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
