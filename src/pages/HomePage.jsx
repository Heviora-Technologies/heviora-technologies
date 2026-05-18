import { Suspense, lazy } from 'react'
import { SectionLoader } from '../components/LoadingStates'

// Lazy load sections for better performance and code splitting
const HeroSection = lazy(() => import('../sections/HeroSection'))
const AboutSection = lazy(() => import('../sections/AboutSection'))
const TrustedTechSection = lazy(() => import('../sections/TrustedTechSection'))
const WhyChooseSection = lazy(() => import('../sections/WhyChooseSection'))
const TestimonialsSection = lazy(() => import('../sections/TestimonialsSection'))
const SolutionsSection = lazy(() => import('../sections/SolutionsSection'))
const ProjectsSection = lazy(() => import('../sections/ProjectsSection'))
const ContactSection = lazy(() => import('../sections/ContactSection'))

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<SectionLoader />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TrustedTechSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <WhyChooseSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SolutionsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
    </>
  )
}
