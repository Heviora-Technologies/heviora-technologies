/**
 * Responsive design utilities and helpers
 */

/**
 * Clamp a value between min and max
 */
export const clamp = (min, value, max) => Math.min(Math.max(value, min), max)

/**
 * Prevent horizontal scrolling
 */
export const disableHorizontalScroll = () => {
  if (typeof document === 'undefined') return () => {}
  
  const preventScroll = (e) => {
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
    if (scrollLeft > 0) {
      document.documentElement.scrollLeft = 0
      document.body.scrollLeft = 0
    }
  }
  
  window.addEventListener('scroll', preventScroll, { passive: false })
  
  return () => {
    window.removeEventListener('scroll', preventScroll)
  }
}

/**
 * Prevent body overflow on mobile
 */
export const preventBodyOverflow = (prevent = true) => {
  if (typeof document === 'undefined') return
  
  if (prevent) {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    // Prevent horizontal scrolling
    document.documentElement.style.overflowX = 'hidden'
    document.body.style.overflowX = 'hidden'
  } else {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    document.documentElement.style.overflowX = ''
    document.body.style.overflowX = ''
  }
}

/**
 * Get responsive font size based on viewport width
 */
export const getResponsiveFontSize = (mobileSize, tabletSize, desktopSize) => {
  if (typeof window === 'undefined') return desktopSize
  
  const width = window.innerWidth
  if (width < 640) return mobileSize
  if (width < 1024) return tabletSize
  return desktopSize
}

/**
 * Get responsive spacing value
 */
export const getResponsiveSpacing = (mobile, tablet, desktop) => {
  if (typeof window === 'undefined') return desktop
  
  const width = window.innerWidth
  if (width < 768) return mobile
  if (width < 1024) return tablet
  return desktop
}

/**
 * Check if viewport is in portrait mode
 */
export const isPortrait = () => {
  if (typeof window === 'undefined') return true
  return window.innerHeight > window.innerWidth
}

/**
 * Check if viewport is in landscape mode
 */
export const isLandscape = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth > window.innerHeight
}

/**
 * Get viewport dimensions safely
 */
export const getViewportDimensions = () => {
  if (typeof window === 'undefined') {
    return { width: 1024, height: 768 }
  }
  
  return {
    width: Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ),
    height: Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ),
  }
}

/**
 * Debounce utility for resize listeners
 */
export const debounce = (func, wait = 250) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle utility for scroll listeners
 */
export const throttle = (func, limit = 100) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Create responsive style object
 */
export const createResponsiveStyle = (styles) => {
  const { mobile = {}, tablet = {}, desktop = {} } = styles
  const width = getViewportDimensions().width
  
  if (width < 768) return mobile
  if (width < 1024) return tablet
  return desktop
}
