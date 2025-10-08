# Analytics Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Option 1: Vercel Analytics (Easiest for Vercel deployments)

```bash
# 1. Install
npm install @vercel/analytics

# 2. Uncomment in lib/analytics.ts (lines 54-56)
import { track } from '@vercel/analytics';
track(event, properties);

# 3. Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
// Add <Analytics /> before closing </body>

# 4. Deploy - Done! ✅
```

### Option 2: Google Analytics 4

```bash
# 1. Get your GA4 Measurement ID (G-XXXXXXXXXX)

# 2. Add to .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 3. Add script to app/layout.tsx <head>
<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
<script dangerouslySetInnerHTML={{ __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
`}} />

# 4. Deploy - Done! ✅
```

## 📊 What's Being Tracked

### User Actions Tracked Automatically

✅ **Contact CTAs**
- "Book 15-min intro" clicks
- Email link clicks
- CV downloads

✅ **Social Links**
- GitHub profile clicks
- LinkedIn profile clicks

✅ **Project Engagement**
- Case study views
- Live demo clicks
- Repository clicks
- Project page views

✅ **Discovery**
- Search queries
- Tech stack filters

## 🧪 Testing

### In Development
Check your browser console - you'll see:
```
📊 Analytics Event: cv_download { location: 'hero' }
📄 Page View: /projects/learning-platform Learning Platform
```

### In Production
- **Vercel**: Check Analytics tab in dashboard
- **GA4**: View Real-Time reports

## 📈 Key Metrics to Monitor

1. **"Book intro" clicks** - Primary conversion goal
2. **Project case study views** - Portfolio engagement
3. **CV downloads** - Job application intent
4. **Tech stack filter usage** - Skills interest

## 🔧 No Setup Required

Analytics tracking is **already implemented** throughout the site. You just need to:
1. Choose a provider (Vercel or GA4)
2. Follow the setup steps above
3. Deploy

That's it! Data will start flowing automatically.

## 📚 Full Documentation

See [ANALYTICS_IMPLEMENTATION.md](./ANALYTICS_IMPLEMENTATION.md) for complete details on:
- All tracked events
- Privacy considerations
- Custom implementation options
- Advanced configuration
