# Performance Fixes - Lighthouse < 50 Issue

**Date:** October 9, 2025
**Issue:** Lighthouse performance scores < 50 on all pages
**Status:** 🔴 Critical - Requires immediate attention

---

## Executive Summary

Lighthouse testing revealed **critical performance issues** causing scores below 50:

### Critical Metrics (Mobile - Dev Mode)
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **LCP** (Largest Contentful Paint) | 33.6s | < 2.5s | 🔴 FAIL |
| **TTI** (Time to Interactive) | 34.4s | < 5.0s | 🔴 FAIL |
| **TBT** (Total Blocking Time) | 3,760ms | < 300ms | 🔴 FAIL |
| **FCP** (First Contentful Paint) | 2.5s | < 1.8s | ⚠️ POOR |
| **CLS** (Cumulative Layout Shift) | 0.003 | < 0.1 | ✅ GOOD |

### Root Causes Identified

1. **Testing in Development Mode** (accounts for ~50% of issues)
2. **AnimatedBackground Component** - 2,053ms JS execution
3. **External Satoshi Font** - Render-blocking from Fontshare CDN
4. **Render-Blocking Resources** - 1,740ms delay
5. **Unused JavaScript** - 194 KiB could be eliminated

---

## Part 1: Immediate Fixes (Critical - Do First)

### Fix 1: Test Production Build ⚡ HIGHEST PRIORITY

**Issue:** You're testing on `npm run dev` which includes:
- React development mode with extra checks
- Webpack hot module reloading
- No minification or tree-shaking
- Source maps
- Development-only error boundaries

**Solution:** Build and test production version

```bash
# Build production version
npm run build

# Start production server
npm run start

# Then run Lighthouse on http://localhost:3000
```

**Expected Improvement:** 40-60% better performance scores

---

### Fix 2: Optimize AnimatedBackground Component ⚡ CRITICAL

**Issue:** AnimatedBackground takes **2,053ms** of JavaScript execution time

**Current Implementation Issues:**
1. Renders every frame with `requestAnimationFrame`
2. Recalculates distance for every dot on every frame
3. No memoization or optimization
4. Runs even when user prefers reduced motion (though it checks)

**Solution A: Reduce Canvas Complexity** (Quick Fix - 30 minutes)

Update `components/shared/AnimatedBackground/AnimatedBackground.tsx`:

```tsx
// BEFORE (current - slow)
export function AnimatedBackground({
  dotSpacing = 10,  // Too many dots!
  dotRadius = 3,
  cloudSpeed = 5,
  cloudCount = 3,
  // ...
}) {
```

```tsx
// AFTER (optimized)
export function AnimatedBackground({
  dotSpacing = 30,  // Reduced from 10 → 30 (9x fewer dots!)
  dotRadius = 2,     // Reduced from 3 → 2 (smaller rendering)
  cloudSpeed = 3,    // Reduced from 5 → 3 (less calculation)
  cloudCount = 2,    // Reduced from 3 → 2 (fewer cloud calculations)
  // ...
}) {
```

**Expected Improvement:** 60-70% reduction in JS execution time

---

**Solution B: Lazy Load AnimatedBackground** (Better Fix - 45 minutes)

Only load on client-side and after page is interactive:

```tsx
// components/shared/AnimatedBackground/index.ts
export { AnimatedBackground } from './AnimatedBackground';

// NEW: Create lazy-loaded version
export { default as AnimatedBackgroundLazy } from './AnimatedBackgroundLazy';
```

```tsx
// components/shared/AnimatedBackground/AnimatedBackgroundLazy.tsx
'use client';

import dynamic from 'next/dynamic';

const AnimatedBackground = dynamic(
  () => import('./AnimatedBackground').then((mod) => ({ default: mod.AnimatedBackground })),
  {
    ssr: false, // Don't render on server
    loading: () => null, // No loading state needed
  }
);

export default AnimatedBackground;
```

Then update all pages:

```tsx
// BEFORE
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';

// AFTER
import AnimatedBackgroundLazy from '@/components/shared/AnimatedBackground/AnimatedBackgroundLazy';

// In JSX
<AnimatedBackgroundLazy dotSpacing={30} dotRadius={2} cloudCount={2} />
```

**Expected Improvement:** 80-90% reduction in initial JS execution

---

**Solution C: Use CSS Gradient Instead** (Best Fix - 2 hours)

Replace canvas animation with CSS gradient for better performance:

```tsx
// components/shared/StaticBackground/StaticBackground.module.css
.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;

  background:
    radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 90%, rgba(6, 182, 212, 0.10) 0%, transparent 40%);

  background-size: 100% 100%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%, 100% 100%, 40% 100%;
  }
  50% {
    background-position: 100% 50%, 0% 100%, 60% 100%;
  }
}

[data-mantine-color-scheme='dark'] .background {
  background:
    radial-gradient(circle at 20% 50%, rgba(139, 142, 243, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(216, 180, 254, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 40% 90%, rgba(103, 232, 249, 0.08) 0%, transparent 40%);
}

@media (prefers-reduced-motion: reduce) {
  .background {
    animation: none;
  }
}
```

```tsx
// components/shared/StaticBackground/StaticBackground.tsx
import classes from './StaticBackground.module.css';

export function StaticBackground() {
  return <div className={classes.background} aria-hidden="true" />;
}
```

**Expected Improvement:** 95%+ reduction in JS execution (pure CSS!)

---

### Fix 3: Self-Host Satoshi Font ⚡ HIGH PRIORITY

**Issue:** External font from Fontshare CDN is render-blocking

**Solution:** Download and self-host the font

**Step 1:** Download Satoshi font files
```bash
# Create fonts directory
mkdir -p public/fonts/satoshi

# Download from Fontshare and place in public/fonts/satoshi/
# You need: Satoshi-Medium.woff2, Satoshi-Bold.woff2
```

**Step 2:** Create font face declarations

```css
/* app/globals.css - Add at the top */

/* Satoshi Font - Self-hosted */
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/satoshi/Satoshi-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/satoshi/Satoshi-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/satoshi/Satoshi-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/satoshi/Satoshi-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
```

**Step 3:** Remove Fontshare link from layout

```tsx
// app/layout.tsx - REMOVE these lines:
<link rel="preconnect" href="https://api.fontshare.com" />
<link rel="dns-prefetch" href="https://api.fontshare.com" />
<link
  href="https://api.fontshare.com/v2/css?f[]=satoshi@500,600,700,900&display=swap"
  rel="stylesheet"
/>
```

**Expected Improvement:** Remove 300-500ms of render-blocking time

---

### Fix 4: Preload Critical Resources

**Solution:** Add preload hints for critical resources

```tsx
// app/layout.tsx - Add to <head>
<head>
  <ColorSchemeScript />
  <link rel="shortcut icon" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* Preload critical fonts */}
  <link
    rel="preload"
    href="/fonts/satoshi/Satoshi-Bold.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  <link
    rel="preload"
    href="/fonts/satoshi/Satoshi-Medium.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

**Expected Improvement:** 100-200ms faster font loading

---

## Part 2: Code Splitting & Lazy Loading

### Fix 5: Lazy Load Below-the-Fold Components

**Issue:** All components load immediately, even if not visible

**Solution:** Dynamically import components that aren't immediately visible

```tsx
// app/page.tsx
import dynamic from 'next/dynamic';
import { Hero } from '../components/home/Hero';
import AnimatedBackgroundLazy from '../components/shared/AnimatedBackground/AnimatedBackgroundLazy';

// Lazy load components below the fold
const FeaturedProjects = dynamic(() =>
  import('../components/home/FeaturedProjects').then((mod) => ({ default: mod.FeaturedProjects }))
);

const WhyHireMe = dynamic(() =>
  import('../components/home/WhyHireMe').then((mod) => ({ default: mod.WhyHireMe }))
);

const MicroBio = dynamic(() =>
  import('../components/home/MicroBio').then((mod) => ({ default: mod.MicroBio }))
);

export default function HomePage() {
  return (
    <>
      <AnimatedBackgroundLazy dotSpacing={30} dotRadius={2} cloudCount={2} />

      <main id="main-content">
        <Hero /> {/* Above fold - not lazy */}
        <FeaturedProjects projects={projects} />
        <WhyHireMe />
        <MicroBio {...microBioData} />
      </main>
    </>
  );
}
```

**Expected Improvement:** 30-40% reduction in initial JS bundle

---

### Fix 6: Reduce Mantine Imports

**Issue:** Importing all of Mantine components

**Solution:** Already configured in `next.config.mjs` but verify it's working:

```js
// next.config.mjs
experimental: {
  optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
},
```

This should already be helping. Keep it as-is.

---

## Part 3: CSS & Rendering Optimization

### Fix 7: Inline Critical CSS

**Solution:** Next.js handles this automatically in production. Verify it's working:

```tsx
// app/layout.tsx - Keep CSS imports at top (Next.js will optimize)
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
```

In production build, Next.js will:
- Extract critical CSS
- Inline it in `<head>`
- Defer non-critical CSS

**Action:** No changes needed - just ensure testing production build

---

### Fix 8: Reduce Global CSS Size

**Current Issue:** Large global CSS file

**Solution:** Move component-specific styles to CSS Modules

```css
/* app/globals.css - Keep only truly global styles */

/* Remove component-specific styles and move to CSS Modules */
/* Example: Move .frost-glass styles to a shared module */
```

```css
/* components/shared/GlassCard/GlassCard.module.css */
.glass {
  background: rgb(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  /* ... other glassmorphism styles ... */
}
```

**Priority:** Medium (do after critical fixes)

---

## Part 4: Image Optimization

### Fix 9: Optimize Project Screenshots

**Issue:** Project images may not be optimized

**Solution:** Ensure all images use Next.js Image component (already done ✅)

**Verify:**
```bash
# Check image sizes in public/images/projects/
ls -lh public/images/projects/

# They should be:
# - WebP or AVIF format (Next.js converts automatically)
# - Under 200KB each
# - Properly sized (not 4K images scaled down)
```

**If images are too large:**
```bash
# Install image optimization tool
npm install -g @squoosh/cli

# Optimize images
squoosh-cli --webp auto public/images/projects/*.{png,jpg}
```

**Status:** ✅ Already using next/image (good!)

---

## Part 5: Third-Party Scripts

### Fix 10: Defer Analytics Loading

**Issue:** Vercel Analytics loads synchronously

**Solution:** Ensure it's at the end of the body (already done ✅)

```tsx
// app/layout.tsx
<body>
  <SkipLink />
  <MantineProvider theme={theme}>
    {/* ... content ... */}
    <Analytics /> {/* ✅ Already at end */}
    <WebVitals />
  </MantineProvider>
</body>
```

**Status:** ✅ Optimally placed

---

## Implementation Priority

### 🔥 Do Immediately (Today)

1. **Test production build** (5 minutes)
   ```bash
   npm run build && npm run start
   # Then run Lighthouse
   ```

2. **Reduce AnimatedBackground complexity** (15 minutes)
   - Change `dotSpacing` from 10 → 30
   - Change `cloudCount` from 3 → 2
   - Change `dotRadius` from 3 → 2

3. **Self-host Satoshi font** (30 minutes)
   - Download font files
   - Add @font-face declarations
   - Remove Fontshare link

**Expected Result:** Performance score 60-75

---

### ⚡ Do This Week (High Priority)

4. **Lazy load AnimatedBackground** (45 minutes)
   - Create dynamic import version
   - Update all pages to use lazy version

5. **Lazy load below-fold components** (1 hour)
   - FeaturedProjects, WhyHireMe, MicroBio
   - Update app/page.tsx with dynamic imports

6. **Add preload hints** (15 minutes)
   - Preload critical fonts
   - Add to layout.tsx

**Expected Result:** Performance score 75-85

---

### 💡 Do Next Week (Nice to Have)

7. **Replace canvas with CSS gradients** (2 hours)
   - Create StaticBackground component
   - Test visual appearance
   - Replace AnimatedBackground

8. **Optimize global CSS** (2 hours)
   - Move styles to CSS Modules
   - Reduce globals.css size

9. **Add resource hints** (30 minutes)
   - dns-prefetch for external resources
   - preconnect for critical origins

**Expected Result:** Performance score 85-95

---

## Testing Checklist

After each fix, test with:

```bash
# 1. Build production
npm run build

# 2. Start production server
npm run start

# 3. Open Chrome Incognito
# Navigate to http://localhost:3000

# 4. Run Lighthouse (DevTools > Lighthouse)
# - Device: Mobile
# - Categories: Performance only (faster testing)
# - Mode: Navigation

# 5. Record scores
```

### Target Scores (Mobile)

| Phase | Performance | Expected Improvements |
|-------|-------------|---------------------|
| **Current (Dev)** | < 50 | Baseline |
| **After Fix 1-3** | 60-75 | Production build + AnimatedBackground + Fonts |
| **After Fix 4-6** | 75-85 | Lazy loading + Preloading |
| **After Fix 7-9** | 85-95 | CSS optimization + Images |

### Target Scores (Desktop)

Desktop should score 10-15 points higher than mobile:

| Phase | Performance |
|-------|-------------|
| **Current (Dev)** | < 50 |
| **After Fixes** | 85-95 |

---

## Monitoring Setup

### Add Performance Monitoring Script

```json
// package.json - Add script
{
  "scripts": {
    "perf:test": "npm run build && npm run start & npx wait-on http://localhost:3000 && lighthouse http://localhost:3000 --only-categories=performance --view"
  }
}
```

```bash
# Install wait-on
npm install --save-dev wait-on lighthouse
```

Then run:
```bash
npm run perf:test
```

---

## Common Pitfalls

### ❌ Don't Do This

1. **Testing in dev mode** - Always test production builds
2. **Optimizing before measuring** - Test first, then optimize
3. **Ignoring Core Web Vitals** - Focus on LCP, TBT, CLS
4. **Premature optimization** - Fix the biggest issues first

### ✅ Do This

1. **Measure first** - Run Lighthouse before and after
2. **One fix at a time** - Test impact of each change
3. **Test on real devices** - Chrome DevTools throttling isn't enough
4. **Monitor in production** - Set up Real User Monitoring (RUM)

---

## Expected Results

### Before (Current - Dev Mode)

- Performance: **< 50**
- LCP: 33.6s
- TTI: 34.4s
- TBT: 3,760ms

### After Quick Fixes (1-3)

- Performance: **60-75**
- LCP: 3-4s
- TTI: 5-7s
- TBT: 600-900ms

### After All Fixes (1-9)

- Performance: **85-95**
- LCP: < 2.5s
- TTI: < 5s
- TBT: < 300ms

---

## Next Steps

1. ✅ **Read this document**
2. ⚡ **Test production build** (npm run build && npm run start)
3. 🔥 **Apply Fix 1-3** (today - 1 hour total)
4. 📊 **Re-run Lighthouse** and report results
5. ⚡ **Apply Fix 4-6** (this week - 2 hours)
6. 💡 **Consider Fix 7-9** (next week - optional)

---

## Questions & Answers

### Q: Why is dev mode so slow?

**A:** Development mode includes:
- React DevTools
- Hot Module Reloading (HMR)
- Source maps
- Unminified JavaScript
- Extra error checking
- Webpack overhead

This can be 10-20x slower than production!

### Q: Should I remove AnimatedBackground entirely?

**A:** Not necessarily. Options:
1. Optimize it (Fix 2A) - Quick and keeps animation
2. Lazy load it (Fix 2B) - Better performance, keeps animation
3. Replace with CSS (Fix 2C) - Best performance, different visual

Try in that order.

### Q: How do I know if optimizations are working?

**A:** Compare Lighthouse scores:
- Before: < 50
- Target: > 85

Also check:
- LCP: Should be < 2.5s
- TBT: Should be < 300ms
- Bundle size: Should be < 150KB

### Q: What's the minimum acceptable score?

**A:** For production:
- **Performance: ≥ 85** (acceptable)
- **Performance: ≥ 95** (excellent)
- **All other metrics: 95+**

---

**Last Updated:** October 9, 2025
**Status:** Ready for implementation
**Priority:** 🔥 Critical - Start today
**Estimated Time:** 4-6 hours total
