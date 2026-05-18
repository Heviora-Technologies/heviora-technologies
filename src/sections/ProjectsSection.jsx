import { motion } from 'framer-motion'
import { ArrowRight, GitBranch, Globe2, Monitor, Cpu, ShoppingBag, Layers, ExternalLink, Zap, Activity } from 'lucide-react'
import { useState, useRef } from 'react'
import { fadeIn, staggerContainer } from '../animations/motionVariants'

const projects = [
  {
    title: 'AI Analytics Dashboard',
    description: 'Enterprise AI analytics platform with predictive insights, real-time operational intelligence, and automated anomaly detection. Delivers actionable intelligence for data-driven decision making.',
    status: 'Live',
    badge: 'AI-Powered',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'OpenAI API', 'MongoDB', 'AWS', 'Tailwind CSS', 'Framer Motion'],
    icon: Monitor,
    visual: 'dashboard',
    color: 'cyan',
  },
  {
    title: 'Modern E-Commerce Platform',
    description: 'Scalable modern commerce platform with AI-powered recommendations, secure payments, optimized checkout flow, and intelligent inventory management for seamless customer experiences.',
    status: 'Live',
    badge: 'Production',
    tech: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Cloudinary', 'JWT Auth', 'AWS S3'],
    icon: ShoppingBag,
    visual: 'ecommerce',
    color: 'pink',
  },
  {
    title: 'SaaS Workflow Manager',
    description: 'Cloud-native workflow automation system designed for enterprise collaboration, team management, and intelligent task orchestration. Enterprise-grade security and performance.',
    status: 'Live',
    badge: 'Enterprise',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS', 'Socket.IO', 'GraphQL', 'Redis'],
    icon: Layers,
    visual: 'saas',
    color: 'purple',
  },
  {
    title: 'Intelligent AI Assistant',
    description: 'Context-aware productivity agent powered by advanced language models. Multi-turn conversations with memory, real-time processing, and seamless integration with enterprise tools.',
    status: 'Live',
    badge: 'AI-Powered',
    tech: ['Python', 'FastAPI', 'OpenAI', 'AWS Lambda', 'PostgreSQL', 'Redis', 'Docker', 'LangChain', 'Vector DB'],
    icon: Cpu,
    visual: 'assistant',
    color: 'blue',
  },
  {
    title: 'Advanced Analytics Suite',
    description: 'Real-time data visualization platform with predictive analytics, custom dashboards, and business intelligence tools. Processing millions of events with sub-second latency.',
    status: 'Live',
    badge: 'Analytics',
    tech: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Apache Kafka', 'Elasticsearch', 'AWS', 'Tailwind CSS', 'WebSockets'],
    icon: Globe2,
    visual: 'analytics',
    color: 'green',
  },
]

// Project Visual Components
const ProjectVisual = ({ type, color }) => {
  const colorClasses = {
    cyan: 'from-cyan/20 to-blue/10',
    pink: 'from-pink/20 to-rose/10',
    purple: 'from-purple/20 to-violet/10',
    blue: 'from-blue/20 to-cyan/10',
    green: 'from-emerald/20 to-cyan/10',
  }

  return (
    <div className={`relative h-full w-full bg-gradient-to-br ${colorClasses[color]} overflow-hidden`}>
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Animated Glows */}
      <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-cyan/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-purple/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Dashboard Elements */}
      <div className="relative h-full w-full p-4 flex flex-col">
        {/* Header Bar */}
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs uppercase tracking-wider text-cyan/70">Live Data Feed</span>
        </div>

        {/* Mini Charts/Widgets */}
        <div className="flex-1 grid grid-cols-2 gap-2">
          {/* Chart 1 */}
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-2">
            <div className="space-y-1">
              <div className="text-xs text-cyan/70">Metric A</div>
              <svg viewBox="0 0 40 20" className="w-full h-8">
                <polyline points="0,15 8,8 16,12 24,5 32,10 40,3" stroke="currentColor" fill="none" className="text-cyan/60" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Chart 2 */}
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-2">
            <div className="space-y-1">
              <div className="text-xs text-pink/70">Metric B</div>
              <svg viewBox="0 0 40 20" className="w-full h-8">
                <polyline points="0,8 8,12 16,6 24,14 32,9 40,11" stroke="currentColor" fill="none" className="text-pink/60" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-2">
            <div className="text-xs text-purple/70 mb-1">CPU</div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-purple to-pink rounded-full" />
            </div>
          </div>

          {/* Response Time */}
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-2">
            <div className="text-xs text-blue/70 mb-1">Response</div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-blue to-cyan rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProjectCard = ({ project, index }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const Icon = project.icon

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-[28px] shadow-[0_32px_120px_rgba(2,10,30,0.35)] transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]"
      style={{
        perspective: '1000px',
      }}
    >
      {/* Interactive Glow Background */}
      {mousePosition.x > 0 && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 80%)`,
          }}
        />
      )}

      {/* Main Card Container */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0e1530] via-[#071025] to-[#081224] border border-white/10 transition duration-300 group-hover:border-white/20">
        {/* Animated Border Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className={`absolute inset-0 rounded-[28px] border border-${project.color} opacity-0 group-hover:opacity-20 transition duration-300`} />
        </div>

        {/* Project Visual Preview */}
        <div className="relative h-48 overflow-hidden rounded-t-[28px] bg-gradient-to-br from-white/5 to-transparent border-b border-white/10">
          <ProjectVisual type={project.visual} color={project.color} />
          {/* Overlay Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
        </div>

        {/* Content Section */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Header with Icon and Badges */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-transparent text-white shadow-lg group-hover:shadow-2xl group-hover:border-white/40 transition duration-300">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex gap-2">
              {project.status && (
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-300">{project.status}</span>
                </div>
              )}
              {project.badge && (
                <span className="rounded-full bg-cyan/20 border border-cyan/40 px-2.5 py-1 text-xs font-semibold text-cyan/90">
                  {project.badge}
                </span>
              )}
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan group-hover:to-blue group-hover:bg-clip-text transition duration-300 mb-3">
            {project.title}
          </h3>
          <p className="text-sm leading-6 text-slate-300 group-hover:text-slate-200 transition duration-300 mb-5">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white hover:shadow-lg hover:shadow-cyan/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-blue px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:shadow-lg hover:shadow-cyan/50 hover:scale-105 active:scale-95"
            >
              <ExternalLink className="h-4 w-4" />
              Live Preview
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:border-white/40 hover:bg-white/10 hover:shadow-lg hover:shadow-white/20"
            >
              Case Study
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 p-2.5 text-slate-300 transition duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/20"
              title="GitHub Repository"
            >
              <GitBranch className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden border-t border-white/10 px-6 py-20 sm:px-8 lg:px-10">
      {/* Ambient Gradient Backgrounds */}
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.14),_transparent_26%)] blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-20 h-56 w-56 rounded-full bg-[#8b5cf6]/15 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 max-w-4xl"
        >
          <motion.span variants={fadeIn('up', 0.1)} className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan/90 shadow-glow">
            <Zap className="h-3 w-3" />
            Featured Solutions
          </motion.span>
          <motion.h2 variants={fadeIn('up', 0.2)} className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Advanced digital solutions built for modern AI-driven businesses.
          </motion.h2>
          <motion.p variants={fadeIn('up', 0.3)} className="mt-6 text-lg leading-8 text-slate-300">
            Each solution combines scalable engineering, intelligent automation, modern UI systems, and enterprise-grade architecture to deliver impactful digital experiences.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
