import { useState, useEffect, useRef } from 'react'

/**
 * Hook for lazy loading images
 */
export function useLazyImage(src, alt, options = {}) {
  const [imageSrc, setImageSrc] = useState(null)
  const [imageRef, setImageRef] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image()
          img.onload = () => {
            setImageSrc(src)
            setIsLoading(false)
          }
          img.onerror = () => {
            setIsLoading(false)
          }
          img.src = src
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '50px', ...options }
    )

    if (imageRef) {
      observer.observe(imageRef)
    }

    return () => {
      if (imageRef) {
        observer.unobserve(imageRef)
      }
    }
  }, [src, imageRef, options])

  return { imageSrc, setImageRef, isLoading }
}

/**
 * Hook for managing responsive state
 */
export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setViewport({ width, height })
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions, { passive: true })

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return { isMobile, isTablet, viewport }
}

/**
 * Hook for IntersectionObserver
 */
export function useIntersectionObserver(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref?.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.1, ...options })

    observer.observe(ref.current)

    return () => {
      if (ref?.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isVisible
}

/**
 * Hook for measuring element performance
 */
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    fcp: null,
    lcp: null,
    cls: null,
    ttfb: null,
  })

  useEffect(() => {
    // Measure First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              setMetrics((prev) => ({ ...prev, fcp: entry.startTime }))
            }
          })
        })
        paintObserver.observe({ entryTypes: ['paint'] })

        // Measure Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          setMetrics((prev) => ({ ...prev, lcp: lastEntry.renderTime || lastEntry.loadTime }))
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // Measure Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let cls = 0
          list.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              cls += entry.value
            }
          })
          setMetrics((prev) => ({ ...prev, cls }))
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        return () => {
          paintObserver.disconnect()
          lcpObserver.disconnect()
          clsObserver.disconnect()
        }
      } catch (e) {
        // PerformanceObserver not supported
      }
    }

    // Measure Time to First Byte
    if (performance.timing) {
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart
      setMetrics((prev) => ({ ...prev, ttfb }))
    }
  }, [])

  return metrics
}

/**
 * Hook for preloading images
 */
export function usePreloadImage(src) {
  useEffect(() => {
    if (!src) return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [src])
}

/**
 * Hook for fetching with retry logic
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    let isMounted = true

    const fetchData = async (retries = 3) => {
      try {
        const response = await fetch(url, options)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const json = await response.json()
        if (isMounted) {
          setData(json)
          setError(null)
        }
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchData(retries - 1), 1000 * (4 - retries))
        } else if (isMounted) {
          setError(err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url, options])

  return { data, loading, error }
}
