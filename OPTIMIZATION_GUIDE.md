# Website Performance Optimization Guide

## Overview
This document outlines all the performance optimizations applied to the Heviora Technologies website for production-grade performance and mobile responsiveness.

## 1. Mobile Device Detection & Optimization

### Implementation: `src/utils/deviceDetection.js`
- **Mobile Detection**: Devices < 768px width
- **Tablet Detection**: 768px - 1024px width
- **Optimized Canvas DPR**: 
  - Mobile: 1.0 (no upscaling)
  - Tablet: 1.5 max
  - Desktop: 2.0 max
- **Connection Speed Detection**: Detects 2G, 3G, 4G networks
- **Low-End Device Detection**: Based on device memory and connection
- **Accessibility**: Respects `prefers-reduced-motion` preference

### Key Functions:
- `isMobile()` - Detect mobile devices
- `isTablet()` - Detect tablets  
- `getOptimizedDPR()` - Get optimal pixel ratio for device
- `supportsHover()` - Check for hover support
- `isSlowConnection()` - Detect slow 2G/3G networks
- `isLowEndDevice()` - Detect low-end devices

## 2. Three.js Optimizations

### HeroCanvas Optimizations: `src/components/HeroCanvas.jsx`

#### Canvas Rendering:
- **Antialiasing**: Disabled on mobile to save GPU memory
- **Power Preference**: Set to `low-power` on mobile, `high-performance` on desktop
- **Shadows**: Disabled on mobile (significant performance hit)
- **Shadow Map Type**: PCFShadowMap for desktop only

#### Geometry Optimization:
```
Desktop: 48x48 sphere segments, 36 cylinder segments, 64 torus segments
Mobile:  24x24 sphere segments, 16 cylinder segments, 32 torus segments
```

#### Lighting:
- Reduced ambient light intensity on mobile (0.18 → 0.25)
- Reduced key light intensity on mobile (0.9 → 0.7)
- Removed rim light completely on mobile
- Removed eye light effects on mobile

#### Animation:
- Grid floor disabled on mobile
- Particle count reduced on mobile (220 → 50)
- Disabled eye lights on mobile
- Entrance animations skipped on slow connections
- Used `performance.now()` instead of deprecated `THREE.Clock`

#### Cursor Interaction:
- Head tracking disabled on mobile
- Pointer move listeners not added on mobile

#### Cleanup:
- Proper disposal of geometries and materials
- Prevents memory leaks

## 3. Responsive Design Improvements

### Global CSS: `src/index.css`
```css
/* Prevent horizontal scrolling globally */
html, body {
  max-width: 100vw;
  overflow-x: hidden;
}
```

### Responsive Utilities: `src/utils/responsive.js`
- `disableHorizontalScroll()` - Prevent unwanted horizontal scrolling
- `preventBodyOverflow()` - Manage overflow states
- `getResponsiveFontSize()` - Dynamic font sizing
- `getResponsiveSpacing()` - Responsive spacing values
- `debounce()` - Efficient resize listeners
- `throttle()` - Efficient scroll listeners

### HeroSection Improvements: `src/sections/HeroSection.jsx`
- **Breakpoints**:
  - Mobile (< 640px): Reduced padding (px-4 py-12)
  - Tablet (640px - 1024px): Medium padding
  - Desktop (> 1024px): Full padding
- **Typography**: Responsive font sizes (text-4xl → text-6xl)
- **Spacing**: Flexible gaps based on viewport
- **Buttons**: Full width on mobile, inline on desktop
- **Features Grid**: Single column on mobile, two columns on tablet+
- **Canvas**: Lazy loaded with Suspense fallback

### NavBar Improvements: `src/components/NavBar.jsx`
- Responsive padding and sizing
- Mobile-optimized touch targets (10x10 minimum)
- Hidden elements on mobile (contact email)
- Mobile menu with proper spacing
- Responsive font sizes
- Menu animations disabled on slow devices

## 4. Code Splitting & Bundle Optimization

### Vite Configuration: `vite.config.js`

#### Build Optimization:
```javascript
build: {
  target: 'esnext',
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,      // Remove console logs
      drop_debugger: true,     // Remove debuggers
    },
  },
}
```

#### Manual Code Splitting:
- **three-vendor**: Three.js and 3D dependencies (isolated large chunk)
- **react-vendor**: React and React DOM (stable, not updated often)
- **framer-vendor**: Framer Motion (animation library)
- **gsap-vendor**: GSAP animations
- **vendor**: Other node_modules
- **Entry**: Application code

#### Asset Optimization:
- Images: `images/[name]-[hash].jpg`
- Fonts: `fonts/[name]-[hash].woff2`
- CSS: `css/[name]-[hash].css`
- JS: `js/[name]-[hash].js`

#### Dependencies Optimization:
- Pre-bundled common dependencies for faster dev startup
- CSS code splitting enabled
- Chunk size warning limit: 1000KB

## 5. Component Lazy Loading

### Implementation: `src/pages/HomePage.jsx`
```javascript
const HeroSection = lazy(() => import('../sections/HeroSection'))
const AboutSection = lazy(() => import('../sections/AboutSection'))
// ... other sections
```

Each section wrapped with Suspense:
```javascript
<Suspense fallback={<SectionLoader />}>
  <HeroSection />
</Suspense>
```

### Loading States: `src/components/LoadingStates.jsx`
- `SectionLoader`: Skeleton loading for full sections
- `CardLoader`: Skeleton for card components
- `ImageLoader`: Skeleton for image placeholders
- `SkeletonText`: Reusable skeleton text lines
- `ComponentLoader`: Generic component loader

**Benefits**:
- Faster initial page load (FCP/LCP improvement)
- Smaller initial bundle
- Progressive page rendering
- Better perceived performance

## 6. Image Optimization

### OptimizedImage Component: `src/components/OptimizedImage.jsx`

#### Features:
- **Lazy Loading**: Images load on visibility (50px margin)
- **WebP Support**: Automatic fallback to PNG/JPG
- **Placeholder**: SVG placeholder with correct aspect ratio
- **Priority Images**: Immediate loading for above-fold content
- **Error Handling**: Graceful fallback on load errors

#### Usage:
```jsx
<OptimizedImage
  src="image.jpg"
  webpSrc="image.webp"
  alt="Description"
  width={800}
  height={600}
  priority={false}
/>
```

#### LazyBackgroundImage:
- Background images with lazy loading
- WebP support with fallback
- Smooth loading experience

## 7. Performance Hooks: `src/hooks/useOptimization.js`

### Custom Hooks:
1. **useLazyImage()**: Lazy load images with intersection observer
2. **useResponsive()**: Track viewport size and device type
3. **useIntersectionObserver()**: Generic intersection observer hook
4. **usePerformanceMetrics()**: Track FCP, LCP, CLS, TTFB
5. **usePreloadImage()**: Preload critical images
6. **useFetch()**: Fetch with retry logic and error handling

## 8. Server-Side Optimizations

### Express Server: `server.js`

#### Compression:
- Added `express-compression` middleware
- Gzip compression for all responses
- Significant bandwidth reduction (60-80%)

#### Static Asset Caching:
```javascript
// HTML: No cache (always revalidate)
Cache-Control: no-cache, no-store, must-revalidate

// JS/CSS/Fonts/WebP: Immutable, 1 year cache
Cache-Control: public, max-age=31536000, immutable

// Other assets: 1 hour cache
Cache-Control: public, max-age=3600
```

#### Request Limits:
- JSON payload: 10MB limit
- URL encoded: 10MB limit
- Rate limiting on contact form (8 second minimum between submissions)

## 9. Package.json Updates

### New Dependencies:
- `express-compression`: Server-side compression
- `three-stdlib`: Additional Three.js utilities
- `sharp`: Image processing for WebP conversion
- `vite-plugin-compression`: Vite compression plugin
- `vite-bundle-visualizer`: Analyze bundle size
- `terser`: Advanced minification

### Scripts:
```json
"dev": "vite",
"build": "vite build",
"preview": "vite preview",
"start": "node server.js",
"analyze": "vite-bundle-visualizer"
```

## 10. Performance Targets

### Lighthouse Scores:
- **Target**: > 90 overall
- **Performance**: > 90
- **Accessibility**: > 90
- **Best Practices**: > 90
- **SEO**: > 90

### Core Web Vitals:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Mobile Performance:
- **FCP (First Contentful Paint)**: < 1.8s on 4G
- **Time to Interactive**: < 3.8s on 4G
- **Total Blocking Time**: < 200ms

## 11. Best Practices Applied

### Mobile-First Approach:
1. Test on real devices
2. Optimize for low-end Android
3. Support offline features where possible
4. Minimize data usage

### Performance Monitoring:
1. Use Chrome DevTools
2. Monitor Core Web Vitals
3. Test on slow connections (Throttling)
4. Use Lighthouse regularly

### Asset Management:
1. Convert images to WebP format
2. Optimize image dimensions
3. Use appropriate compression
4. Lazy load non-critical assets

### Code Quality:
1. Remove unused code (tree-shaking)
2. Minify JavaScript and CSS
3. Enable source maps only in dev
4. Use code splitting effectively

## 12. Browser Support

### Target Browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

### Polyfills:
- IntersectionObserver (for lazy loading)
- Performance API (for metrics)
- CSS Grid/Flexbox (for layout)

## 13. Deployment Recommendations

### Vercel:
1. Enable automatic image optimization
2. Use edge caching for assets
3. Enable gzip compression
4. Set environment variables

### Build:
```bash
npm run build
npm start
```

### Environment Variables:
```env
PORT=5000
CONTACT_ORIGIN=https://yourdomain.com
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
EMAIL_TO=target-email
```

## 14. Testing Performance

### Tools:
1. **Lighthouse**: Built-in Chrome DevTools
2. **WebPageTest**: In-depth performance analysis
3. **GTmetrix**: Performance metrics and recommendations
4. **Bundle Analyzer**: Check bundle size
```bash
npm run analyze
```

### Mobile Testing:
1. Chrome DevTools device emulation
2. Real device testing (Android/iOS)
3. Slow network simulation (3G/4G)
4. CPU throttling simulation

## 15. Monitoring & Maintenance

### Regular Checks:
- Monitor Core Web Vitals monthly
- Review bundle size in each release
- Test on real devices
- Check for performance regressions

### Future Optimizations:
1. Service Worker for offline support
2. Edge caching strategies
3. Database query optimization
4. API response caching
5. Background image optimization

## Summary

The website has been comprehensively optimized for:
- ✅ Mobile devices (< 768px)
- ✅ Slow connections (2G/3G)
- ✅ Low-end devices (< 2GB RAM)
- ✅ Fast initial load (< 2.5s LCP)
- ✅ Smooth interactions (< 100ms FID)
- ✅ Visual stability (< 0.1 CLS)
- ✅ Production-grade performance
- ✅ Accessibility and responsiveness

All optimizations follow web standards and best practices for modern web development.
