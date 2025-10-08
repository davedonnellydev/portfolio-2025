# Analytics Implementation

This document outlines the comprehensive analytics tracking system implemented across the portfolio website.

## ✅ Overview

The analytics system provides privacy-friendly tracking of key user interactions and page views to help understand how visitors engage with the portfolio.

### Features

- **Privacy-first**: Only tracks in production, console logging in development
- **Flexible providers**: Supports Vercel Analytics, Google Analytics 4, or custom endpoints
- **Type-safe**: Full TypeScript support with defined event types
- **Comprehensive tracking**: All key user interactions tracked with context
- **Easy to enable**: Simple setup with popular analytics providers

## 📊 Tracked Events

### 1. **CTA Interactions**

| Event | Location | Description |
|-------|----------|-------------|
| `email_click` | Footer | User clicks email link |
| `cv_download` | Hero, Footer | User downloads CV |

### 2. **Social Links**

| Event | Location | Description |
|-------|----------|-------------|
| `github_click` | Footer | User clicks GitHub profile link |
| `linkedin_click` | Footer | User clicks LinkedIn profile link |

### 3. **Project Interactions**

| Event | Location | Description | Properties |
|-------|----------|-------------|------------|
| `case_study_click` | Home, Projects list | User opens project case study | `project_slug`, `project_title`, `location` |
| `live_demo_click` | Project cards | User clicks live demo link | `project_slug`, `project_title` |
| `repo_click` | Project cards | User clicks repository link | `project_slug`, `project_title` |

### 4. **Project Discovery**

| Event | Location | Description | Properties |
|-------|----------|-------------|------------|
| `project_filter_used` | Projects page | User filters by tech stack | `filter_type`, `filter_value` |
| `project_search_used` | Projects page | User searches projects | `search_query`, `results_count` |

### 5. **Page Views**

| Event | Pages | Description |
|-------|-------|-------------|
| `page_view` | Project case studies | Tracks when user views a project page |

## 🏗️ Architecture

### Core Module: `lib/analytics.ts`

The analytics module provides:

1. **Event tracking function**: `trackEvent(event, properties)`
2. **Page view tracking**: `trackPageView(page, title)`
3. **Helper methods**: Convenient wrapper functions for all tracked events

```typescript
import { analytics } from '@/lib/analytics';

// Example: Track CV download from hero
analytics.trackCVDownload('hero');

// Example: Track project case study click
analytics.trackCaseStudyClick(slug, title, 'home');
```

### Integration Points

#### ✅ Hero Component (`components/home/Hero/Hero.tsx`)
- Tracks CV downloads
- Location: `hero`

#### ✅ Footer Component (`components/layout/Footer/Footer.tsx`)
- Tracks email clicks
- Tracks CV downloads
- Tracks GitHub profile clicks
- Tracks LinkedIn profile clicks
- Location: `footer`

#### ✅ ProjectCard Component (`components/projects/ProjectCard/ProjectCard.tsx`)
- Tracks case study views
- Tracks live demo clicks
- Tracks repository clicks
- Accepts `location` prop to differentiate home vs projects page

#### ✅ ProjectsPageClient (`app/projects/ProjectsPageClient.tsx`)
- Tracks search usage (with query and results count)
- Tracks filter usage (tech stack filters)

#### ✅ Project Pages (`app/projects/[slug]/page.tsx`)
- Tracks page views via `ProjectPageTracker` component
- Server component compatible (tracker is client component)

## 🚀 Setup Instructions

### Option 1: Vercel Analytics (Recommended for Vercel deployments)

1. **Install the package:**
   ```bash
   npm install @vercel/analytics
   ```

2. **Update `lib/analytics.ts`:**
   ```typescript
   // Uncomment these lines:
   import { track } from '@vercel/analytics';

   // In trackEvent function:
   track(event, properties);
   ```

3. **Add to root layout (`app/layout.tsx`):**
   ```typescript
   import { Analytics } from '@vercel/analytics/react';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### Option 2: Google Analytics 4

1. **Add Google Analytics script to `app/layout.tsx`:**
   ```typescript
   export default function RootLayout({ children }) {
     return (
       <html>
         <head>
           <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
           <script dangerouslySetInnerHTML={{
             __html: `
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
             `
           }} />
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

2. **Set environment variable:**
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

The analytics module already includes GA4 support - no code changes needed!

### Option 3: Custom Analytics Endpoint

Modify `lib/analytics.ts` to send events to your own API:

```typescript
export function trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
  if (!isAnalyticsEnabled()) return;

  // Send to your custom endpoint
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, properties, timestamp: new Date() }),
  });
}
```

## 📈 Event Properties Reference

### Standard Properties

All events include these standard properties (when applicable):

- **location**: Where the event occurred (`hero`, `footer`, `home`, `projects`)
- **project_slug**: Project identifier
- **project_title**: Human-readable project name
- **filter_type**: Type of filter used
- **filter_value**: Value of the filter
- **search_query**: User's search term
- **results_count**: Number of search results

## 🔍 Testing Analytics

### Development Mode

In development, all analytics events are logged to the console:

```
📊 Analytics Event: cv_download { location: 'hero' }
📊 Analytics Event: case_study_click { project_slug: 'learning-platform', project_title: 'Learning Platform', location: 'home' }
📄 Page View: /projects/learning-platform Learning Platform
```

### Production Verification

1. **Vercel Analytics**: Check the Analytics tab in your Vercel dashboard
2. **Google Analytics**: View Real-Time reports in GA4 dashboard
3. **Browser DevTools**: Monitor network requests for analytics calls

## 📊 Analytics Goals & Metrics

### Key Performance Indicators (KPIs)

#### Engagement Metrics
- **Email clicks**: Contact intent
- **CV downloads**: Job application intent
- **Project case study views**: Portfolio engagement (primary goal)

#### Discovery Metrics
- **Search usage**: How users find projects
- **Filter usage**: Tech stack interest
- **Live demo clicks**: Hands-on exploration
- **Repository clicks**: Code quality interest

#### Social Metrics
- **GitHub clicks**: Open source interest
- **LinkedIn clicks**: Professional networking

### Recommended Dashboard Widgets

1. **Conversion Funnel**
   - Page visits → Project views → Contact actions

2. **Project Engagement**
   - Top viewed projects
   - Case study vs live demo vs code views

3. **Discovery Patterns**
   - Most searched terms
   - Most filtered tech stacks

4. **Contact Intent**
   - Email clicks
   - CV downloads

## 🎯 Best Practices

### Do's ✅

- Track meaningful user actions
- Include context (location, project info)
- Test events in development mode
- Monitor analytics regularly
- Use insights to improve UX

### Don'ts ❌

- Don't track personal information
- Don't track every minor interaction
- Don't slow down the user experience
- Don't collect data you won't use
- Don't track without user consent (if legally required)

## 🔐 Privacy Considerations

### Current Implementation

- **No cookies**: Events are tracked server-side or via privacy-friendly SDKs
- **No PII**: No personally identifiable information collected
- **Development only**: Console logging only in dev mode
- **Minimal data**: Only essential interaction data tracked

### GDPR/Privacy Law Compliance

If required for your jurisdiction:

1. Add cookie consent banner
2. Only enable tracking after consent
3. Provide privacy policy
4. Allow users to opt-out
5. Provide data deletion on request

Example consent check:

```typescript
function isAnalyticsEnabled(): boolean {
  if (process.env.NODE_ENV !== 'production') return false;

  // Check for user consent (if required)
  if (typeof window !== 'undefined') {
    const consent = localStorage.getItem('analytics-consent');
    if (!consent) return false;
  }

  return true;
}
```

## 📝 Event Type Definitions

```typescript
export type AnalyticsEvent =
  | 'email_click'
  | 'cv_download'
  | 'github_click'
  | 'linkedin_click'
  | 'repo_click'
  | 'live_demo_click'
  | 'case_study_click'
  | 'project_filter_used'
  | 'project_search_used'
  | 'external_link_click';
```

## 📁 Files Modified/Created

### Created
- `components/projects/ProjectPageTracker.tsx` - Client component for project page view tracking
- `ANALYTICS_IMPLEMENTATION.md` - This documentation

### Modified
- `lib/analytics.ts` - Enhanced with comprehensive helper functions
- `components/home/Hero/Hero.tsx` - Added CTA tracking
- `components/layout/Footer/Footer.tsx` - Added link tracking
- `components/projects/ProjectCard/ProjectCard.tsx` - Added project interaction tracking
- `components/home/SignatureProjects/SignatureProjects.tsx` - Added location prop
- `app/projects/ProjectsPageClient.tsx` - Added search and filter tracking
- `app/projects/[slug]/page.tsx` - Added page view tracking

## 🚦 Next Steps

1. **Choose analytics provider** (Vercel Analytics or GA4)
2. **Install and configure** using setup instructions above
3. **Deploy to production** to start collecting data
4. **Monitor dashboard** regularly for insights
5. **Iterate on UX** based on user behavior patterns

---

**Last Updated:** October 8, 2025
**Status:** ✅ Complete - Ready for provider setup
