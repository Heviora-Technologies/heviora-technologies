import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import SiteEffects from '../components/SiteEffects'
import useLenisSmoothScroll from '../hooks/useLenisSmoothScroll'

export default function MainLayout() {
  useLenisSmoothScroll()

  return (
    <div className="min-h-screen overflow-hidden bg-background text-white">
      <SiteEffects />
      <NavBar />
      <main className="relative overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
