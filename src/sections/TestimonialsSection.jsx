import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { fadeIn, staggerContainer } from '../animations/motionVariants'

const testimonials = [
  {
    name: 'Nina Voss',
    role: 'VP of Product',
    company: 'Arclight Labs',
    quote:
      'Heviora transformed our AI roadmap into a stunning experience. Every interaction feels premium, reliable, and magnetic.',
    rating: 5,
    highlight: 'Strategic AI product design with a cinematic launch.',
  },
  {
    name: 'Elijah Reed',
    role: 'Founder',
    company: 'Astra Works',
    quote:
      'Their team delivered so much more than code. The product feels polished, intelligent, and built for visionary growth.',
    rating: 5,
    highlight: 'Elevated our platform with immersive UX and enterprise-grade stability.',
  },
  {
    name: 'Maya Chen',
    role: 'Head of Innovation',
    company: 'Nexora Systems',
    quote:
      'Working with Heviora was fast, transparent, and creative. The result was a premium product that resonates with our users instantly.',
    rating: 5,
    highlight: 'A flawless mix of AI, product strategy, and cinematic execution.',
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="relative overflow-hidden border-t border-white/10 px-6 pt-16 pb-2 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_30%)] blur-3xl" />
      <div className="absolute left-10 top-20 h-56 w-56 rounded-full bg-purple/15 blur-3xl" />
      <div className="absolute right-10 bottom-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-14 max-w-xl"
        >
          <motion.span variants={fadeIn('up', 0.1)} className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan/90 shadow-glow">
            Customer Testimonials
          </motion.span>
          <motion.h2 variants={fadeIn('up', 0.2)} className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Trusted by ambitious brands for premium AI and digital product execution.
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.3)} className="mt-6 text-lg leading-8 text-slate-300">
            Glassmorphism review cards, elegant motion, and a cinematic carousel that keeps the storytelling smooth and magnetic.
          </motion.p>
        </motion.div>

        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#07112b]/80 p-6 shadow-[0_45px_130px_rgba(7,11,28,0.45)] backdrop-blur-3xl sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.10),transparent_22%)] opacity-70" />
          <div className="absolute inset-x-12 top-8 h-16 rounded-full bg-white/5 blur-2xl" />
          <div className="relative z-10 grid gap-8">
            <AnimatePresence initial={false} mode="wait">
              <motion.article
                key={activeIndex}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.96 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-[32px] border border-white/10 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_32px_90px_rgba(0,0,0,0.18)]"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan/10 text-cyan shadow-glow">
                        <Star className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-slate-400">{testimonials[activeIndex].company}</p>
                        <p className="text-2xl font-semibold text-white">{testimonials[activeIndex].name}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${index < testimonials[activeIndex].rating ? 'fill-cyan text-cyan' : 'text-slate-700'}`}
                        />
                      ))}
                    </div>

                    <p className="max-w-3xl text-sm uppercase tracking-[0.28em] text-slate-400">{testimonials[activeIndex].role}</p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-[#0c1a33]/80 px-5 py-4 text-right text-slate-300 shadow-[0_25px_70px_rgba(59,130,246,0.12)]">
                    <p className="text-sm leading-6">{testimonials[activeIndex].highlight}</p>
                  </div>
                </div>

                <blockquote className="mt-8 text-xl leading-9 text-slate-100 sm:text-2xl">
                  “{testimonials[activeIndex].quote}”
                </blockquote>
              </motion.article>
            </AnimatePresence>

            <div className="grid gap-4 sm:grid-cols-3">
              {testimonials.map((item, index) => (
                <motion.button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ y: -4 }}
                  className={`rounded-[28px] border px-5 py-4 text-left transition ${activeIndex === index
                      ? 'border-cyan/40 bg-cyan/10 text-white shadow-[0_20px_70px_rgba(6,182,212,0.16)]'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan/25 hover:bg-white/10'
                    }`}
                >
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{item.company}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{item.name}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
