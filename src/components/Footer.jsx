import { GitBranch, Link2, MapPin, Mail } from 'lucide-react'
import BrandLogo from './BrandLogo'

export default function Footer() {
  return (
    <footer className="relative overflow-x-hidden border-t border-[rgba(59,130,246,0.18)] bg-[#050816] px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(0,175,255,0.18),transparent_70%)]" />
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.2fr_auto] lg:items-center lg:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" hideText={false} />
          </div>
          <p className="max-w-2xl text-sm text-[#B8C1D1]">
            Heviora Technologies builds premium AI products, cinematic enterprise systems and futuristic digital experiences for ambitious brands.
          </p>
          <div className="grid gap-3 text-sm text-[#B8C1D1] sm:grid-cols-2">
            <div className="inline-flex items-center gap-3 rounded-3xl border border-[rgba(59,130,246,0.18)] bg-[rgba(10,25,47,0.65)] px-4 py-3">
              <Mail className="h-4 w-4 text-[#00AFFF]" />
              hevioratechnologies@gmail.com
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl border border-[rgba(59,130,246,0.18)] bg-[rgba(10,25,47,0.65)] px-4 py-3">
              <MapPin className="h-4 w-4 text-[#00AFFF]" />
              India
            </div>
          </div>
        </div>

        <div className="grid gap-3 text-sm text-[#B8C1D1]">
          <a
            href="https://github.com/Heviora-Technologies"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-3xl border border-[rgba(59,130,246,0.18)] bg-[rgba(10,25,47,0.65)] px-4 py-3 text-white transition hover:border-[#00AFFF]/40 hover:bg-[rgba(0,175,255,0.08)]"
          >
            <GitBranch className="h-4 w-4 text-[#00AFFF]" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/company/heviora-technologies"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-3xl border border-[rgba(59,130,246,0.18)] bg-[rgba(10,25,47,0.65)] px-4 py-3 text-white transition hover:border-[#00AFFF]/40 hover:bg-[rgba(0,175,255,0.08)]"
          >
            <Link2 className="h-4 w-4 text-[#00AFFF]" /> LinkedIn
          </a>
        </div>
      </div>
      <div className="mt-10 border-t border-[rgba(59,130,246,0.14)] pt-6 text-center text-xs text-[#B8C1D1]">
        © {new Date().getFullYear()} Heviora Technologies. Crafted for premium AI startups.
      </div>
    </footer>
  )
}
