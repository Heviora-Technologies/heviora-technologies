import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Mail } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { navItems } from '../utils/navigation'

const menuVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0.15 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-[rgba(59,130,246,0.18)] transition duration-500 backdrop-blur-3xl ${scrolled ? 'navbar-glass shadow-[0_35px_120px_rgba(0,0,0,0.35)]' : 'bg-[#050816]/16'}
        `}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8 md:py-5">
        <a href="#home" className="inline-flex items-center gap-3 text-white transition hover:text-white/90">
          <BrandLogo size="sm" hideText={false} />
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`navbar-glow-link group relative text-sm font-medium transition ${activeSection === item.href.slice(1) ? 'text-white' : 'text-[#B8C1D1]'} `}
            >
              {item.name}
              <span className={`absolute left-0 -bottom-1 h-[1.5px] w-full origin-left transition-transform duration-300 ease-out ${activeSection === item.href.slice(1) ? 'scale-x-100 bg-[#00C2FF]' : 'scale-x-0 bg-[#00AFFF]'}`} />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="mailto:hevioratechnologies@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(59,130,246,0.2)] bg-[rgba(10,25,47,0.72)] px-4 py-2 text-sm text-[#B8C1D1] transition hover:border-[#00AFFF]/40 hover:bg-[rgba(0,175,255,0.08)]"
          >
            <Mail className="h-4 w-4 text-[#00AFFF]" />
            hevioratechnologies@gmail.com
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-[rgba(59,130,246,0.2)] bg-[rgba(10,25,47,0.78)] text-[#B8C1D1] transition hover:bg-[rgba(0,175,255,0.12)] md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-x-6 top-[86px] z-50 rounded-[32px] border border-[rgba(59,130,246,0.25)] bg-[#071426]/95 p-6 shadow-[0_60px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl md:hidden"
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,25,47,0.72)] px-5 py-4 text-base font-semibold text-white transition hover:border-[#00AFFF]/40 hover:bg-[rgba(0,175,255,0.08)]"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <a
                href="mailto:hevioratechnologies@gmail.com"
                className="inline-flex items-center justify-center gap-3 rounded-3xl bg-[#00AFFF] px-5 py-4 text-base font-semibold text-[#050816] transition hover:bg-[#3B82F6]"
              >
                <Mail className="h-5 w-5" />
                Contact our team
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
