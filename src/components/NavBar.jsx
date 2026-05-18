import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Mail } from 'lucide-react'
import BrandLogo from './BrandLogo'
import { navItems } from '../utils/navigation'
import { isMobile } from '../utils/deviceDetection'

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
    if (isMobile()) {
      document.documentElement.style.overflow = isOpen ? 'hidden' : ''
      document.body.style.overflow = isOpen ? 'hidden' : ''
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full border-b border-[rgba(59,130,246,0.18)] transition duration-500 backdrop-blur-3xl ${
        scrolled ? 'navbar-glass shadow-[0_35px_120px_rgba(0,0,0,0.35)]' : 'bg-[#050816]/16'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5">
        <a href="#home" className="inline-flex items-center gap-2 shrink-0 text-white transition hover:text-white/90 sm:gap-3">
          <BrandLogo size="sm" hideText={isMobile()} />
        </a>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`navbar-glow-link group relative text-sm font-medium transition ${
                activeSection === item.href.slice(1) ? 'text-white' : 'text-[#B8C1D1]'
              } `}
            >
              {item.name}
              <span
                className={`absolute left-0 -bottom-1 h-[1.5px] w-full origin-left transition-transform duration-300 ease-out ${
                  activeSection === item.href.slice(1) ? 'scale-x-100 bg-[#00C2FF]' : 'scale-x-0 bg-[#00AFFF]'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex lg:gap-3">
          <a
            href="mailto:hevioratechnologies@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(59,130,246,0.2)] bg-[rgba(10,25,47,0.72)] px-3 py-2 text-xs text-[#B8C1D1] transition hover:border-[#00AFFF]/40 hover:bg-[rgba(0,175,255,0.08)] lg:px-4 lg:text-sm"
          >
            <Mail className="h-4 w-4 shrink-0 text-[#00AFFF]" />
            <span className="hidden xl:inline">hevioratechnologies@gmail.com</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(59,130,246,0.2)] bg-[rgba(10,25,47,0.78)] text-[#B8C1D1] transition hover:bg-[rgba(0,175,255,0.12)] sm:h-12 sm:w-12 sm:rounded-3xl md:hidden"
        >
          {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed inset-x-4 top-16 z-40 rounded-2xl border border-[rgba(59,130,246,0.25)] bg-[#071426]/95 p-4 shadow-[0_60px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl sm:inset-x-6 sm:top-[86px] sm:rounded-[32px] sm:p-6 md:hidden"
          >
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="grid gap-2 sm:gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,25,47,0.72)] px-4 py-3 text-base font-semibold text-white transition hover:border-[#00AFFF]/40 hover:bg-[rgba(0,175,255,0.08)] sm:rounded-3xl sm:px-5 sm:py-4"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <a
                href="mailto:hevioratechnologies@gmail.com"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#00AFFF] px-4 py-3 text-base font-semibold text-[#050816] transition hover:bg-[#3B82F6] sm:rounded-3xl sm:px-5 sm:py-4"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                Contact our team
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
