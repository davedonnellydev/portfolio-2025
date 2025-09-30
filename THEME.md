# Portfolio Theme Guide

This document outlines the design system and theme configuration for the portfolio website.

## Design Principles

1. **Generous Whitespace** - Clean, modern layout with breathing room
2. **Single Accent Color** - Professional blue used sparingly for emphasis
3. **Excellent Readability** - Clear typography hierarchy and contrast
4. **Accessibility First** - WCAG AA compliant, visible focus states
5. **Modern & Fast** - Subtle animations, optimized performance

## Color Palette

### Primary Accent (Blue)
Used sparingly for CTAs, highlights, and interactive elements.

```css
--accent-color: #2563eb;        /* Main accent (blue-600) */
--accent-color-hover: #1d4ed8;  /* Hover state (blue-700) */
--accent-color-light: #3b82f6;  /* Light variant (blue-500) */
```

**Full Blue Scale:**
- `#e6f2ff` - blue-0 (lightest)
- `#bfdbfe` - blue-1
- `#93c5fd` - blue-2
- `#60a5fa` - blue-3
- `#3b82f6` - blue-4
- `#2563eb` - blue-5 (main)
- `#1d4ed8` - blue-6
- `#1e40af` - blue-7
- `#1e3a8a` - blue-8
- `#172554` - blue-9 (darkest)

### Usage Guidelines

- **Primary CTAs**: Use main accent color (`#2563eb`)
- **Links**: Accent color on hover
- **Active States**: Accent color indicators (e.g., nav underline)
- **Badges/Pills**: Light accent variants
- **Focus Rings**: Accent color outline

## Typography

### Font Stack

```css
/* Body & Headings */
font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;

/* Code/Monospace */
font-family: var(--font-geist-mono), ui-monospace, monospace;
```

### Heading Scale

| Element | Size | Line Height | Weight |
|---------|------|-------------|--------|
| H1 | 2.5rem (40px) | 1.2 | 700 |
| H2 | 2rem (32px) | 1.3 | 600 |
| H3 | 1.5rem (24px) | 1.4 | 600 |
| H4 | 1.25rem (20px) | 1.5 | 600 |
| H5 | 1.125rem (18px) | 1.5 | 600 |
| H6 | 1rem (16px) | 1.5 | 600 |

## Spacing Scale

Generous spacing for clean, modern layout:

| Token | Size | Pixels | Usage |
|-------|------|--------|-------|
| xs | 0.5rem | 8px | Tight spacing |
| sm | 0.75rem | 12px | Small gaps |
| md | 1rem | 16px | Default spacing |
| lg | 1.5rem | 24px | Section spacing |
| xl | 2rem | 32px | Large gaps |

## Border Radius

Consistent rounding for modern, friendly feel:

| Token | Size | Pixels |
|-------|------|--------|
| xs | 0.25rem | 4px |
| sm | 0.375rem | 6px |
| md | 0.5rem | 8px (default) |
| lg | 0.75rem | 12px |
| xl | 1rem | 16px |

## Breakpoints

Responsive layout breakpoints:

| Name | Width | Pixels |
|------|-------|--------|
| xs | 36em | 576px |
| sm | 48em | 768px |
| md | 62em | 992px |
| lg | 75em | 1200px |
| xl | 88em | 1408px |

## Component Styles

### Cards
- Default radius: `md` (8px)
- Border: Yes
- Hover effect: Subtle lift + shadow
- Transition: 0.2s ease

### Buttons
- Default radius: `md`
- Font weight: 500
- Transition: 0.2s ease

### Badges
- Radius: `sm` (6px)
- Used for tech stack chips, status indicators

### Inputs & Forms
- Radius: `md`
- Clear focus states

## Accessibility Features

### Focus States
```css
--focus-ring-color: #2563eb;
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
```

- Visible focus rings on all interactive elements
- High contrast for keyboard navigation
- Consistent across components

### Color Contrast
- All text meets WCAG AA standards
- Accent color has sufficient contrast in both light and dark modes

### Motion
- Respects `prefers-reduced-motion`
- All animations disabled when user preference is set
- Smooth scroll disabled for reduced motion

## Dark Mode Support

- Automatic dark mode detection via `prefers-color-scheme`
- Manual toggle available (ColorSchemeToggle component)
- All colors adapt appropriately
- Custom scrollbar styling for both modes

## Performance Considerations

- Font smoothing enabled for crisp text
- Respects reduced motion preferences
- Smooth transitions (0.2s standard)
- No heavy animations or parallax effects

## Usage Examples

### Using the Accent Color

```tsx
// Primary CTA
<Button color="blue">Book 15-min intro</Button>

// Secondary action
<Button variant="light" color="blue">View Projects</Button>

// Badge with accent
<Badge color="blue">TypeScript</Badge>
```

### Spacing

```tsx
// Large section gap
<Stack gap="xl">...</Stack>

// Card grid with generous spacing
<SimpleGrid spacing="lg">...</SimpleGrid>

// Tight inline spacing
<Group gap="sm">...</Group>
```

### Typography

```tsx
// Page title
<Title order={1}>Welcome</Title>

// Section heading
<Title order={2}>Projects</Title>

// Subsection
<Title order={3}>Featured Work</Title>
```

## Future Considerations

- Consider adding custom fonts (currently using system defaults)
- May introduce secondary accent for specific use cases
- Could add custom shadows for depth hierarchy
- Possible addition of gradient variants for hero sections
