# Hero Component

The Hero section is the first thing visitors see on your portfolio homepage. It's designed to make a strong first impression with your value proposition, credibility points, and clear calls-to-action.

## Features

- **Responsive Layout**: Mobile-first design using CSS Grid (12-column system)
- **Fluid Typography**: Uses `clamp()` for responsive text sizing
- **Gradient Accents**: Subtle gradient effects on headline text and decorative elements
- **Three CTAs**: Primary (Book intro), Secondary (View projects), Tertiary (Download CV)
- **Professional Photo**: With gradient border and floating accent decoration
- **Accessibility**: WCAG AA compliant with proper focus states and touch targets
- **Performance**: Optimized images with Next.js Image component

## Customization Required

### 1. Replace Profile Photo

Replace the placeholder image with your professional photo:

1. Add your photo to `/public/images/profile-photo.jpg`
2. Update the image source in `Hero.tsx`:
   ```tsx
   src="/images/profile-photo.jpg"
   ```
3. Recommended specs:
   - Square aspect ratio (1:1)
   - Minimum 800x800px for high-DPI displays
   - Professional headshot or portrait
   - Good lighting and clear background

### 2. Update Headline and Subheadline

Edit the main value proposition in `Hero.tsx`:
- **Headline**: Your main 1-liner pitch
- **Subheadline**: Supporting text that expands on your expertise

### 3. Customize Credibility Points

Update the three bullet points to highlight your unique strengths:
- Keep them specific and quantifiable where possible
- Focus on outcomes and impact
- Use strong action words

### 4. Update CTA Links

Replace placeholder links with actual destinations:

- **Primary CTA** (`Book 15-min intro`):
  - Replace `href="#contact"` with your calendar booking link (e.g., Calendly)

- **Secondary CTA** (`View top projects`):
  - Currently scrolls to `#signature-projects` section
  - Update the ID if your projects section uses a different identifier

- **Tertiary CTA** (`Download CV`):
  - Add your CV PDF to `/public/cv.pdf`
  - Or update `href="/cv.pdf"` to point to your CV location

### 5. Update Alt Text

Change the image alt text to include your actual name:
```tsx
alt="Your Name - Full-stack Developer"
```

## Design System Compliance

This component follows the guidelines from `THEME.md`:

✅ Uses `clamp()` for responsive sizing
✅ Content-driven height (no fixed dimensions)
✅ Mobile-first approach
✅ Safe area insets for mobile devices
✅ Touch targets minimum 44×44px
✅ Relative units (rem, em, %)
✅ GPU-accelerated animations (transform/opacity)
✅ Respects `prefers-reduced-motion`
✅ WCAG AA color contrast
✅ Visible focus states for keyboard navigation

## Analytics Tracking

Consider adding analytics tracking to the CTA buttons to measure:
- Book intro clicks
- CV downloads
- Project scroll interactions

Example with Vercel Analytics:
```tsx
import { track } from '@vercel/analytics';

onClick={() => {
  track('hero_cta_book_intro');
  // ... existing onClick logic
}}
```

## Performance Notes

- Image uses `priority` prop for immediate loading (LCP optimization)
- Gradient animations respect reduced motion preferences
- No layout shift during load (aspect ratio preserved)
