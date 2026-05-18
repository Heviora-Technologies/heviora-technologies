import { useRef, useState } from 'react'
import { useLazyImage } from '../hooks/useOptimization'

/**
 * Optimized Image component with lazy loading and WebP support
 */
export function OptimizedImage({
  src,
  alt,
  webpSrc,
  className = '',
  width,
  height,
  onLoad,
  onError,
  priority = false,
  ...props
}) {
  const imgRef = useRef(null)
  const { imageSrc, setImageRef, isLoading } = useLazyImage(src, alt, priority ? { rootMargin: '50px' } : {})
  const [hasError, setHasError] = useState(false)

  if (priority) {
    // Don't lazy load priority images
    return (
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="eager"
          className={className}
          onLoad={onLoad}
          onError={(e) => {
            setHasError(true)
            onError?.(e)
          }}
          {...props}
        />
      </picture>
    )
  }

  return (
    <picture>
      {webpSrc && !hasError && <source srcSet={webpSrc} type="image/webp" />}
      <img
        ref={(el) => {
          setImageRef(el)
          imgRef.current = el
        }}
        src={imageSrc || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 800} ${height || 600}'%3E%3C/svg%3E`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={`${className} ${isLoading ? 'animate-pulse bg-slate-700' : ''}`}
        onLoad={onLoad}
        onError={(e) => {
          setHasError(true)
          onError?.(e)
        }}
        {...props}
      />
    </picture>
  )
}

/**
 * Background Image component with lazy loading
 */
export function LazyBackgroundImage({ src, webpSrc, className = '', children, ...props }) {
  const [imageSrc, setImageSrc] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)

  const handleLoad = (url) => {
    if (containerRef.current) {
      containerRef.current.style.backgroundImage = `url('${url}')`
      setImageSrc(url)
      setIsLoading(false)
    }
  }

  const loadImage = (url) => {
    const img = new Image()
    img.onload = () => handleLoad(url)
    img.src = url
  }

  // Try WebP first, fallback to standard format
  if (webpSrc && !imageSrc) {
    const img = new Image()
    img.onload = () => {
      loadImage(webpSrc)
    }
    img.onerror = () => {
      loadImage(src)
    }
    img.src = webpSrc
  } else if (!imageSrc) {
    loadImage(src)
  }

  return (
    <div
      ref={containerRef}
      className={`${className} ${isLoading ? 'bg-slate-800 animate-pulse' : ''}`}
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      {...props}
    >
      {children}
    </div>
  )
}
