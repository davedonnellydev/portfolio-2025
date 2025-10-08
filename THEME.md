# Portfolio Theme Guide (2025 Refresh)

This guide consolidates the visual design system and its Mantine mapping so the look & feel is consistent across the app. It documents the current implementation including the glassmorphism effects, animated background, and all established design patterns.

## Design Principles

1. **Clean first, fun second** — Professional clarity with personality touches
2. **Performance-focused** — Smooth, GPU-accelerated animations; minimal layout thrash
3. **Accessible** — WCAG AAA contrast (7:1 for normal text, 4.5:1 for large text), visible focus, reduced-motion support
4. **Responsive** — Mobile-first with fluid typography using `clamp()`
5. **Glassmorphism** — Frosted glass effects for content readability over animated backgrounds
6. **Organic animations** — Subtle animated backgrounds with floating colored clouds

---

## Color System

### Brand and Accents

Use indigo as the primary brand color, supported by accent hues for highlights and semantic states.

```css
/* CSS tokens (can be referenced in styles and inline CSS vars) */
--brand-primary-400: #818CF8;
--brand-primary-500: #6366F1; /* Indigo - main brand */
--brand-primary-600: #4F46E5;

--accent-cyan: #06B6D4;    /* CTAs, highlights */
--accent-purple: #A855F7;  /* Creative elements */
--accent-emerald: #10B981; /* Success */
--accent-amber: #F59E0B;   /* Warnings/attention */
--accent-pink: #EC4899;    /* Accent highlights */
```

### Dark Mode Colors (WCAG AAA Compliant)

```css
/* Dark mode backgrounds */
--background-dark: #0A0A0B;      /* Near-black primary */
--surface-dark: #18181B;         /* Neutral-900 */
--surface-dark-2: #27272A;       /* Neutral-800 */

/* Dark mode text - WCAG AAA (7:1+ contrast) */
--text-primary-dark: #FAFAFA;    /* Body text - 8.8:1 contrast */
--text-secondary-dark: #D4D4D8;  /* Secondary text */
--text-muted-dark: #A1A1AA;      /* Muted text */

/* Dark mode borders */
--border-dark: #3F3F46;          /* Neutral-700 */
--border-subtle-dark: #27272A;   /* Subtle borders */

/* Dark mode accents - adjusted for contrast */
--brand-primary-dark: #A3A5F3;
--brand-primary-hover-dark: #C5C7F7;
--accent-cyan-dark: #67E8F9;
--accent-purple-dark: #D8B4FE;
--accent-emerald-dark: #5EEAD4;
--accent-amber-dark: #FDE047;
--accent-pink-dark: #F9A8D4;
```

### Neutrals

```css
--neutral-50:  #FAFAFA;
--neutral-100: #F4F4F5;
--neutral-200: #E4E4E7; /* borders */
--neutral-300: #D4D4D8; /* disabled */
--neutral-400: #A1A1AA; /* placeholder */
--neutral-500: #71717A; /* secondary text */
--neutral-600: #52525B; /* body text */
--neutral-700: #3F3F46; /* headings */
--neutral-800: #27272A; /* dark surfaces */
--neutral-900: #18181B; /* darkest */
```

### Gradients

```css
--gradient-primary: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
--gradient-accent:  linear-gradient(135deg, #06B6D4 0%, #10B981 100%);
--gradient-glow:    linear-gradient(135deg, #F59E0B 0%, #EC4899 100%);
--gradient-dark:    linear-gradient(135deg, #27272A 0%, #18181B 100%);

/* Dark mode gradients */
--gradient-primary-dark: linear-gradient(135deg, #A3A5F3 0%, #D8B4FE 100%);
--gradient-accent-dark:  linear-gradient(135deg, #67E8F9 0%, #5EEAD4 100%);
--gradient-glow-dark:    linear-gradient(135deg, #FDE047 0%, #F9A8D4 100%);
```

### Mantine Mapping

- **primaryColor**: `primary` (custom indigo scale around `#6366F1`)
- Use `accent-cyan`, `accent-purple`, `accent-emerald`, `accent-amber`, `accent-pink` as semantic choices for `color` on `Badge`, `Button`, `Progress`, etc.
- Prefer `withBorder` + neutral tokens for cards and surfaces.

Usage examples:

```tsx
// CTAs
<Button color="primary">View projects</Button>
<Button variant="gradient" gradient={{ from: 'indigo', to: 'grape' }}>Hire me</Button>

// Semantic accents
<Badge color="cyan">Next.js</Badge>
<Badge color="grape">Design Systems</Badge>
<Badge color="teal">CI/CD</Badge>
<Badge color="yellow">New</Badge>
```

---

## Glassmorphism System

### Core Glassmorphism Classes

All content containers use frosted glass effects for readability over the animated background:

```css
/* Standard frosted glass */
.frost-glass {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: clamp(0.75rem, 2vw, 1rem);
  border: 1px solid rgba(228, 228, 231, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  isolation: isolate;
}

/* Stronger effect for critical content */
.frost-glass-strong {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px) saturate(180%);
  border-radius: clamp(0.75rem, 2vw, 1rem);
  border: 1px solid rgba(228, 228, 231, 0.4);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.1);
}

/* Lighter effect for subtle separation */
.frost-glass-light {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: clamp(0.75rem, 2vw, 1rem);
  border: 1px solid rgba(228, 228, 231, 0.2);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
}

/* Dark mode variants */
[data-mantine-color-scheme='dark'] .frost-glass,
[data-mantine-color-scheme='dark'] .frost-glass-strong,
[data-mantine-color-scheme='dark'] .frost-glass-light {
  background: rgba(18, 18, 27, 0.3);
  border: 1px solid rgba(63, 63, 70, 0.3);
}
```

### Glassmorphism Usage Rules

1. **All content containers** must use glassmorphism for readability over animated background
2. **Consistent opacity**: Always use `0.3` opacity for background colors
3. **Proper isolation**: Include `position: relative` and `isolation: isolate`
4. **Fallback support**: Provide fallback styles for browsers without `backdrop-filter`
5. **Dark mode compatibility**: Use `[data-mantine-color-scheme='dark']` selectors

### Enhanced Text Readability

```css
/* Enhanced dimmed text for better readability over glassmorphism */
.frost-dimmed-text {
  color: var(--mantine-color-gray-7) !important;
  font-weight: 475;
}

[data-mantine-color-scheme='dark'] .frost-dimmed-text {
  color: var(--mantine-color-gray-4) !important;
}
```

---

## Animated Background System

### Core Features

The animated background creates a subtle, organic pattern with floating colored clouds:

- **Grid-based dots**: Evenly spaced dots that serve as "pin-holes" to reveal moving clouds
- **Floating clouds**: 2-3 organic-shaped colored clouds that move around the viewport
- **Mouse interaction**: Optional mouse attraction for enhanced interactivity
- **Theme awareness**: Adapts colors based on light/dark mode
- **Performance optimized**: GPU-accelerated with `requestAnimationFrame`

### Implementation

```tsx
// Basic usage
<AnimatedBackground />

// With custom settings
<AnimatedBackground
  dotSpacing={10}           // Closer dots for more detail
  dotRadius={2}             // Dot size
  cloudSpeed={2}            // Movement speed
  cloudCount={3}            // Number of clouds
  mouseAttraction={true}    // Enable mouse following
  mouseAttractionStrength={0.0005}
/>
```

### Background Colors

**Light Mode Clouds:**
- Cloud 1: `hsla(200, 70%, 60%, opacity)` - Blue
- Cloud 2: `hsla(280, 70%, 65%, opacity)` - Purple
- Cloud 3: `hsla(320, 70%, 65%, opacity)` - Pink

**Dark Mode Clouds:**
- Cloud 1: `hsla(200, 60%, 70%, opacity)` - Light blue
- Cloud 2: `hsla(280, 60%, 75%, opacity)` - Light purple
- Cloud 3: `hsla(320, 60%, 75%, opacity)` - Light pink

### Usage Rules

1. **Apply to all pages** for consistency
2. **Position behind content** with `z-index: -1`
3. **Non-interactive** with `pointer-events: none`
4. **Respect reduced motion** preferences
5. **Fixed positioning** to cover entire viewport

---

## Typography

### Font Stack

Use **Satoshi** for headings (display), **Inter** for body text, and **JetBrains Mono** for code.

- **Satoshi** (via [Fontshare](https://www.fontshare.com/fonts/satoshi)) - Modern geometric sans for headings
- **Inter** (via `next/font/google`) - Clean, readable body text
- **JetBrains Mono** (via `next/font/google`) - Monospace for code

```tsx
// Fonts setup in layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

// Satoshi loaded via link tag in head:
// <link href="https://api.fontshare.com/v2/css?f[]=satoshi@500,600,700,900&display=swap" rel="stylesheet" />
```

Mantine theme configuration:

- `fontFamily` (body): `var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `headings.fontFamily`: `'Satoshi', var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `fontFamilyMonospace`: `var(--font-jetbrains), ui-monospace, monospace`
- Headings weights (H1→H6): 700, 600, 600, 600, 600, 600

### Fluid Type Scale (using clamp)

```css
--text-xs:  clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem);
--text-sm:  clamp(0.875rem, 0.8rem + 0.3vw, 1rem);
--text-md:  clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-lg:  clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
--text-xl:  clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl: clamp(2rem, 1.5rem + 2vw, 3rem);
--text-4xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);
```

---

## Spacing Scale

Generous spacing for clean, modern layout using `clamp()` for responsiveness:

| Token | Size | Pixels | Usage |
|-------|------|--------|-------|
| xs | 0.5rem | 8px | Tight spacing |
| sm | 0.75rem | 12px | Small gaps |
| md | 1rem | 16px | Default spacing |
| lg | 1.5rem | 24px | Section spacing |
| xl | 2rem | 32px | Large gaps |

**Responsive spacing examples:**
```css
padding: clamp(2rem, 4vw, 3rem);    /* Responsive padding */
gap: clamp(1rem, 2vw, 2rem);        /* Responsive gaps */
margin-bottom: clamp(1rem, 2vw, 1.5rem); /* Responsive margins */
```

---

## Radius

| Token | Size | Pixels | Usage |
|-------|------|--------|-------|
| xs | 0.25rem | 4px | Small elements |
| sm | 0.375rem | 6px | Buttons, inputs |
| md | 0.5rem | 8px | Default (cards, containers) |
| lg | 0.75rem | 12px | Large containers |
| xl | 1rem | 16px | Hero sections |

**Responsive radius examples:**
```css
border-radius: clamp(0.75rem, 2vw, 1rem);  /* Responsive radius */
```

---

## Breakpoints

| Name | Width | Pixels |
|------|-------|--------|
| xs | 36em | 576px |
| sm | 48em | 768px |
| md | 62em | 992px |
| lg | 75em | 1200px |
| xl | 88em | 1408px |

These align to existing Mantine breakpoints; use `Container` sizes and `Hidden`/`Visible` utilities accordingly.

---

## Modern CSS Best Practices

### Responsive Sizing with clamp()

**Use `clamp()` for fluid, responsive values** instead of fixed sizes or media query breakpoints:

```css
/* ✅ Good - Fluid, responsive */
padding: clamp(0.75rem, 2vw, 1rem);
font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
gap: clamp(1rem, 2vw + 0.5rem, 2rem);

/* ❌ Avoid - Fixed values that don't adapt */
padding: 16px;
font-size: 18px;
```

**Benefits:**
- Smooth scaling across all viewport sizes
- Fewer media queries needed
- Better performance (no layout recalculation at breakpoints)
- Natural responsiveness

### Content-Driven Spacing

**Let content determine height and spacing** rather than fixing dimensions:

```css
/* ✅ Good - Content-driven */
.header {
  padding: clamp(0.75rem, 2vw, 1rem) 0;
  /* Height determined by content + padding */
}

/* ❌ Avoid - Fixed height can clip content */
.header {
  height: 60px;
}
```

**Apply to:**
- Headers, footers, navigation
- Cards, containers, sections
- Modal dialogs, dropdowns

**Exception:** Fixed heights are acceptable for decorative elements, avatars, icons, or where content overflow is handled.

### Mobile-First Approach

**Design and code for mobile first**, then enhance for larger screens:

```css
/* ✅ Good - Mobile-first */
.container {
  padding: 1rem;
  gap: 0.75rem;
}

@media (min-width: 48em) {
  .container {
    padding: 2rem;
    gap: 1.5rem;
  }
}

/* ❌ Avoid - Desktop-first (harder to scale down) */
.container {
  padding: 2rem;
  gap: 1.5rem;
}

@media (max-width: 48em) {
  .container {
    padding: 1rem;
    gap: 0.75rem;
  }
}
```

### Safe Area Support

**Account for device notches and safe areas** (iPhone X+, Android with notches):

```css
/* Support for safe areas */
@supports (padding-top: env(safe-area-inset-top)) {
  body {
    padding-top: max(clamp(3rem, 4vw + 2rem, 4.5rem), calc(env(safe-area-inset-top) + 2.5rem));
    padding-bottom: max(clamp(3rem, 4vw + 2rem, 4.5rem), calc(env(safe-area-inset-bottom) + 2.5rem));
  }
}
```

### Accessibility-First Spacing

**Ensure touch targets meet minimum sizes** (44×44px minimum for WCAG AAA):

```tsx
// ✅ Good - Adequate touch target
<ActionIcon size="lg" /> // 36px minimum, better with padding

// Better - explicit minimum
<ActionIcon size="lg" style={{ minWidth: 44, minHeight: 44 }} />

// ❌ Avoid - Too small for reliable touch
<ActionIcon size="xs" /> // May be too small on mobile
```

**Readable line lengths** - Limit text width for readability (45-75 characters):

```tsx
<Text maw="65ch">Long-form content should be constrained...</Text>
```

### Performance Considerations

**Use GPU-accelerated properties** for animations:

```css
/* ✅ Good - GPU accelerated */
transform: translateY(-100%);
opacity: 0;

/* ❌ Avoid - CPU intensive, causes reflow */
top: -100px;
visibility: hidden;
```

**Prefer `padding` over `margin` for spacing** when possible (easier to predict, no margin collapse):

```tsx
// ✅ Good - Predictable spacing
<Stack gap="md"> // Uses padding/gap
  <Card p="lg">...</Card>
</Stack>

// ⚠️ Use sparingly - Can cause collapse issues
<Box mb="md">...</Box>
```

### Responsive Typography

**Use relative units** (`rem`, `em`, `%`) instead of `px`:

```css
/* ✅ Good - Scales with user preferences */
font-size: 1rem;        /* 16px default */
line-height: 1.5;       /* Unitless for better scaling */
margin-bottom: 1.5em;   /* Relative to font size */

/* ❌ Avoid - Ignores user font size preferences */
font-size: 16px;
line-height: 24px;
```

### Logical Properties

**Use logical properties** for better internationalization (RTL support):

```css
/* ✅ Good - Works in LTR and RTL */
margin-inline-start: 1rem;
padding-block: 2rem;
border-inline-end: 1px solid;

/* ❌ Avoid - Assumes LTR layout */
margin-left: 1rem;
padding-top: 2rem;
padding-bottom: 2rem;
border-right: 1px solid;
```

### Container Queries (Future-Ready)

For component-level responsiveness (when browser support improves):

```css
/* Modern approach - responds to container, not viewport */
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### Checklist for Every Component

- [ ] Uses `clamp()` for responsive sizing where appropriate
- [ ] Content determines height (no fixed heights unless necessary)
- [ ] Mobile-first media queries (if any)
- [ ] Safe area insets considered for fixed elements
- [ ] Touch targets minimum 44×44px on mobile
- [ ] Uses relative units (`rem`, `em`, `%`)
- [ ] Animations use `transform`/`opacity` only
- [ ] Respects `prefers-reduced-motion`
- [ ] Adequate color contrast (WCAG AAA minimum)
- [ ] Visible focus states for keyboard navigation
- [ ] Glassmorphism applied for content containers
- [ ] Animated background integrated where appropriate

---

## Animations

Prefer transform/opacity animations; respect reduced motion.

```css
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
@keyframes shine { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
@keyframes gradient { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

.animate-float { animation: float 3s ease-in-out infinite; }
.animate-shine { animation: shine 3s ease-in-out infinite; }
.animate-gradient { animation: gradient 3s ease infinite; }
```

Apply via `className` on wrappers or via `sx` with `animation` values.

**Respect reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-shine,
  .animate-gradient {
    animation: none;
  }
}
```

---

## Component Patterns (Mantine)

### Buttons

- Primary: `color="primary"`, `fw={600}`
- Ghost/Light: `variant="light"` with neutral foreground
- Gradient CTA: `variant="gradient"` using indigo → grape

```tsx
<Group>
  <Button color="primary" radius="md">Primary</Button>
  <Button variant="light" color="primary" radius="md">Ghost</Button>
  <Button
    variant="gradient"
    gradient={{ from: 'indigo', to: 'grape', deg: 135 }}
    radius="md"
  >CTA</Button>
  <ActionIcon variant="light" color="primary" radius="md" aria-label="Next">
    {/* Icon */}
  </ActionIcon>
</Group>
```

### Cards with Glassmorphism

- Always use glassmorphism for content containers
- `withBorder` + `radius="md"`
- Hover: small lift + shadow

```tsx
<Card withBorder radius="md" shadow="sm" p="lg" className="frost-glass">
  <Card.Section>
    {/* Image or gradient header */}
  </Card.Section>
  <Stack gap="sm">
    <Title order={3}>Project title</Title>
    <Text c="dimmed" lineClamp={2}>Short description…</Text>
    <Group gap="xs">
      <Badge color="primary" variant="light">TypeScript</Badge>
      <Badge color="cyan" variant="light">Next.js</Badge>
    </Group>
  </Stack>
  <Group justify="flex-end" mt="md">
    <Button size="xs" variant="light">Live</Button>
    <Button size="xs" color="primary">Code</Button>
  </Group>
</Card>
```

### Skill/Progress (Gamified)

```tsx
<Stack>
  <Group justify="space-between">
    <Group gap="sm">
      <ThemeIcon radius="md" size="lg" color="primary"><span>JS</span></ThemeIcon>
      <Text fw={600}>JavaScript</Text>
    </Group>
    <Text c="dimmed">Lv. 85</Text>
  </Group>
  <Progress value={85} color="primary" radius="xl" />
</Stack>
```

### Badges/Achievements (Optional)

```tsx
<Paper withBorder radius="lg" p="md" className="frost-glass-light" style={{ borderWidth: 2, borderColor: 'var(--mantine-color-yellow-5)' }}>
  <Group>
    <ThemeIcon radius="xl" size="lg" color="yellow">✓</ThemeIcon>
    <div>
      <Text fw={600}>100 Commits</Text>
      <Text size="sm" c="dimmed">Consistent contributions</Text>
    </div>
  </Group>
</Paper>
```

---

## Accessibility

### WCAG AAA Compliance

- **Contrast ratios**: 7:1 for normal text, 4.5:1 for large text
- **Focus states**: Visible focus rings with brand colors
- **Reduced motion**: Respect `prefers-reduced-motion` for all animations
- **Keyboard navigation**: All interactive elements accessible via keyboard
- **Screen readers**: Proper ARIA labels and semantic HTML

```css
/* Enhanced focus styles for accessibility */
*:focus-visible {
  outline: 2px solid var(--focus-ring-color);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Focus ring colors */
--focus-ring-color: var(--brand-primary-500);
--focus-ring-width: 2px;
--focus-ring-offset: 2px;

/* Dark mode focus ring */
[data-mantine-color-scheme='dark'] {
  --focus-ring-color: var(--brand-primary-dark);
}
```

### Dark Mode Accessibility

- **Automatic detection**: Respects system preference by default
- **Manual toggle**: Available in navbar with proper ARIA labels
- **Hydration safety**: Prevents hydration mismatches with proper state management
- **Consistent contrast**: Maintains WCAG AAA compliance in both modes

---

## Iconography

Use FontAwesome (already installed) for consistency:

```tsx
// Import from FontAwesome kit
import { faMoon, faSunBright, faArrowUpRightFromSquare } from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Usage
<FontAwesomeIcon icon={faMoon} style={{ width: '18px', height: '18px' }} />
```

**Icon sizing standards:**
- Small: `12px` (inline with text)
- Medium: `16px` (buttons, badges)
- Large: `18px` (navigation, CTAs)
- Extra large: `24px` (hero sections)

---

## Dark Mode Implementation

### Automatic System Detection

```tsx
// Mantine handles system preference automatically
const { colorScheme } = useMantineColorScheme();
```

### Manual Toggle with Hydration Safety

```tsx
// Prevent hydration mismatches
const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  setIsHydrated(true);
}, []);

// Conditional rendering based on hydration state
{isHydrated ? (
  <FontAwesomeIcon icon={isDark ? faSunBright : faMoon} />
) : (
  <FontAwesomeIcon icon={faMoon} /> // Default for SSR
)}
```

### Color Scheme Toggle

Located in the navbar with:
- FontAwesome icons (moon/sun)
- Proper ARIA labels
- Tooltip with current mode indication
- Smooth transitions between modes

### Best Practices for Color Usage

#### ✅ DO: Use CSS classes with light-dark() for accent colors

When using accent colors that need to adapt to dark mode, create custom CSS classes:

```tsx
<Title className={styles.accentText}>Title</Title>
```

```css
.accentText {
  color: light-dark(var(--accent-cyan), var(--accent-cyan-dark));
}
```

**Why:** The `light-dark()` function automatically selects the appropriate color based on the current color scheme, ensuring proper WCAG AAA contrast ratios in both modes.

#### ✅ DO: Use `color="primary"` for the brand color

```tsx
<Button color="primary">Click me</Button>
<Badge color="primary">Badge</Badge>
```

**Why:** The `primary` color scale is properly configured in `theme.ts` with appropriate values for both light and dark modes through Mantine's built-in mechanisms.

#### ❌ AVOID: Using Mantine color props for accent colors

```tsx
/* Don't do this - won't adapt to dark mode properly */
<Title c="cyan">Title</Title>
<Badge color="grape">Badge</Badge>
<Button color="pink.5">Button</Button>
```

**Why:** Mantine's color scales in `theme.ts` use the same hex values for both light and dark modes. The color props don't automatically switch to lighter variants for better contrast in dark mode.

#### When to Use Each Approach

| Use Case | Approach | Example |
|----------|----------|---------|
| **Brand primary color** | Mantine `color="primary"` | `<Button color="primary">` |
| **Accent colors** (cyan, grape, pink) | CSS classes with `light-dark()` | `<Title className={styles.cyanText}>` |
| **Neutral colors** (gray, dimmed) | Mantine's built-in colors | `<Text c="dimmed">` |
| **Semantic colors** (success, error) | Mantine's built-in colors | `<Badge color="green">` |

#### Color Mapping Reference

| Color | Light Mode | Dark Mode | CSS Variable (Light) | CSS Variable (Dark) |
|-------|-----------|-----------|---------------------|---------------------|
| **Indigo/Primary** | `#4F46E5` | `#A3A5F3` | `--brand-primary-600` | `--brand-primary-dark` |
| **Cyan** | `#06B6D4` | `#67E8F9` | `--accent-cyan` | `--accent-cyan-dark` |
| **Grape/Purple** | `#7E22CE` | `#D8B4FE` | `var(--mantine-color-grape-7)` | `--accent-purple-dark` |
| **Pink** | `#EC4899` | `#F9A8D4` | `var(--mantine-color-pink-5)` | `--accent-pink-dark` |

#### Example Implementation

```tsx
// Component.tsx
export function MyComponent() {
  return (
    <div>
      <Title className={styles.cyanHeading}>Overview</Title>
      <Badge className={styles.cyanBadge}>New</Badge>
      <Button className={styles.cyanButton}>View More</Button>
    </div>
  );
}
```

```css
/* Component.module.css */
.cyanHeading {
  color: light-dark(var(--accent-cyan), var(--accent-cyan-dark));
}

.cyanBadge {
  background-color: light-dark(var(--mantine-color-cyan-1), var(--mantine-color-cyan-9)) !important;
  color: light-dark(var(--accent-cyan), var(--accent-cyan-dark)) !important;
}

.cyanButton {
  background-color: light-dark(var(--mantine-color-cyan-7), var(--mantine-color-cyan-6)) !important;
}

.cyanButton:hover {
  background-color: light-dark(var(--mantine-color-cyan-8), var(--mantine-color-cyan-5)) !important;
}
```

**Note:** The `!important` declaration is necessary to override Mantine's default component styles. While generally avoided, it's acceptable here as we're overriding third-party library styles with specific custom color schemes.

---

## Performance

### Font Loading

- Load fonts via `next/font` for optimal performance
- Satoshi loaded via Fontshare CDN link tag
- Inter and JetBrains Mono via Google Fonts

### Animation Performance

- Use `transform`/`opacity` for GPU acceleration
- `requestAnimationFrame` for smooth animations
- Respect `prefers-reduced-motion`
- Minimal layout thrash

### Backdrop Filter Support

```css
/* Provide fallbacks for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(12px)) {
  .frost-glass {
    background: rgba(255, 255, 255, 0.3);
  }
}
```

---

## Implementation Notes (Mantine Theme)

### Styling Architecture

**Decision: Mantine-only with CSS Modules**

The portfolio uses Mantine components exclusively with CSS Modules for custom styling:

**Why Mantine-only?**
- Comprehensive component library with excellent TypeScript support
- Built-in dark mode with proper SSR/hydration handling
- Flexible theming system
- Lower bundle size than adding Tailwind
- Sufficient for all current styling needs

**When to use each:**
```tsx
// ✅ Mantine props for standard styling
<Button color="primary" size="lg" radius="md">Click me</Button>

// ✅ CSS Modules for custom styling
import classes from './Component.module.css';
<div className={classes.customContainer}>...</div>

// ✅ CSS variables for shared tokens
<div style={{ padding: 'var(--spacing-lg)' }}>...</div>

// ❌ Avoid inline styles (unless absolutely necessary)
<div style={{ padding: '20px', margin: '10px' }}>...</div>
```

### Theme Configuration

```tsx
const themeOverride = createTheme({
  primaryColor: 'primary', // Custom indigo scale around #6366F1

  colors: {
    primary: [
      '#E8E9FB', // 0 - lightest
      '#C5C7F7', // 1
      '#A3A5F3', // 2
      '#818CF8', // 3 - primary-400
      '#6366F1', // 4 - primary-500 (main brand)
      '#4F46E5', // 5 - primary-600
      '#4338CA', // 6
      '#3730A3', // 7
      '#312E81', // 8
      '#1E1B4B', // 9 - darkest
    ],
    // Additional color scales: cyan, grape, teal, yellow, pink, neutral
  },

  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: {
    fontFamily: "'Satoshi', var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  fontFamilyMonospace: 'var(--font-jetbrains), ui-monospace, monospace',

  defaultRadius: 'md',
  respectReducedMotion: true,
  cursorType: 'pointer',

  // Component defaults (see Component Default Props section)
  components: { /* ... */ },

  // Dark mode overrides
  other: {
    darkModeColors: { /* WCAG AAA compliant colors */ },
  },
});
```

### Custom Color Scale

The `primary` color scale is custom-defined around `#6366F1`:
- `primary[0]`: `#E8E9FB` (lightest - backgrounds)
- `primary[3]`: `#818CF8` (primary-400 - lighter accents)
- `primary[4]`: `#6366F1` (primary-500 - **main brand color**)
- `primary[5]`: `#4F46E5` (primary-600 - darker accents)
- `primary[9]`: `#1E1B4B` (darkest - text on light backgrounds)

**Usage in components:**
```tsx
<Button color="primary">Uses primary[4] by default</Button>
<Badge color="primary" variant="light">Uses primary[1] background</Badge>
<Text c="primary">Uses primary[6] text color</Text>
```

### Color Naming Convention

**In Mantine components:**
- Use color names: `primary`, `cyan`, `grape`, `teal`, `yellow`, `pink`
- Examples: `<Button color="primary">`, `<Badge color="cyan">`

**In CSS/CSS Modules:**
- Use CSS variables for brand colors: `var(--brand-primary-500)`
- Use CSS variables for accents: `var(--accent-cyan)`, `var(--accent-purple)`
- Use Mantine color variables: `var(--mantine-color-primary-4)`

**In theme configuration:**
- Use Mantine color scale indices: `primary[4]`, `cyan[5]`, etc.

---

## Layout System & UX Behaviors

### Fixed Header/Footer with Body Padding

The portfolio uses a fixed positioning system for header and footer with responsive body padding to prevent content overlap:

```css
/* Body padding to accommodate fixed header/footer */
body {
  padding-top: clamp(3rem, 4vw + 2rem, 4.5rem);
  padding-bottom: clamp(3rem, 4vw + 2rem, 4.5rem);
}

/* Safe area support for notched devices */
@supports (padding-top: env(safe-area-inset-top)) {
  body {
    padding-top: max(clamp(3rem, 4vw + 2rem, 4.5rem), calc(env(safe-area-inset-top) + 2.5rem));
    padding-bottom: max(clamp(3rem, 4vw + 2rem, 4.5rem), calc(env(safe-area-inset-bottom) + 2.5rem));
  }
}
```

**Key decisions:**
- Content-driven heights (no fixed header/footer heights)
- Responsive padding using `clamp()` adapts to header/footer size
- Safe area insets support for iPhone X+ and Android notched devices

---

### Intelligent Header Behavior

The header has sophisticated scroll-based visibility behavior:

**Show/Hide Logic:**
- Always visible at top of page (scrollY < 50px)
- Hides when scrolling **down** (user reading content)
- Shows when scrolling **up** (user wants navigation)
- Auto-hides after **3 seconds** of no scroll activity (unless mouse is inside header)
- Stays visible if mouse is inside header area
- Persists visibility for **3 seconds** after mouse leaves

**Implementation:**
```tsx
// Header visibility managed by useHeaderVisibility hook
const { isVisible, handleMouseEnter, handleMouseLeave } = useHeaderVisibility(3000);

<header
  className={`${classes.header} ${isVisible ? classes.visible : classes.hidden}`}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
```

**CSS Animation:**
```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.header.visible {
  transform: translateY(0);
}

.header.hidden {
  transform: translateY(-100%);
}
```

**Why this behavior?**
- Maximizes reading space when user scrolls down
- Easy access to navigation when user scrolls up
- Mouse proximity keeps header accessible when needed
- Smooth, non-intrusive user experience

---

### Intelligent Footer Behavior

The footer has complementary visibility behavior to the header:

**Show/Hide Logic:**
- Always visible at **bottom of page** (when scrolled to end)
- Shows when scrolling **down** (complementary to header hiding)
- Hides when scrolling **up** (complementary to header showing)
- Auto-hides after **3 seconds** of no scroll activity (unless mouse is inside footer)
- Stays visible if mouse is inside footer area
- Persists visibility for **3 seconds** after mouse leaves

**Implementation:**
```tsx
// Footer visibility managed by useFooterVisibility hook
const { isVisible, handleMouseEnter, handleMouseLeave } = useFooterVisibility(3000);

<footer
  className={`${classes.footer} ${isVisible ? classes.visible : classes.hidden}`}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
```

**CSS Animation:**
```css
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.footer.visible {
  transform: translateY(0);
}

.footer.hidden {
  transform: translateY(100%);
}
```

**Why this behavior?**
- Contact info/social links available when scrolling content
- Stays out of the way when scrolling up to navigation
- Always visible at page bottom for easy contact access
- Symmetric, intuitive interaction with header

---

### Z-Index Hierarchy

Consistent z-index layering across the application:

```css
/* Z-index scale */
--z-background: -1;        /* AnimatedBackground */
--z-content: 0;            /* Normal content */
--z-header: 1000;          /* Fixed header */
--z-footer: 1000;          /* Fixed footer */
--z-modal: 1100;           /* Modals and overlays */
--z-tooltip: 1200;         /* Tooltips above everything */
```

**Layer priorities:**
1. **Background** (-1): Animated background behind everything
2. **Content** (0): Main page content with glassmorphism
3. **Header/Footer** (1000): Fixed navigation elements
4. **Modals** (1100): Dialog overlays
5. **Tooltips** (1200): Always on top for context

---

### Component Default Props

Mantine theme includes sensible defaults for consistent component behavior:

```tsx
components: {
  Button: {
    defaultProps: { radius: 'md' },
    styles: {
      root: {
        fontWeight: 500,
        transition: 'all 0.2s ease',
      },
    },
  },

  Card: {
    defaultProps: {
      radius: 'md',
      withBorder: true
    },
    styles: {
      root: {
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },

  Badge: {
    defaultProps: { radius: 'sm' },
  },

  ActionIcon: {
    defaultProps: { radius: 'md' },
  },

  Input: {
    defaultProps: { radius: 'md' },
  },

  Paper: {
    defaultProps: { radius: 'lg' },
  },
}
```

**Key decisions:**
- All interactive components have smooth transitions (0.2s ease)
- Cards have hover lift effect for visual feedback
- Consistent border radius across component types
- Borders on cards by default for definition

---

## Page-Specific Patterns

### Homepage

- **Animated background**: Applied with default settings
- **Glassmorphism**: All content sections use frosted glass
- **Hero section**: Strong glassmorphism for main content
- **Component sections**: Standard glassmorphism for readability

### Projects Pages

- **Projects listing**: Glassmorphism on search, filters, cards, and header
- **Individual projects**: Glassmorphism on all content sections
- **Project cards**: Enhanced with glassmorphism backgrounds

### About Page

- **Content containers**: Glassmorphism applied to all sections
- **Ready for content**: Structure in place for future content additions

### Navigation

- **Fixed header/footer**: Proper z-index layering
- **Dark mode toggle**: Hydration-safe implementation
- **Responsive design**: Mobile-first approach with proper touch targets

---

## Quick Snippets

```tsx
// Gradient CTA
<Button variant="gradient" gradient={{ from: 'indigo', to: 'grape', deg: 135 }}>Get in touch</Button>

// Tech chip
<Badge variant="light" color="primary" radius="sm">TypeScript</Badge>

// Glassmorphism container
<div className="frost-glass-strong">
  <Title order={2}>Featured Projects</Title>
  <Text c="dimmed">Project descriptions...</Text>
</div>

// Animated background
<AnimatedBackground mouseAttraction={true} cloudCount={3} />

// Responsive spacing
<div style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>

// Enhanced dimmed text
<Text c="dimmed" className="frost-dimmed-text">Better readability over glassmorphism</Text>
```

---

## Key Implementation Decisions

### 1. Glassmorphism Over Solid Backgrounds

**Decision:** Use frosted glass effects for all content containers instead of solid backgrounds.

**Rationale:**
- Maintains visibility of animated background
- Creates modern, sophisticated aesthetic
- Provides sufficient contrast for WCAG AAA compliance
- Adds depth perception through layering
- Browser fallback ensures accessibility

**Trade-offs:**
- Requires `backdrop-filter` support (95%+ browser support)
- Slightly more complex CSS
- Need to manage text readability carefully

---

### 2. Animated Background System

**Decision:** Use canvas-based animated background with organic cloud shapes.

**Rationale:**
- Creates unique, memorable visual identity
- GPU-accelerated for smooth performance
- Respects `prefers-reduced-motion` automatically
- Lightweight (no large assets/videos)
- Adapts to light/dark mode seamlessly

**Trade-offs:**
- Adds ~5KB to bundle
- Requires careful color management for readability
- Need glassmorphism to ensure text contrast

---

### 3. Intelligent Header/Footer Behavior

**Decision:** Implement scroll-based auto-hide/show with mouse proximity detection.

**Rationale:**
- Maximizes content reading space
- Intuitive navigation access when needed
- Professional, polished UX
- Symmetric, complementary behaviors
- Mouse proximity keeps UI accessible

**Trade-offs:**
- More complex than static fixed positioning
- Requires custom hooks and state management
- Needs careful timing tuning (3s delays)

---

### 4. WCAG AAA Compliance

**Decision:** Target WCAG 2.1 AAA (7:1 contrast) instead of just AA (4.5:1).

**Rationale:**
- Maximum accessibility for all users
- Better readability in all lighting conditions
- Demonstrates professional quality
- Future-proof against stricter standards
- Better brand perception

**Trade-offs:**
- More restrictive color choices
- Requires careful testing of all combinations
- Dark mode colors need extra adjustment

---

### 5. Content-Driven Heights with `clamp()`

**Decision:** Use `clamp()` for responsive sizing and avoid fixed heights.

**Rationale:**
- Naturally responsive across all screen sizes
- Reduces need for media queries
- Better performance (fewer layout recalculations)
- Content never gets clipped
- Adapts to user font size preferences

**Trade-offs:**
- Slightly less precise control
- Requires more planning of min/max values
- Need to test across viewport ranges

---

### 6. Mantine-Only (No Tailwind)

**Decision:** Use Mantine exclusively with CSS Modules for custom styling.

**Rationale:**
- Comprehensive component library
- Excellent TypeScript support
- Built-in dark mode with SSR safety
- Lower bundle size than Mantine + Tailwind
- Sufficient for all current needs
- Consistent API across components

**Trade-offs:**
- Less utility-first flexibility
- Custom styling requires CSS Modules
- Can't use Tailwind's JIT compilation

---

### 7. Fixed Positioning with Body Padding

**Decision:** Use fixed header/footer with responsive body padding instead of layout components.

**Rationale:**
- Content-driven header/footer heights
- Smooth scroll-based animations
- Safe area support for notched devices
- No content jumping on hide/show
- Simpler z-index management

**Trade-offs:**
- Body padding must be maintained
- More complex than standard layouts
- Need to account for safe areas

---

## Future Considerations

### Phase 1 (Near-term)
- Add project filtering/search with URL params for shareable links
- Implement project case study template with rich content
- Add certificate/achievement cards to About page
- Integrate analytics tracking for CTA performance

### Phase 2 (Mid-term)
- Consider headless CMS for project content management
- Add animated gradient utilities for hero sections
- Implement container queries when browser support reaches 90%
- Add more interactive elements with animated background
- Consider subtle particle effects for enhanced visual interest

### Phase 3 (Long-term)
- Evaluate A/B testing for CTA variations
- Consider blog integration with MDX
- Add case study templates with diagrams/code excerpts
- Implement progressive enhancement features
- Explore micro-interactions and gamification elements

---

## Development Guidelines

### When Adding New Components

**Required Checklist:**
1. ✅ **Apply glassmorphism** to all content containers
2. ✅ **Use responsive spacing** with `clamp()`
3. ✅ **Ensure WCAG AAA compliance** (7:1 contrast minimum)
4. ✅ **Add proper focus states** for keyboard accessibility
5. ✅ **Include dark mode support** with proper color variants
6. ✅ **Respect reduced motion** preferences
7. ✅ **Test with animated background** for visual consistency
8. ✅ **Use content-driven heights** (no fixed dimensions)
9. ✅ **Add safe area insets** for fixed/sticky elements
10. ✅ **Touch targets minimum 44×44px** on mobile

**Code Review Checklist:**
```tsx
// Component.tsx
export function MyComponent() {
  return (
    <div className={classes.container}>  {/* ✅ CSS Module */}
      <Title order={2}>Section Title</Title>  {/* ✅ Mantine component */}
      <Text c="dimmed" className={classes.dimmedText}>  {/* ✅ Enhanced readability */}
        Content with proper contrast
      </Text>
      <Button
        color="primary"  {/* ✅ Theme color */}
        size="lg"  {/* ✅ Adequate touch target */}
      >
        Action
      </Button>
    </div>
  );
}
```

```css
/* Component.module.css */
.container {
  /* ✅ Glassmorphism */
  background: light-dark(rgba(255, 255, 255, 0.75), rgba(18, 18, 27, 0.75));
  backdrop-filter: blur(12px) saturate(180%);

  /* ✅ Responsive sizing with clamp() */
  padding: clamp(2rem, 4vw, 3rem);
  border-radius: clamp(0.75rem, 2vw, 1rem);

  /* ✅ No fixed height - content-driven */
  /* height: auto; (implicit) */
}

/* ✅ Enhanced readability for dimmed text */
.dimmedText {
  font-weight: 475 !important;
  color: light-dark(
    var(--mantine-color-gray-7),
    var(--mantine-color-gray-4)
  ) !important;
}

/* ✅ Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .container {
    transition: none;
  }
}
```

---

### When Adding New Pages

**Required Steps:**
1. ✅ **Include animated background** for consistency
2. ✅ **Apply glassmorphism** to all content sections
3. ✅ **Ensure proper z-index layering** (background at -1, content at 0)
4. ✅ **Test dark mode** functionality thoroughly
5. ✅ **Verify accessibility** with screen readers and keyboard navigation
6. ✅ **Add semantic HTML** with proper heading hierarchy
7. ✅ **Include SEO metadata** (title, description, OG tags)
8. ✅ **Test responsive behavior** across all breakpoints

**Page Template:**
```tsx
// app/new-page/page.tsx
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import classes from './NewPage.module.css';

export const metadata = {
  title: 'Page Title - Dave Donnelly',
  description: 'Page description for SEO',
};

export default function NewPage() {
  return (
    <>
      <AnimatedBackground />
      <main className={classes.main}>
        <Container size="xl">
          <section className={classes.section}>
            {/* Content with glassmorphism */}
          </section>
        </Container>
      </main>
    </>
  );
}
```

---

## Maintenance Notes

### Regular Reviews

**Monthly:**
- Review analytics for CTA performance
- Check Lighthouse scores (target ≥95)
- Verify WCAG AAA compliance with contrast checker
- Test keyboard navigation flows
- Review dark mode appearance

**Quarterly:**
- Update dependencies (Mantine, Next.js)
- Review browser support for `backdrop-filter`
- Evaluate new CSS features for adoption
- Performance audit with WebPageTest
- Accessibility audit with axe DevTools

**Annually:**
- Design refresh consideration
- Color palette review
- Typography scale evaluation
- Animation performance review
- User feedback integration

---

## Document Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Oct 2024 | Initial theme documentation |
| 2.0 | Oct 2024 | Added glassmorphism system |
| 2.1 | Oct 2024 | Added animated background documentation |
| 3.0 | Oct 8, 2025 | Comprehensive UX behaviors, implementation decisions, development guidelines |
| 3.1 | Oct 8, 2025 | **Current** - Added dark mode color best practices with `light-dark()` function |

---

**Last Updated:** October 8, 2025
**Maintained By:** Dave Donnelly
**Status:** Active Development

This theme guide serves as the **definitive reference** for maintaining visual consistency, implementing new features, and onboarding contributors to the portfolio project.