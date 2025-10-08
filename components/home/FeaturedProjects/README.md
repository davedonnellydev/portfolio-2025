# SignatureProjects Component

A home page section that showcases featured projects in a responsive grid layout.

## Overview

The SignatureProjects component displays 3-4 featured projects from the project data, each rendered using the ProjectCard component. It includes a section header, responsive grid, and a "See all projects" call-to-action button.

## Features

- **Automatic Filtering**: Only displays projects marked as `featured: true`
- **Responsive Grid**: Adapts from 1 column (mobile) to 3 columns (desktop)
- **Fluid Typography**: Uses `clamp()` for responsive font sizing
- **Gradient Title**: Eye-catching gradient text effect on the section title
- **CTA Button**: Links to the full projects page
- **Accessibility**: Semantic HTML and proper focus states
- **Dark Mode**: Automatic theme adaptation

## Props

```typescript
interface SignatureProjectsProps {
  projects: Project[]; // Array of all projects (will be filtered for featured)
}
```

## Usage

```tsx
import { SignatureProjects } from '@/components/home/SignatureProjects';
import { projects } from '@/data/projects';

export default function HomePage() {
  return (
    <>
      {/* Other sections */}
      <SignatureProjects projects={projects} />
      {/* Other sections */}
    </>
  );
}
```

## Layout Structure

```
<section> (Signature Projects Section)
  <Container>
    <Stack>
      <header> (Section title and subtitle)
      <SimpleGrid> (Responsive grid: 1/2/3 cols)
        <ProjectCard /> (Featured project 1)
        <ProjectCard /> (Featured project 2)
        <ProjectCard /> (Featured project 3)
        <ProjectCard /> (Featured project 4, optional)
      </SimpleGrid>
      <footer> (See all projects button)
    </Stack>
  </Container>
</section>
```

## Styling

The component uses CSS Modules with the following key features:

### Responsive Spacing
- Uses `clamp()` for fluid padding and margins
- Mobile-first approach with generous whitespace
- Scales smoothly across all viewport sizes

### Typography
- Section title: 2rem → 3rem with gradient effect
- Subtitle: 1rem → 1.25rem, center-aligned, max-width 65ch

### Grid Responsiveness
- Mobile (< 576px): 1 column
- Tablet (576-992px): 2 columns
- Desktop (≥ 992px): 3 columns

### Interactions
- Button hover: Subtle lift effect (-2px translateY)
- Shadow enhancement on hover
- Respects `prefers-reduced-motion`

## Theme Integration

Follows the portfolio theme guidelines:

- **Colors**: Indigo primary with grape accent for gradients
- **Spacing**: Uses theme spacing tokens (md, lg, xl)
- **Typography**: Fluid sizing with clamp()
- **Accessibility**: WCAG AA contrast, visible focus states
- **Performance**: GPU-accelerated transforms only

## Customization

### Changing Featured Project Limit

To display more or fewer projects:

```tsx
// In SignatureProjects.tsx
const featuredProjects = projects.filter((p) => p.featured).slice(0, 4); // Change 4 to desired number
```

### Adjusting Grid Columns

To modify the responsive grid:

```tsx
<SimpleGrid
  cols={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }} // Customize breakpoints
  spacing={{ base: 'md', sm: 'lg', lg: 'xl' }}
>
```

### Custom Styling

Override styles using the `className` prop or by modifying the CSS Module:

```css
/* SignatureProjects.module.css */
.section {
  /* Add custom background, borders, etc. */
}
```

## Dependencies

- `@mantine/core`: Container, Title, Text, Stack, Button, SimpleGrid
- `@tabler/icons-react`: IconArrowRight
- `next/link`: Client-side navigation
- `ProjectCard`: Displays individual project information

## Accessibility

- Semantic HTML5 `<section>` element
- Descriptive section heading (h2)
- Max-width text containers for readability (65ch)
- Keyboard navigable CTA button
- Sufficient color contrast in light/dark modes
- Respects reduced motion preferences

## Best Practices

1. **Project Data**: Ensure at least 3 projects have `featured: true` in your data
2. **Images**: Optimize project screenshots for web (WebP recommended)
3. **Loading**: Consider adding loading states if projects come from an API
4. **Analytics**: Track clicks on "See all projects" button
5. **Performance**: Use Next.js Image component in ProjectCard for optimization

## Related Components

- `ProjectCard`: Individual project display
- `Hero`: Previous home page section
- `WhyHireMe`: Next planned home page section (coming soon)

## Future Enhancements

- [ ] Animation on scroll (fade in/slide up)
- [ ] Skeleton loading states
- [ ] Carousel view for mobile (swipe through projects)
- [ ] Filter toggle (view all vs. featured only)
- [ ] Featured project rotation/shuffle
