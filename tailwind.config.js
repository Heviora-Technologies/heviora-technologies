/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        surface: '#071426',
        'card-bg': 'rgba(10,25,47,0.65)',
        'glow-primary': '#00AFFF',
        'glow-secondary': '#3B82F6',
        purple: '#8B5CF6',
        text: '#FFFFFF',
        'text-secondary': '#B8C1D1',
        'border-glow': 'rgba(59,130,246,0.35)',
      },
      boxShadow: {
        glow: '0 0 80px rgba(0,175,255,0.18)',
        'card-neon': '0 25px 120px rgba(0,175,255,0.12)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(0,175,255,0.14), transparent 30%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

