import { motion } from 'framer-motion'

export default function BrandLogo({ size = 'md', hideText = false }) {
  const dimension = size === 'sm' ? 40 : size === 'lg' ? 72 : 52
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'

  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      className="inline-flex items-center gap-3"
    >
      <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[18px] border border-[rgba(59,130,246,0.35)] bg-[rgba(10,25,47,0.45)] shadow-[0_0_40px_rgba(0,175,255,0.16)] backdrop-blur-xl sm:h-[56px] sm:w-[56px]">
        <svg viewBox="0 0 100 100" className="h-[70%] w-[70%]" aria-hidden="true">
          <defs>
            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00AFFF" />
              <stop offset="60%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="brandGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="24" stroke="url(#brandGradient)" strokeWidth="8" fill="none" filter="url(#brandGlow)" opacity="0.95" />
          <path
            d="M65 32C59 32 55 36 55 42c0 6 4 10 10 10s10-4 10-10c0-6-4-10-10-10Zm-30 36c6 0 10-4 10-10s-4-10-10-10-10 4-10 10 4 10 10 10Zm4-22.8c0 4.4 3.6 8 8 8h18"
            fill="none"
            stroke="url(#brandGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#brandGlow)"
            opacity="0.9"
          />
        </svg>
      </div>
      {!hideText && (
        <div className="space-y-1 leading-tight">
          <p className={`font-semibold uppercase tracking-[0.28em] text-white ${textSize}`}>Heviora</p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#B8C1D1]">Technologies</p>
        </div>
      )}
    </motion.div>
  )
}
