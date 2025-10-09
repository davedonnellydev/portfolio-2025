# Footer Component

## Overview

The `Footer` component provides a sticky footer with contact information and social links. It features auto-hide/show behavior based on mouse position, tracking analytics for all interactions.

## Features

- **Auto-Hide Behavior**: Appears when mouse approaches bottom of viewport
- **Contact CTAs**: Email, CV download, GitHub, and LinkedIn links
- **Location Info**: Sydney, Australia with tooltip
- **Responsive Design**: Different layouts for mobile and desktop
- **Analytics Tracking**: Tracks all user interactions
- **Accessibility**: Full ARIA support and keyboard navigation
- **Tooltips**: Helpful tooltips on all action buttons
- **Smooth Animations**: CSS transitions for show/hide states

## Usage

```tsx
import { Footer } from '@/components/layout/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

## Features Breakdown

### Auto-Show/Hide Behavior

Uses the `useFooterVisibility` hook to:
1. Show when mouse enters bottom 100px of viewport
2. Hide after 3 seconds of no mouse movement
3. Stay visible when mouse is over footer
4. Smooth CSS transitions

### Contact Actions

1. **Email Button (Primary CTA)**
   - Desktop: Full "Get in Touch" button with icon
   - Mobile: Icon-only button
   - Opens default email client
   - Tracks `email_click` event

2. **CV Download**
   - Downloads CV PDF file
   - Tracks `cv_download` event
   - Tooltip: "Download my CV"

3. **GitHub Link**
   - Opens GitHub profile in new tab
   - Tracks `github_click` event
   - Tooltip: "View my GitHub"

4. **LinkedIn Link**
   - Opens LinkedIn profile in new tab
   - Tracks `linkedin_click` event
   - Tooltip: "Connect on LinkedIn"

### Location Badge

- Shows "Sydney, Australia" with location icon
- Tooltip: "Live in Redfern, open to remote working"
- Visual indicator of availability

## Constants

```typescript
const CONTACT_EMAIL = 'davepauldonnelly@gmail.com';
const GITHUB_URL = 'https://github.com/davedonnellydev';
const LINKEDIN_URL = 'https://www.linkedin.com/in/dave-donnelly-dev/';
const CV_PATH = '/CV - D_DONNELLY.pdf';
```

## Styling

Component uses CSS Modules (`Footer.module.css`) with classes:

- `.footer` - Main footer container (fixed positioning)
- `.visible` - Visible state (translateY(0))
- `.hidden` - Hidden state (translateY(100%))
- `.actionsSet` - Button group container
- `.locationWrapper` - Location badge container
- `.locationInfo` - Location text and icon group
- `.primaryCtaDesktopWrapper` - Desktop email button wrapper
- `.primaryCta` - Desktop email button
- `.primaryCtaMobileWrapper` - Mobile email button wrapper (< 768px)
- `.primaryCtaMobile` - Mobile icon-only button
- `.actionButton` - Action icon buttons (CV, GitHub, LinkedIn)

### Visibility States

```css
.hidden {
  transform: translateY(100%);
  opacity: 0;
}

.visible {
  transform: translateY(0);
  opacity: 1;
}
```

Transition: `all 0.3s ease`

## Accessibility

### ARIA Attributes

- `role="contentinfo"` - Identifies footer landmark
- `aria-label="Contact information and social links"` - Describes footer purpose
- `aria-label` on all buttons - Descriptive labels for screen readers

### Keyboard Support

- All buttons focusable via Tab key
- Visual focus states on all interactive elements
- External links open in new tab with `rel="noopener noreferrer"`

### Screen Reader Support

- Semantic HTML structure
- Descriptive ARIA labels
- Icon-only buttons have text labels
- External link indication (implied by new tab behavior)

## Analytics Events

All events tracked via `analytics` utility:

| Event | Trigger | Data |
|-------|---------|------|
| `email_click` | Email button clicked | `location: 'footer'` |
| `cv_download` | CV download button clicked | `location: 'footer'` |
| `github_click` | GitHub link clicked | `location: 'footer'` |
| `linkedin_click` | LinkedIn link clicked | `location: 'footer'` |

## Icons

Uses FontAwesome Pro icons:

**From `classic/light`:**
- `faEnvelope` - Email button
- `faFileArrowDown` - CV download
- `faLocationDot` - Location badge

**From `classic/brands`:**
- `faGithub` - GitHub link
- `faLinkedin` - LinkedIn link

## Responsive Behavior

### Desktop (≥ 768px)

- Full "Get in Touch" button with text and icon
- All buttons visible in horizontal row
- Larger spacing between elements

### Mobile (< 768px)

- Icon-only email button (saves space)
- Buttons wrap to multiple rows if needed
- Smaller spacing, optimized for touch

## Hook: useFooterVisibility

The component uses a custom hook for auto-show/hide behavior:

```typescript
const { isVisible, handleMouseEnter, handleMouseLeave } = useFooterVisibility();
```

### Hook Behavior

- Monitors mouse Y position via `mousemove` event
- Shows when `mouseY > window.innerHeight - 100`
- Auto-hides after 3 seconds of no activity
- Stays visible when mouse is over footer
- Cleans up event listeners on unmount

See `lib/hooks/useFooterVisibility.ts` for implementation.

## Examples

### Basic Usage (Already in Layout)

```tsx
<Footer />
```

### Testing Footer Visibility

```tsx
// Footer appears when mouse moves to bottom
// Test by moving mouse to bottom 100px of screen
// Footer persists while hovering over it
// Footer hides after 3 seconds when mouse leaves
```

## Performance

- **Lightweight**: Minimal JavaScript, CSS-based animations
- **Event Throttling**: Mouse move events handled efficiently
- **No Re-renders**: Visibility controlled by CSS classes, not React state
- **GPU Acceleration**: Transform animations use GPU

## Common Issues & Solutions

### Issue: Footer not appearing

**Solutions:**
1. Check z-index conflicts with other fixed elements
2. Ensure footer is at root level, not inside overflow:hidden container
3. Verify mouse events are firing (check useFooterVisibility hook)

### Issue: Footer blocking content

**Solution:** Ensure content has proper padding-bottom to account for footer:
```css
main {
  padding-bottom: 100px; /* Space for footer */
}
```

### Issue: Email link not working

**Solutions:**
1. Check CONTACT_EMAIL constant is correct
2. Verify user has email client configured
3. Test with `mailto:` protocol support in browser

### Issue: CV download not working

**Solutions:**
1. Verify CV file exists at `/public/CV - D_DONNELLY.pdf`
2. Check file path matches CV_PATH constant
3. Ensure file is accessible (no 404 error)

## Testing

See `Footer.test.tsx` for component tests including:
- Rendering all buttons and links
- Analytics tracking on clicks
- Visibility behavior
- Accessibility attributes
- Responsive layout

## Dependencies

- `@fortawesome/react-fontawesome` - Icon components
- `@awesome.me/kit-*` - FontAwesome Pro icons
- `@mantine/core` - UI components (ActionIcon, Button, Container, Group, Text, Tooltip)
- `@/lib/analytics` - Analytics tracking
- `@/lib/hooks` - useFooterVisibility hook

## Related Components

- `Header` - Complementary top navigation with similar auto-hide behavior
- `useFooterVisibility` - Custom hook for visibility logic
- `useHeaderVisibility` - Similar hook for header

## Best Practices

1. **Keep CV Updated**: Regularly update `/public/CV - D_DONNELLY.pdf`
2. **Test Links**: Verify all external links work before deployment
3. **Monitor Analytics**: Track which CTAs get the most clicks
4. **Mobile Testing**: Test footer on various mobile devices
5. **Accessibility Testing**: Test with keyboard and screen reader

## Customization

### Change Email

Update the constant:
```typescript
const CONTACT_EMAIL = 'your-email@example.com';
```

### Change Social Links

Update the constants:
```typescript
const GITHUB_URL = 'https://github.com/yourusername';
const LINKEDIN_URL = 'https://www.linkedin.com/in/yourprofile/';
```

### Change CV Path

1. Add CV to `/public/` directory
2. Update constant:
```typescript
const CV_PATH = '/your-cv-name.pdf';
```

### Change Location

Update the location text in JSX:
```tsx
<Text size="sm" fw={500}>
  Your City, Your Country
</Text>
```

And tooltip:
```tsx
<Tooltip label="Your location details" zIndex={1001}>
```

## Future Enhancements

Potential improvements:
- [ ] Add response time indicator (e.g., "Usually replies within 24h")
- [ ] Add more social links (Twitter, YouTube, etc.)
- [ ] Add quick contact form modal
- [ ] Add availability status (Available, Busy, etc.)
- [ ] Add RSS feed link
- [ ] Add language selector
- [ ] Add "Back to top" button
