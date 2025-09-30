# Portfolio Theme Guide (2025 Refresh)

This guide consolidates the visual design system and its Mantine mapping so the look & feel is consistent across the app. It translates the Tailwind-like tokens from `portfolio-design-system.md` into Mantine theme guidance, CSS variables, and usage examples.

## Design Principles

1. **Clean first, fun second** — Professional clarity with personality touches
2. **Performance-focused** — Smooth, GPU-accelerated animations; minimal layout thrash
3. **Accessible** — WCAG AA contrast, visible focus, reduced-motion support
4. **Responsive** — Mobile-first with fluid typography
5. **Subtle gamification (optional)** — Badges, progress bars, tasteful micro-interactions

---

## Color System

### Brand and Accents

Use indigo as the primary brand color, supported by accent hues for highlights and semantic states.

```css
/* CSS tokens (can be referenced in styles and inline CSS vars) */
--brand-primary-500: #6366F1; /* Indigo */
--brand-primary-400: #818CF8;
--brand-primary-600: #4F46E5;

--accent-cyan:    #06B6D4;  /* CTAs, highlights */
--accent-purple:  #A855F7;  /* Creative elements */
--accent-emerald: #10B981;  /* Success */
--accent-amber:   #F59E0B;  /* Warnings/attention */
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
```

### Mantine Mapping

- **primaryColor**: `indigo` (or define a custom `primary` color array around `#6366F1`).
- Use `accent-cyan`, `accent-purple`, `accent-emerald`, `accent-amber` as semantic choices for `color` on `Badge`, `Button`, `Progress`, etc.
- Prefer `withBorder` + neutral tokens for cards and surfaces.

Usage examples:

```tsx
// CTAs
<Button color="indigo">View projects</Button>
<Button variant="gradient" gradient={{ from: 'indigo', to: 'grape' }}>Hire me</Button>

// Semantic accents
<Badge color="cyan">Next.js</Badge>
<Badge color="grape">Design Systems</Badge>
<Badge color="teal">CI/CD</Badge>
<Badge color="yellow">New</Badge>
```

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

### Fluid Type Scale (reference)

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

Generous spacing for clean, modern layout:

| Token | Size | Pixels | Usage |
|-------|------|--------|-------|
| xs | 0.5rem | 8px | Tight spacing |
| sm | 0.75rem | 12px | Small gaps |
| md | 1rem | 16px | Default spacing |
| lg | 1.5rem | 24px | Section spacing |
| xl | 2rem | 32px | Large gaps |

Mantine uses `theme.spacing` for these; match component `gap/spacing` to tokens above.

---

## Radius

| Token | Size | Pixels |
|-------|------|--------|
| xs | 0.25rem | 4px |
| sm | 0.375rem | 6px |
| md | 0.5rem | 8px (default) |
| lg | 0.75rem | 12px |
| xl | 1rem | 16px |

Default component radius is `md`.

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

---

## Component Patterns (Mantine)

### Buttons

- Primary: `color="indigo"`, `fw={600}`
- Ghost/Light: `variant="light"` with neutral foreground
- Gradient CTA: `variant="gradient"` using indigo → grape

```tsx
<Group>
  <Button color="indigo" radius="md">Primary</Button>
  <Button variant="light" color="indigo" radius="md">Ghost</Button>
  <Button
    variant="gradient"
    gradient={{ from: 'indigo', to: 'grape', deg: 135 }}
    radius="md"
  >CTA</Button>
  <ActionIcon variant="light" color="indigo" radius="md" aria-label="Next">
    {/* Icon */}
  </ActionIcon>
  </Group>
```

### Cards

- `withBorder` + `radius="md"`
- Hover: small lift + shadow

```tsx
<Card withBorder radius="md" shadow="sm" p="lg">
  <Card.Section>
    {/* Image or gradient header */}
  </Card.Section>
  <Stack gap="sm">
    <Title order={3}>Project title</Title>
    <Text c="dimmed" lineClamp={2}>Short description…</Text>
    <Group gap="xs">
      <Badge color="indigo" variant="light">TypeScript</Badge>
      <Badge color="cyan" variant="light">Next.js</Badge>
    </Group>
  </Stack>
  <Group justify="flex-end" mt="md">
    <Button size="xs" variant="light">Live</Button>
    <Button size="xs" color="indigo">Code</Button>
  </Group>
</Card>
```

### Skill/Progress (Gamified)

```tsx
<Stack>
  <Group justify="space-between">
    <Group gap="sm">
      <ThemeIcon radius="md" size="lg" color="indigo"><span>JS</span></ThemeIcon>
      <Text fw={600}>JavaScript</Text>
    </Group>
    <Text c="dimmed">Lv. 85</Text>
  </Group>
  <Progress value={85} color="indigo" radius="xl" />
</Stack>
```

### Badges/Achievements (Optional)

```tsx
<Paper withBorder radius="lg" p="md" style={{ borderWidth: 2, borderColor: 'var(--mantine-color-yellow-5)' }}>
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

- Visible focus rings (match accent):

```css
--focus-ring-color: var(--brand-primary-500);
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
```

- Respect `prefers-reduced-motion`; disable non-essential animations.
- Maintain AA contrast in light/dark modes.

---

## Iconography

Use FontAwesome (already installed) or Tabler Icons. Replace inline SVGs from the design system with reusable icon components for size/color consistency.

---

## Dark Mode

- Automatic via system preference; manual toggle available.
- Neutrals and brand adapt; avoid pure black/white.
- Provide subtle shadows and borders for depth in dark mode.

---

## Performance

- Load fonts via `next/font`.
- Prefer CSS transforms/opacity for animations.
- Avoid large parallax/background video; keep hero effects lightweight.

---

## Implementation Notes (Mantine Theme)

- Set `primaryColor` to `indigo` or define a custom `primary` scale around `#6366F1`.
- Update `fontFamily` to Inter and `fontFamilyMonospace` to JetBrains Mono.
- Keep `defaultRadius="md"`, spacing tokens as specified, and breakpoints as listed.

---

## Tailwind vs Mantine

- Mantine is sufficient to implement this system using `sx`, variants, and theme tokens. Use Mantine for consistency and speed.
- Tailwind can be added if you want utility-first classes for micro-layouts and quick animations, but it’s optional and increases stack complexity.
- Recommendation: **Stay Mantine-only** for now; revisit Tailwind if we hit styling friction that’s cumbersome in Mantine.

---

## Quick Snippets

```tsx
// Gradient CTA
<Button variant="gradient" gradient={{ from: 'indigo', to: 'grape', deg: 135 }}>Get in touch</Button>

// Tech chip
<Badge variant="light" color="indigo" radius="sm">TypeScript</Badge>

// Section wrapper with subtle gradient bg
<Paper radius="lg" p="xl" style={{ background: 'var(--gradient-primary)' }}>
  <Title order={2}>Featured Projects</Title>
</Paper>
```

---

## Future Considerations

- Add custom color scale for `primary` that precisely tracks `#6366F1` family.
- Consider animated gradient utilities for hero sections (CSS-only).
- Expand semantic tokens (success/info/warning) mapped to accents.
