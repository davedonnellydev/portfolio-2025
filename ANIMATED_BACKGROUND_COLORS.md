# Animated Background Color Reference

## Overview

The animated background features 2-3 colored "clouds" that float around a grid of dots. Each cloud influences nearby dots, creating a beautiful pin-hole effect where colored clouds appear to move behind the dot grid.

---

## Cloud Colors

### Light Mode (Default: 3 clouds)

| Cloud | Color Name | HSL Values | Hex Approximation | Description |
|-------|------------|------------|-------------------|-------------|
| Cloud 1 | Purple | `hsl(280, 75%, 65%)` | `#CF6FD6` | Vibrant purple |
| Cloud 2 | Cyan | `hsl(200, 70%, 60%)` | `#4DB8E8` | Bright cyan blue |
| Cloud 3 | Yellow/Gold | `hsl(50, 80%, 60%)` | `#E8C94D` | Warm golden yellow |

**Base Dots (outside clouds):**
- Color: `hsla(240, 20%, 65%, 0.25)` - Very subtle light blue-gray (barely visible)

**Opacity Range:**
- Cloud center: 0.7 (70%)
- Cloud edge: 0.3 (30%)
- Base dots: 0.25 (25%)

---

### Dark Mode (Default: 3 clouds)

| Cloud | Color Name | HSL Values | Hex Approximation | Description |
|-------|------------|------------|-------------------|-------------|
| Cloud 1 | Purple | `hsl(280, 70%, 60%)` | `#C252CC` | Rich purple |
| Cloud 2 | Cyan/Blue | `hsl(200, 70%, 55%)` | `#2EADDD` | Deep cyan |
| Cloud 3 | Magenta | `hsl(320, 65%, 60%)` | `#D65AB8` | Vibrant magenta |

**Base Dots (outside clouds):**
- Color: `hsla(240, 15%, 45%, 0.2)` - Very subtle gray-blue (barely visible)

**Opacity Range:**
- Cloud center: 0.7 (70%)
- Cloud edge: 0.4 (40%)
- Base dots: 0.2 (20%)

---

## Color Transition Details

### How Clouds Work

1. **Grid Structure**: Dots are positioned on a fixed grid (20-60px spacing, configurable)
2. **Cloud Influence**: Each cloud has a base radius of 150-250px
3. **Organic Shapes**:
   - Each cloud has a unique irregular shape (not a perfect circle)
   - Shape defined by 8 angular offset points (0°, 45°, 90°, etc.)
   - Smooth interpolation between points creates natural curves
   - 30-50% random variation in radius at different angles
4. **Distance-Based Coloring**:
   - Dots within a cloud's shape take on that cloud's color
   - Color intensity is strongest at the cloud's center
   - Fades smoothly to the edge using quadratic easing
5. **Multiple Clouds**: If multiple clouds overlap, the closest/strongest influence wins
6. **Movement**: Clouds float around, bouncing off screen edges (stay fully within viewport)
7. **Mouse Interaction** (optional):
   - Clouds can be attracted to mouse cursor position
   - Smooth acceleration toward cursor
   - Speed capped to prevent overly fast movement
   - Can be enabled via props

### Color Calculation Formula

```typescript
// Calculate distance from dot to cloud center
const dx = dot.x - cloud.x;
const dy = dot.y - cloud.y;
const distance = Math.sqrt(dx² + dy²);

// Calculate angle from cloud center to dot
const angle = Math.atan2(dy, dx);

// Get organic radius at this angle (varies based on cloud's shape)
const radiusAtAngle = getCloudRadiusAtAngle(cloud, angle);

// If within cloud's organic shape
if (distance < radiusAtAngle) {
  // Calculate influence (1 at center, 0 at edge)
  const influence = 1 - (distance / radiusAtAngle);

  // Apply easing for smoother falloff
  const smoothInfluence = influence²;

  // Calculate final opacity
  const opacity = baseOpacity + (smoothInfluence × opacityRange);

  // Apply color
  color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
}
```

**Shape Variation Details:**
```typescript
// Each cloud has 8 offset points (one for each 45° angle)
shapeOffsets = [-0.8, 0.3, -0.5, 0.7, 0.2, -0.4, 0.6, -0.1]

// Variation factor (30-50% of base radius)
shapeVariation = 0.3 to 0.5

// At a given angle, the radius is:
radiusAtAngle = baseRadius × (1 + offset × shapeVariation)

// Example: If baseRadius = 200px, offset = 0.5, variation = 0.4:
// radiusAtAngle = 200 × (1 + 0.5 × 0.4) = 200 × 1.2 = 240px

// Different angles have different offsets, creating organic shape
```

---

## Customizing Colors

To change cloud colors, modify the `initializeClouds()` function in `AnimatedBackground.tsx`:

```typescript
// Light mode colors
const cloudColors = [
  { h: 280, s: 75, l: 65 }, // Purple (change hue for different color)
  { h: 200, s: 70, l: 60 }, // Cyan
  { h: 50, s: 80, l: 60 },  // Yellow/Gold
];

// Dark mode colors
const cloudColors = [
  { h: 280, s: 70, l: 60 }, // Purple
  { h: 200, s: 70, l: 55 }, // Cyan/Blue
  { h: 320, s: 65, l: 60 }, // Magenta
];
```

### Color Palette Recommendations

**Warm Palette (Light Mode):**
- `{ h: 30, s: 80, l: 60 }`  - Orange
- `{ h: 340, s: 75, l: 60 }` - Red/Pink
- `{ h: 50, s: 85, l: 55 }`  - Gold

**Cool Palette (Light Mode):**
- `{ h: 200, s: 75, l: 60 }` - Cyan
- `{ h: 240, s: 70, l: 60 }` - Blue
- `{ h: 280, s: 70, l: 65 }` - Purple

**Vibrant Palette (Dark Mode):**
- `{ h: 330, s: 75, l: 60 }` - Hot Pink
- `{ h: 180, s: 70, l: 60 }` - Turquoise
- `{ h: 280, s: 75, l: 65 }` - Bright Purple

**Subtle Palette (Dark Mode):**
- `{ h: 210, s: 50, l: 55 }` - Muted Blue
- `{ h: 280, s: 50, l: 55 }` - Muted Purple
- `{ h: 160, s: 45, l: 55 }` - Muted Teal

---

## HSL Color Space Reference

- **Hue (h)**: 0-360° on color wheel
  - 0° = Red
  - 60° = Yellow
  - 120° = Green
  - 180° = Cyan
  - 240° = Blue
  - 300° = Magenta
  - 360° = Red (full circle)

- **Saturation (s)**: 0-100%
  - 0% = Grayscale
  - 50% = Moderate color
  - 100% = Full vibrant color

- **Lightness (l)**: 0-100%
  - 0% = Black
  - 50% = Pure color
  - 100% = White

---

## Accessibility Notes

The base dots are intentionally very subtle to ensure:
1. They don't interfere with reading text content
2. WCAG AAA contrast ratios are maintained for all text
3. The animation is noticeable but not distracting

Cloud colors have been chosen to:
- Complement the brand colors (indigo/purple theme)
- Provide visual interest without overwhelming
- Work harmoniously in both light and dark modes
- Maintain sufficient contrast for visibility

---

**Last Updated:** October 8, 2025
**Version:** 4.0 (Organic shapes with cloud-based animation)
