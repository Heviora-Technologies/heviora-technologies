import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ExternalLink, GitBranch, Sparkles, CheckCircle2, ShieldCheck, Clock3, Briefcase } from 'lucide-react'
import { fadeIn, staggerContainer } from '../animations/motionVariants'

const trustItems = [
  { icon: Clock3, title: '24h Response Time', description: 'Rapid reply for priority inquiries.' },
  { icon: ShieldCheck, title: 'Secure Communication', description: 'Encrypted business inquiry workflow.' },
  { icon: Briefcase, title: 'Enterprise Solutions', description: 'Startup and corporate-ready AI engagements.' },
  { icon: Sparkles, title: 'AI Consultation', description: 'Strategic planning for intelligent products.' },
]

const businessTrustItems = [
  'Secure Inquiry Processing',
  'NDA-Friendly Consultation',
  '24h Business Response',
  'Enterprise Ready Solutions',
]

const initialForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  projectType: '',
  budgetRange: '',
  budgetCustom: '',
  projectCustom: '',
  timeline: '',
  message: '',
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FormField = ({ id, label, type = 'text', required, value, onChange }) => (
  <div className="relative">
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      required={required}
      className="peer h-16 w-full rounded-[24px] border border-white/10 bg-[#0b1731]/80 px-5 pt-6 pb-3 text-white outline-none transition duration-300 focus:border-cyan/40 focus:bg-[#112340]/90 focus:ring-2 focus:ring-cyan/10"
    />
    <label
      htmlFor={id}
      className={`pointer-events-none absolute left-5 origin-[0] text-sm transition-all duration-300 ${
        value ? 'top-2 -translate-y-1 text-xs text-cyan/90' : 'top-5 text-slate-400'
      } peer-focus:top-2 peer-focus:-translate-y-1 peer-focus:text-xs peer-focus:text-cyan/90`}
    >
      {label}
    </label>
  </div>
)

const SelectField = ({ id, label, value, options, onChange, required }) => (
  <div className="relative">
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="peer h-16 w-full appearance-none rounded-[24px] border border-white/10 bg-[#0b1731]/80 px-5 pr-10 text-white outline-none transition duration-300 focus:border-cyan/40 focus:bg-[#112340]/90 focus:ring-2 focus:ring-cyan/10"
    >
      <option value="" disabled hidden />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <label
      htmlFor={id}
      className={`pointer-events-none absolute left-5 origin-[0] text-sm transition-all duration-300 ${
        value ? 'top-2 -translate-y-1 text-xs text-cyan/90' : 'top-5 text-slate-400'
      } peer-focus:top-2 peer-focus:-translate-y-1 peer-focus:text-xs peer-focus:text-cyan/90`}
    >
      {label}
    </label>
    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
      ▾
    </div>
  </div>
)

export default function ContactSection() {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSubmittedAt, setLastSubmittedAt] = useState(0)

  useEffect(() => {
    if (!status.message) return
    const timer = window.setTimeout(() => setStatus({ type: '', message: '' }), 5000)
    return () => window.clearTimeout(timer)
  }, [status])

  const sanitize = (value) => value.toString().trim()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const validate = () => {
    const requiredFields = ['name', 'email', 'company', 'phone', 'projectType', 'budgetRange', 'timeline', 'message']
    for (const field of requiredFields) {
      if (!formData[field].toString().trim()) {
        setStatus({ type: 'error', message: 'Please fill in all required fields.' })
        return false
      }
    }
    if (formData.budgetRange === 'Other' && !formData.budgetCustom.toString().trim()) {
      setStatus({ type: 'error', message: 'Please enter your budget amount.' })
      return false
    }
    if (formData.projectType === 'Other' && !formData.projectCustom.toString().trim()) {
      setStatus({ type: 'error', message: 'Please describe your project idea.' })
      return false
    }
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({ type: 'error', message: 'Enter a valid email address.' })
      return false
    }
    if (Date.now() - lastSubmittedAt < 8000) {
      setStatus({ type: 'error', message: 'Please wait a moment before sending another message.' })
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting || !validate()) return

    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const payload = {
        name: sanitize(formData.name),
        email: sanitize(formData.email),
        company: sanitize(formData.company),
        phone: sanitize(formData.phone),
        projectType: formData.projectType === 'Other' ? sanitize(formData.projectCustom) : sanitize(formData.projectType),
        budgetRange: formData.budgetRange === 'Other' ? sanitize(formData.budgetCustom) : sanitize(formData.budgetRange),
        timeline: sanitize(formData.timeline),
        message: sanitize(formData.message),
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message at this time.')
      }

      setFormData(initialForm)
      setLastSubmittedAt(Date.now())
      setStatus({ type: 'success', message: 'Message sent successfully. Our team will contact you shortly.' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative overflow-x-hidden border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_30%)] blur-3xl pointer-events-none -z-10" />
      <div className="absolute left-10 top-28 h-52 w-52 rounded-full bg-purple/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute right-10 bottom-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_transparent_48%)] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 overflow-hidden rounded-[36px] border border-white/10 bg-[#07112b]/80 p-8 shadow-[0_45px_120px_rgba(7,11,28,0.45)] backdrop-blur-3xl sm:p-12 w-full"
        >
          <div className="absolute inset-x-10 top-8 h-16 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute inset-x-12 bottom-8 h-16 rounded-full bg-cyan/10 blur-2xl" />
          <div className="pointer-events-none absolute left-10 top-20 h-3 w-3 rounded-full bg-cyan/40 blur-xl animate-pulse" />
          <div className="pointer-events-none absolute right-16 top-40 h-4 w-4 rounded-full bg-purple/30 blur-xl animate-pulse" />
          <div className="pointer-events-none absolute left-1/2 top-16 h-2 w-2 rounded-full bg-white/30 blur-xl animate-pulse" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[0.95fr_0.9fr] lg:items-start">
            <motion.div variants={fadeIn('up', 0.1)} className="space-y-6 max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan/90 shadow-glow">
                <Sparkles className="h-4 w-4" /> Start your premium AI collaboration
              </span>

              <div>
                <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                  Let’s build your next-generation digital product.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  Share your goals and our team will craft intelligent digital solutions, scalable AI systems, and future-ready technology experiences tailored for your business.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {trustItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-[0_18px_80px_rgba(8,15,33,0.18)] transition hover:border-cyan/30 hover:bg-white/10">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-[#0b1731]/90 text-cyan shadow-glow">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-400">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                    </div>
                  )
                })}
              </div>

              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    className={`rounded-[28px] border p-6 shadow-[0_25px_80px_rgba(6,182,212,0.18)] ${
                      status.type === 'success'
                        ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100'
                        : 'border-rose-400/20 bg-rose-500/10 text-rose-100'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-3xl ${status.type === 'success' ? 'bg-emerald-500 text-[#07112b]' : 'bg-rose-500 text-[#07112b]'} shadow-glow`}>
                        <CheckCircle2 className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-lg font-semibold">
                          {status.type === 'success' ? 'Message sent successfully.' : 'Submission failed.'}
                        </p>
                        <p className="mt-1 text-sm text-slate-200">{status.message}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.form
              variants={fadeIn('up', 0.2)}
              onSubmit={handleSubmit}
              className="relative z-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_35px_140px_rgba(8,15,33,0.24)] sm:p-10 w-full"
            >
              <div className="absolute inset-x-10 top-6 h-16 rounded-full bg-cyan/5 blur-2xl" />
              <div className="absolute inset-x-12 bottom-6 h-16 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -left-10 top-20 h-32 w-32 rounded-full bg-cyan/10 blur-3xl opacity-70" />
              <div className="absolute right-0 top-28 h-24 w-24 rounded-full bg-purple/10 blur-3xl opacity-70" />

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="name" label="Full Name" type="text" required value={formData.name} onChange={handleChange} />
                <FormField id="email" label="Business Email" type="email" required value={formData.email} onChange={handleChange} />
                <FormField id="company" label="Company Name" type="text" required value={formData.company} onChange={handleChange} />
                <FormField id="phone" label="Phone Number" type="tel" required value={formData.phone} onChange={handleChange} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 mt-5">
                <SelectField
                  id="projectType"
                  label="Project Type"
                  value={formData.projectType}
                  options={['AI Development', 'Web Application', 'SaaS Platform', 'E-Commerce Solution', 'UI/UX Design', 'Automation System', 'Cloud Infrastructure', 'Enterprise Software', 'Other']}
                  onChange={handleChange}
                  required
                />
                {formData.projectType === 'Other' && (
                  <div className="mt-4">
                    <FormField
                      id="projectCustom"
                      label="Describe your idea"
                      type="text"
                      required
                      value={formData.projectCustom}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div>
                  <SelectField
                      id="budgetRange"
                      label="Budget"
                    value={formData.budgetRange}
                    options={['₹10,000', '₹15,000', '₹20,000', '₹25,000', '₹30,000', 'Other']}
                    onChange={handleChange}
                    required
                  />

                  {formData.budgetRange === 'Other' && (
                    <div className="mt-4">
                      <FormField
                        id="budgetCustom"
                        label="Enter amount (INR)"
                        type="tel"
                        required
                        value={formData.budgetCustom}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 mt-5">
                <SelectField
                  id="timeline"
                  label="Project Timeline"
                  value={formData.timeline}
                  options={['Immediate', 'Within 1 Month', '1–3 Months', '3–6 Months', 'Flexible Timeline']}
                  onChange={handleChange}
                  required
                />
                <div />
              </div>

              <div className="relative mt-5">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  rows={8}
                  className="peer min-h-[260px] w-full rounded-[24px] border border-white/10 bg-[#0b1731]/80 px-5 pt-10 pb-5 text-white outline-none transition duration-300 focus:border-cyan/40 focus:bg-[#112340]/90 focus:ring-2 focus:ring-cyan/10"
                />
                <label
                  htmlFor="message"
                  className={`pointer-events-none absolute left-5 origin-[0] text-sm transition-all duration-300 ${
                    formData.message ? 'top-3 -translate-y-1 text-xs text-cyan/90' : 'top-6 text-slate-400'
                  } peer-focus:top-3 peer-focus:-translate-y-1 peer-focus:text-xs peer-focus:text-cyan/90`}
                >
                  Describe your project goals, required features, business objectives, and technical expectations.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-[28px] bg-gradient-to-r from-[#06b6d4] to-[#2563eb] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_36px_120px_rgba(6,182,212,0.28)] transition duration-300 hover:shadow-[0_50px_160px_rgba(6,182,212,0.32)] hover:-translate-y-1 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  'Start Your Project'
                )}
              </button>

            </motion.form>
          </div>

          <motion.div variants={fadeIn('up', 0.3)} className="relative mt-10 grid gap-4 sm:grid-cols-3 lg:mt-12">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'hevioratechnologies@gmail.com',
                href: 'mailto:hevioratechnologies@gmail.com',
              },
              {
                icon: ExternalLink,
                label: 'LinkedIn',
                value: 'linkedin.com/company/heviora-technologies',
                href: 'https://www.linkedin.com/company/heviora-technologies',
              },
              {
                icon: GitBranch,
                label: 'GitHub',
                value: 'github.com/Heviora-Technologies',
                href: 'https://github.com/Heviora-Technologies',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group glass-card rounded-[28px] p-6 transition hover:-translate-y-1 hover:border-cyan/30 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#0c1a33]/90 text-cyan shadow-glow transition group-hover:bg-cyan/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-sm uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
                  <p className="mt-3 text-base font-semibold text-white">{item.value}</p>
                </a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
