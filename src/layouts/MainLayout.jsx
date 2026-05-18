import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import SiteEffects from '../components/SiteEffects'
import useLenisSmoothScroll from '../hooks/useLenisSmoothScroll'
import { disableHorizontalScroll } from '../utils/responsive'

export default function MainLayout() {
  useLenisSmoothScroll()

  useEffect(() => {
    // Prevent horizontal scrolling
    const cleanup = disableHorizontalScroll()
    
    // Disable pull-to-refresh on mobile (improves performance)
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }, { passive: false })

    return cleanup
  }, [])

  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto bg-background text-white">
      <SiteEffects />
      <NavBar />
      <main className="relative w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
