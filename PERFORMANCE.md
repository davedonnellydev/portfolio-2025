# Performance Optimization Guide

This document outlines the performance optimizations implemented in the portfolio website and provides guidelines for maintaining and improving performance.

## Table of Contents

- [Performance Goals](#performance-goals)
- [Optimizations Implemented](#optimizations-implemented)
- [Performance Monitoring](#performance-monitoring)
- [Best Practices](#best-practices)
- [Performance Budget](#performance-budget)
- [Troubleshooting](#troubleshooting)

---

## Performance Goals

### Target Metrics (Lighthouse)

| Metric | Target | Current Status |
|--------|--------|----------------|
| Performance | ≥ 95 | ✅ |
| Accessibility | 100 | ✅ |
| Best Practices | 100 | ✅ |
| SEO | 100 | ✅ |

### Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| **FID** (First Input Delay) | ≤ 100ms | ≤ 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| **FCP** (First Contentful Paint) | ≤ 1.8s | ≤ 3.0s | > 3.0s |
| **TTFB** (Time to First Byte) | ≤ 800ms | ≤ 1.8s | > 1.8s |
| **INP** (Interaction to Next Paint) | ≤ 200ms | ≤ 500ms | > 500ms |

---

## Optimizations Implemented

### 1. Image Optimization

#### Next.js Image Component
All images use Next.js `<Image>` component for automatic optimization:

```tsx
import Image from 'next/image';

// Hero image with priority loading
<Image
  src="/images/profile.png"
  alt="Dave Donnelly"
  width={400}
  height={400}
  priority
/>

// Lazy-loaded images (default)
<Image
  src={project.screenshot}
  alt={project.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  loading="lazy"
/>
```

#### Image Configuration
In `next.config.mjs`:

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

**Benefits:**
- Automatic format conversion (AVIF, WebP)
- Responsive image sizing
- Lazy loading below the fold
- Priority loading for above-the-fold images

#### Loading Strategy
- **Priority images**: Hero profile image (`priority` prop)
- **Eager loading**: Featured project images on homepage
- **Lazy loading**: Project cards on listing pages, below-the-fold content

**File locations:**
- `components/home/Hero/Hero.tsx` - Priority loading
- `components/projects/ProjectCard/ProjectCard.tsx` - Conditional loading strategy

---

### 2. Code Splitting & Lazy Loading

#### Dynamic Imports for Below-the-Fold Components
Homepage components are lazy-loaded to reduce initial bundle size:

```tsx
import dynamic from 'next/dynamic';

// Lazy load below-the-fold sections
const FeaturedProjects = dynamic(
  () => import('../components/home/FeaturedProjects').then(mod => mod.FeaturedProjects),
  { loading: () => null }
);

const WhyHireMe = dynamic(
  () => import('../components/home/WhyHireMe').then(mod => mod.WhyHireMe),
  { loading: () => null }
);

const MicroBio = dynamic(
  () => import('../components/home/MicroBio').then(mod => mod.MicroBio),
  { loading: () => null }
);
```

**Benefits:**
- Smaller initial JavaScript bundle
- Faster Time to Interactive (TTI)
- Components load as user scrolls
- No loading spinner needed (seamless experience)

**File location:** `app/page.tsx`

---

### 3. Font Optimization

#### Google Fonts via next/font
Self-hosted fonts with automatic optimization:

```tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',  // Prevents FOIT (Flash of Invisible Text)
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});
```

#### External Font (Satoshi) Optimization
Preconnect and DNS prefetch for faster loading:

```html
<link rel="preconnect" href="https://api.fontshare.com" />
<link rel="dns-prefetch" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=satoshi@500,600,700,900&display=swap"
  rel="stylesheet"
/>
```

**Benefits:**
- Eliminates layout shift (font-display: swap)
- Faster font loading via preconnect
- Self-hosted Google Fonts (no external requests)
- Subset loading (only Latin characters)

**File location:** `app/layout.tsx`

---

### 4. Static Generation & Build Optimization

#### Static Site Generation (SSG)
All pages are pre-rendered at build time:

```tsx
// Project pages with generateStaticParams
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
```

**Pages with SSG:**
- ✅ Homepage (`/`)
- ✅ Projects listing (`/projects`)
- ✅ Individual project pages (`/projects/[slug]`)
- ✅ About page (`/about`)
- ✅ Sitemap (`/sitemap.xml`)
- ✅ Robots.txt (`/robots.txt`)

#### Compiler Optimizations
In `next.config.mjs`:

```javascript
compiler: {
  // Remove console logs in production (keep errors and warnings)
  removeConsole: process.env.NODE_ENV === 'production'
    ? { exclude: ['error', 'warn'] }
    : false,
},
swcMinify: true,  // Use SWC for faster minification
compress: true,   // Enable gzip compression
generateEtags: true,  // Generate ETags for caching
```

**Benefits:**
- Instant page loads (pre-rendered HTML)
- Better SEO (crawlable content)
- Smaller bundle size (console logs removed)
- Better caching (ETags)

---

### 5. Package Optimization

#### Mantine Package Imports
Automatic tree-shaking for Mantine components:

```javascript
experimental: {
  optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
}
```

**Benefits:**
- Smaller bundle size
- Only imports used components
- Faster build times

#### Bundle Analysis
Analyze bundle size:

```bash
ANALYZE=true npm run build
```

**Current bundle sizes:**
- First Load JS (shared): 102 kB
- Homepage: 138 kB
- Projects listing: 145 kB
- Individual project: 184 kB

**File location:** `next.config.mjs`

---

### 6. Network Optimization

#### Resource Hints
Preconnect and DNS prefetch for external resources:

```html
<!-- Faster font loading -->
<link rel="preconnect" href="https://api.fontshare.com" />
<link rel="dns-prefetch" href="https://api.fontshare.com" />
```

#### Caching Strategy
- **Static assets**: Cached indefinitely (cache-busted via hashes)
- **Images**: 60-second minimum cache TTL
- **Pages**: Cached at CDN edge (Vercel)

**Benefits:**
- Reduced latency for external resources
- Faster subsequent page loads
- Lower bandwidth usage

---

### 7. Animation Performance

#### GPU-Accelerated Animations
AnimatedBackground uses hardware acceleration:

```tsx
// Canvas-based animation with requestAnimationFrame
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ... render logic
  animationFrameRef.current = requestAnimationFrame(animate);
};
```

#### Reduced Motion Support
Respects user preferences:

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Only animate if user hasn't requested reduced motion
  animate();
}
```

**Benefits:**
- Smooth 60 FPS animations
- No layout thrashing
- Respects accessibility preferences
- Minimal CPU/GPU usage

**File location:** `components/shared/AnimatedBackground/AnimatedBackground.tsx`

---

## Performance Monitoring

### Web Vitals Tracking

The portfolio includes automatic Core Web Vitals monitoring:

```tsx
import { WebVitals } from '@/components/shared/WebVitals';

// In layout.tsx
<Analytics />
<WebVitals />
```

**Metrics tracked:**
- ✅ LCP (Largest Contentful Paint)
- ✅ FID (First Input Delay)
- ✅ CLS (Cumulative Layout Shift)
- ✅ FCP (First Contentful Paint)
- ✅ TTFB (Time to First Byte)
- ✅ INP (Interaction to Next Paint)

### Custom Performance Monitoring

Use the `PerformanceMonitor` utility for custom metrics:

```tsx
import { performanceMonitor } from '@/lib/performance';

// Start measurement
performanceMonitor.mark('data-fetch-start');

// ... fetch data

// End measurement and report
performanceMonitor.measure('data-fetch-start');
```

### Device Capability Detection

Adapt features based on device capabilities:

```tsx
import { getPerformanceAdvice } from '@/lib/performance';

const advice = getPerformanceAdvice();

if (advice.shouldReduceAnimations) {
  // Disable or reduce animations
}

if (advice.shouldLazyLoadImages) {
  // Use aggressive lazy loading
}
```

**File location:** `lib/performance.ts`

---

## Best Practices

### When Adding New Features

#### ✅ DO:

1. **Use Next.js Image component** for all images
   ```tsx
   import Image from 'next/image';
   <Image src="/path" alt="description" width={400} height={300} />
   ```

2. **Lazy load below-the-fold components**
   ```tsx
   const Component = dynamic(() => import('./Component'));
   ```

3. **Use loading="lazy" for images** not in viewport
   ```tsx
   <Image src="/image.jpg" alt="..." loading="lazy" />
   ```

4. **Preconnect to external domains** you'll fetch from
   ```html
   <link rel="preconnect" href="https://example.com" />
   ```

5. **Respect reduced motion preferences**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * { animation: none !important; }
   }
   ```

6. **Use static generation** when possible
   ```tsx
   export async function generateStaticParams() { ... }
   ```

#### ❌ AVOID:

1. **Don't use `unoptimized` prop** on images
   ```tsx
   <Image src="/image.jpg" unoptimized /> // ❌ Bad
   ```

2. **Don't import large libraries** without tree-shaking
   ```tsx
   import * as _ from 'lodash'; // ❌ Bad
   import { debounce } from 'lodash-es'; // ✅ Good
   ```

3. **Don't block rendering** with synchronous operations
   ```tsx
   // ❌ Bad - blocks rendering
   const data = fetchDataSync();

   // ✅ Good - async loading
   const data = await fetchData();
   ```

4. **Don't use inline styles** for animations
   ```tsx
   <div style={{ transform: 'translateY(...)' }} /> // ❌ Bad
   ```

5. **Don't use large images** without optimization
   - Optimize images before adding to `/public`
   - Use appropriate formats (AVIF > WebP > JPG)
   - Compress with tools like ImageOptim, Squoosh

---

## Performance Budget

### Bundle Size Limits

| Page | Max First Load JS | Current |
|------|-------------------|---------|
| Homepage | 150 kB | 138 kB ✅ |
| Projects | 160 kB | 145 kB ✅ |
| Project Detail | 200 kB | 184 kB ✅ |
| About | 130 kB | 117 kB ✅ |

### Image Size Guidelines

| Image Type | Max File Size | Format | Dimensions |
|-----------|---------------|--------|------------|
| Profile photo | 100 kB | WebP/AVIF | 400×400 |
| Project screenshot | 150 kB | WebP/AVIF | 1200×630 |
| Logo/Icon | 20 kB | SVG preferred | Vector |
| OG Image | 200 kB | JPG | 1200×630 |

### Performance Checklist

Before deploying changes, verify:

- [ ] `npm run build` completes without errors
- [ ] No bundle size increases > 10%
- [ ] Lighthouse Performance score ≥ 95
- [ ] All Core Web Vitals in "Good" range
- [ ] Images optimized (WebP/AVIF format)
- [ ] No console errors in production build
- [ ] Reduced motion preferences respected
- [ ] Below-the-fold content lazy loaded

---

## Troubleshooting

### Issue: Lighthouse Performance Score Low

**Symptoms:** Performance score < 90

**Solutions:**
1. Check bundle size: `ANALYZE=true npm run build`
2. Verify images use `<Image>` component
3. Ensure below-the-fold content is lazy loaded
4. Check for large dependencies in build output
5. Verify static generation is working

### Issue: Slow Page Loads

**Symptoms:** TTFB > 1.8s, LCP > 4s

**Solutions:**
1. Verify pages are statically generated (not server-rendered)
2. Check CDN caching headers
3. Optimize images (format, size, compression)
4. Review network waterfall in DevTools
5. Check for slow external resources

### Issue: Layout Shift (High CLS)

**Symptoms:** CLS > 0.1

**Solutions:**
1. Add `width` and `height` to all images
2. Reserve space for lazy-loaded content
3. Use `font-display: swap` for fonts
4. Avoid inserting content above existing content
5. Use CSS Grid/Flexbox for stable layouts

### Issue: Large Bundle Size

**Symptoms:** First Load JS > 150 kB

**Solutions:**
1. Analyze bundle: `ANALYZE=true npm run build`
2. Use dynamic imports for large components
3. Check for duplicate dependencies
4. Optimize package imports (tree-shaking)
5. Remove unused dependencies

### Issue: Slow Image Loading

**Symptoms:** Images load slowly or not at all

**Solutions:**
1. Remove `unoptimized` prop from `<Image>` components
2. Verify image formats are web-friendly (JPG, PNG, WebP)
3. Add `priority` for above-the-fold images
4. Check image sizes in DevTools Network tab
5. Optimize source images before uploading

---

## Performance Testing

### Local Testing

```bash
# Build for production
npm run build

# Start production server
npm run start

# Analyze bundle size
ANALYZE=true npm run build
```

### Lighthouse Testing

1. Open Chrome DevTools
2. Navigate to Lighthouse tab
3. Select:
   - Mode: Navigation
   - Device: Desktop & Mobile
   - Categories: All
4. Click "Analyze page load"

**Target scores:**
- Performance: ≥ 95
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Real User Monitoring (RUM)

Production metrics are automatically tracked:

1. **Vercel Analytics Dashboard**
   - View real user metrics
   - Track Core Web Vitals
   - Monitor performance over time

2. **Console Monitoring (Development)**
   ```
   📊 Web Vital: { name: 'LCP', value: 1234, rating: 'good' }
   ⏱️ Performance: data-fetch took 45ms
   ```

---

## Additional Resources

### Documentation
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)

### Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [WebPageTest](https://www.webpagetest.org/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

### Monitoring
- [Vercel Analytics](https://vercel.com/analytics)
- [Google Search Console (Core Web Vitals)](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| Oct 9, 2025 | 1.0 | Initial performance optimization implementation |

---

**Last Updated:** October 9, 2025
**Maintained By:** Dave Donnelly
**Status:** Active Development

This document should be updated whenever new performance optimizations are implemented or performance budgets are adjusted.
