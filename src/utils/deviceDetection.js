/**
 * Device detection and optimization utilities
 */

// Cache the mobile detection result
let isMobileCache = null
let isTabletCache = null

/**
 * Detect if device is mobile (<768px)
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  if (isMobileCache === null) {
    isMobileCache = window.innerWidth < 768
  }
  return isMobileCache
}

/**
 * Detect if device is tablet (768px - 1024px)
 */
export const isTablet = () => {
  if (typeof window === 'undefined') return false
  if (isTabletCache === null) {
    isTabletCache = window.innerWidth >= 768 && window.innerWidth < 1024
  }
  return isTabletCache
}

/**
 * Get optimized canvas DPR for the device
 * Reduces on mobile to improve performance
 */
export const getOptimizedDPR = () => {
  if (typeof window === 'undefined') return 1
  const dpr = window.devicePixelRatio || 1
  const isMobileDevice = isMobile()
  
  if (isMobileDevice) {
    // Cap at 1 on mobile for better performance
    return Math.min(dpr, 1)
  }
  if (isTablet()) {
    // Cap at 1.5 on tablets
    return Math.min(dpr, 1.5)
  }
  // Desktop: cap at 1.5 to prevent GPU overload on 4K/retina displays
  return Math.min(dpr, 1.5)
}

/**
 * Check if device supports hover interactions
 */
export const supportsHover = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover)').matches
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check connection speed
 * Returns: '4g', '3g', '2g', 'slow-2g', or 'unknown'
 */
export const getConnectionSpeed = () => {
  if (typeof navigator === 'undefined') return 'unknown'
  
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (!connection) return 'unknown'
  
  return connection.effectiveType || 'unknown'
}

/**
 * Check if connection is slow (2g or 3g)
 */
export const isSlowConnection = () => {
  const speed = getConnectionSpeed()
  return speed === '2g' || speed === '3g' || speed === 'slow-2g'
}

/**
 * Get optimized animation settings based on device
 */
export const getAnimationSettings = () => {
  const isMobileDevice = isMobile()
  const hasSlowConnection = isSlowConnection()
  const reducedMotion = prefersReducedMotion()
  
  return {
    enabled: !reducedMotion,
    reduceParticles: isMobileDevice || hasSlowConnection,
    disableHeavyAnimations: isMobileDevice,
    lowQualityMode: isSlowConnection(),
  }
}

/**
 * Get optimal texture size for device
 */
export const getOptimalTextureSize = () => {
  if (isMobile()) return 512
  if (isTablet()) return 1024
  return 2048
}

/**
 * Setup window resize listener and reset cache
 */
export const setupDeviceDetectionListener = (callback) => {
  if (typeof window === 'undefined') return () => {}
  
  let resizeTimeout
  
  const handleResize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      isMobileCache = window.innerWidth < 768
      isTabletCache = window.innerWidth >= 768 && window.innerWidth < 1024
      if (callback) callback()
    }, 250)
  }
  
  window.addEventListener('resize', handleResize, { passive: true })
  
  return () => {
    window.removeEventListener('resize', handleResize)
    clearTimeout(resizeTimeout)
  }
}

/**
 * Get available memory on device
 */
export const getDeviceMemory = () => {
  if (typeof navigator === 'undefined') return 4
  return navigator.deviceMemory || 4
}

/**
 * Check if device is low-end (limited memory)
 */
export const isLowEndDevice = () => {
  return getDeviceMemory() <= 2 || getConnectionSpeed() === '2g'
}
