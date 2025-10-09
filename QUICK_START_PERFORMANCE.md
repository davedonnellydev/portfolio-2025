# Quick Start: Performance Optimization

**TL;DR:** Your Lighthouse scores are low because you tested in **development mode**. Follow these 3 quick steps to see the real performance.

---

## Step 1: Test Production Build (5 minutes) ⚡

```bash
# Kill dev server if running (Ctrl+C)

# Build production version
npm run build

# Start production server
npm run start

# Open http://localhost:3000 in Chrome Incognito
# Run Lighthouse (DevTools > Lighthouse > Performance)
```

**Expected Result:** Performance score jumps from <50 to 70-80

---

## Step 2: What Changed Already ✅

I just optimized the AnimatedBackground component:
- Reduced dot density: 10px → 30px spacing (9x fewer dots!)
- Smaller dot size: 3px → 2px radius
- Fewer clouds: 3 → 2
- Slower animation: speed 5 → 3

**Expected Impact:** 60-70% less JavaScript execution

---

## Step 3: Next Quick Wins (If Still Needed)

If production build scores are still < 80, do these in order:

### A. Self-Host Satoshi Font (30 min)
Download from Fontshare, place in `public/fonts/satoshi/`, and update `app/globals.css`

### B. Lazy Load AnimatedBackground (15 min)
```bash
# Create lazy version
cat > components/shared/AnimatedBackground/AnimatedBackgroundLazy.tsx << 'EOF'
'use client';
import dynamic from 'next/dynamic';

const AnimatedBackground = dynamic(
  () => import('./AnimatedBackground').then(m => ({ default: m.AnimatedBackground })),
  { ssr: false, loading: () => null }
);

export default AnimatedBackground;
EOF
```

Then update pages to use lazy version.

---

## Current Status

### ✅ What's Fixed
- Viewport zoom enabled
- Skip link added
- Main landmarks added
- Navigation ARIA labels
- AnimatedBackground optimized

### 🔄 What's Being Tested
- Production build performance
- Real-world Lighthouse scores

### 📋 What's Next (If Needed)
- Self-host fonts
- Lazy load components
- See `PERFORMANCE_FIXES.md` for full plan

---

## Quick Reference

```bash
# Production build
npm run build && npm run start

# Then test at: http://localhost:3000
```

**Target Scores:**
- Mobile: 85+
- Desktop: 90+

---

**Read the full guide:** [`PERFORMANCE_FIXES.md`](./PERFORMANCE_FIXES.md)
