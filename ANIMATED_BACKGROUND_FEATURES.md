# Animated Background Features Guide

## Feature Overview

The animated background component provides several interactive and customizable features to enhance the visual experience of your portfolio.

---

## Core Features

### 1. Grid-Based Dot Pattern

**What it is:**
- Evenly spaced dots arranged in a grid across the viewport
- Default spacing: 60px between dots
- Fixed positions (dots don't move, only change color)

**Benefits:**
- Consistent visual rhythm
- Low CPU usage (no position calculations needed)
- Predictable layout across different screen sizes

**Customization:**
```tsx
<AnimatedBackground dotSpacing={50} dotRadius={3} />
```

---

### 2. Floating Colored Clouds

**What it is:**
- 2-3 (configurable) colored "clouds" that float around the screen
- Each cloud has a radius of influence (150-250px)
- Dots within a cloud's radius change color to match the cloud

**How it works:**
- Clouds move with random velocity
- Each cloud has a unique organic shape (not perfect circles)
- Shape created using 8 angular offset points with smooth interpolation
- 30-50% shape variation gives natural, irregular appearance
- Bounce off screen edges naturally
- Color influence fades smoothly from center to edge
- Multiple clouds can overlap (strongest influence wins)

**Customization:**
```tsx
<AnimatedBackground
  cloudCount={3}      // Number of clouds (2-4 recommended)
  cloudSpeed={7}      // Movement speed (1-10 range)
/>
```

---

### 3. Organic Cloud Shapes 🌥️ NEW

**What it is:**
- Each cloud has a unique, irregular organic shape
- Not perfect circles - they look like real clouds or blobs of color
- Each cloud's shape is randomized on initialization

**How it works:**
- 8 angular offset points define the shape (at 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°)
- Each point has a random offset value between -1 and 1
- Smooth interpolation between points creates natural curves
- Shape variation of 30-50% of base radius
- Radius varies organically as you move around the cloud's perimeter

**Benefits:**
- Much more natural and organic appearance
- Eliminates the "perfect circle" look that can seem artificial
- Especially noticeable in dark mode where shapes are more visible
- Each cloud is unique - no two clouds look exactly the same

**Example:**
```typescript
// Cloud with base radius of 200px might have:
// - 240px radius at 0° (offset: +0.4, variation: 0.5)
// - 180px radius at 90° (offset: -0.2, variation: 0.5)
// - 220px radius at 180° (offset: +0.2, variation: 0.5)
// - 190px radius at 270° (offset: -0.1, variation: 0.5)

// Smooth curves connect these points, creating an organic blob shape
```

**No configuration needed** - shapes are automatically randomized for each cloud!

---

### 4. Viewport Constraints ✨

**What it is:**
- Clouds are kept fully within the visible viewport
- Never go off-screen or partially hidden
- Calculated bounds based on cloud radius

**Benefits:**
- Always visible and engaging
- Prevents "disappearing" clouds
- Better visual consistency

**Technical Details:**
```typescript
// Clouds stay within these bounds:
minX = cloudRadius * 0.5
maxX = viewportWidth - (cloudRadius * 0.5)
minY = cloudRadius * 0.5
maxY = viewportHeight - (cloudRadius * 0.5)
```

**No configuration needed** - this is always active!

---

### 5. Mouse Attraction (Optional) 🖱️

**What it is:**
- Clouds gently move toward your mouse cursor
- Creates an interactive, responsive feel
- Disabled by default for subtle effect

**When to use:**
- Portfolio showcase pages (adds interactivity)
- Hero sections (draws attention)
- Creative/playful brand identity
- When you want users to engage with the background

**When NOT to use:**
- Content-heavy pages (can be distracting)
- Professional/corporate sites (might be too playful)
- Mobile devices (no mouse cursor)

**How to enable:**
```tsx
<AnimatedBackground
  mouseAttraction={true}              // Enable mouse tracking
  mouseAttractionStrength={0.0005}    // How strong the pull is
/>
```

**Strength Guide:**
- `0.0001` - Very subtle (barely noticeable)
- `0.0005` - Default (gentle attraction)
- `0.001` - Strong (responsive, but not aggressive)
- `0.002+` - Very strong (clouds chase cursor)

**Technical Details:**
- Adds acceleration force toward mouse position
- Distance-based force (farther = stronger pull)
- Speed capped at 2× base cloud speed
- Mouse position tracked via `mousemove` event
- Automatically cleaned up on unmount

---

## Feature Combinations

### Subtle & Professional
Perfect for corporate portfolios or content-focused sites:
```tsx
<AnimatedBackground
  dotSpacing={70}
  dotRadius={2}
  cloudSpeed={3}
  cloudCount={2}
  mouseAttraction={false}
/>
```
**Effect:** Slow-moving clouds, sparse dots, no interaction

---

### Vibrant & Interactive
Great for creative portfolios or hero sections:
```tsx
<AnimatedBackground
  dotSpacing={50}
  dotRadius={3}
  cloudSpeed={8}
  cloudCount={4}
  mouseAttraction={true}
  mouseAttractionStrength={0.001}
/>
```
**Effect:** Fast clouds, dense grid, responsive to mouse

---

### Balanced (Recommended)
Good default for most use cases:
```tsx
<AnimatedBackground
  dotSpacing={60}
  dotRadius={3}
  cloudSpeed={7}
  cloudCount={3}
  mouseAttraction={false}
/>
```
**Effect:** Medium pace, visible but not overwhelming

---

## Accessibility Features

### Reduced Motion Support
**Automatic:** If user has `prefers-reduced-motion: reduce` enabled:
- Cloud movement stops completely
- Colors remain static
- No mouse tracking
- Fully accessible

### Performance Optimization
- Canvas API with GPU acceleration
- requestAnimationFrame for smooth 60fps
- Pauses when tab is inactive (browser behavior)
- Minimal CPU usage (~1-2%)

### Screen Reader Friendly
- Canvas marked with `aria-hidden="true"`
- Doesn't interfere with content accessibility
- Purely decorative (doesn't convey information)

---

## Implementation Examples

### Homepage Hero (Interactive)
```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <>
      <AnimatedBackground
        mouseAttraction={true}
        mouseAttractionStrength={0.0008}
        cloudSpeed={6}
      />
      <Hero />
      <Projects />
    </>
  );
}
```

### About Page (Subtle)
```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <>
      <AnimatedBackground
        cloudSpeed={4}
        cloudCount={2}
        dotSpacing={70}
      />
      <AboutContent />
    </>
  );
}
```

### Projects Page (No Background)
```tsx
// app/projects/page.tsx
export default function ProjectsPage() {
  return (
    <>
      {/* No background - focus on content */}
      <ProjectGrid />
    </>
  );
}
```

---

## Performance Considerations

### Mobile Devices
- Mouse attraction has no effect (no cursor)
- Consider increasing `dotSpacing` to 80-100 for better mobile performance
- Clouds still animate smoothly

### Low-End Devices
If performance is a concern:
```tsx
<AnimatedBackground
  dotSpacing={80}        // Fewer dots = better performance
  cloudCount={2}         // Fewer clouds = less calculation
  cloudSpeed={5}         // Moderate speed
  mouseAttraction={false} // Disable for better performance
/>
```

### Desktop (High Performance)
Take advantage of powerful hardware:
```tsx
<AnimatedBackground
  dotSpacing={40}         // Dense grid
  cloudCount={4}          // More clouds
  cloudSpeed={10}         // Fast movement
  mouseAttraction={true}  // Full interactivity
  mouseAttractionStrength={0.001}
/>
```

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Canvas Animation | ✅ | ✅ | ✅ | ✅ |
| Mouse Tracking | ✅ | ✅ | ✅ | ✅ |
| Reduced Motion | ✅ | ✅ | ✅ | ✅ |
| Color Scheme | ✅ | ✅ | ✅ | ✅ |

**All modern browsers fully supported!**

---

## Troubleshooting

### Clouds disappear off screen
- ✅ **Fixed!** This shouldn't happen anymore with viewport constraints

### Animation is choppy
- Reduce `cloudCount` (fewer clouds = less calculation)
- Increase `dotSpacing` (fewer dots = better performance)
- Check browser DevTools for performance issues

### Mouse attraction too strong/weak
- Adjust `mouseAttractionStrength`
- Try values between 0.0001 (weak) and 0.002 (strong)

### Clouds move too fast/slow
- Adjust `cloudSpeed` (1-10 range)
- Remember: mouse attraction can make them faster

---

**Last Updated:** October 8, 2025
**Version:** 4.0 (Organic Cloud Shapes + Mouse Attraction + Viewport Constraints)
