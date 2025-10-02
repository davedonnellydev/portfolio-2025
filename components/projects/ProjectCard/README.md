# ProjectCard Component

A reusable card component for displaying project information across the portfolio site.

## Features

- **Responsive design** with mobile-first approach
- **Optimized images** using Next.js Image component
- **Hover effects** with subtle lift and shadow
- **Highlighted outcome metric** in gradient box
- **Tech stack badges** for easy filtering
- **Conditional action buttons** (Live/Code only show if URLs provided)
- **Accessibility-first** with adequate touch targets (44×44px minimum)
- **Dark mode support** with automatic color adaptation
- **Performance optimized** using GPU-accelerated transforms
- **Respects reduced motion** preferences

## Usage

```tsx
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <Grid>
      {projects.map((project) => (
        <Grid.Col key={project.slug} span={{ base: 12, sm: 6, lg: 4 }}>
          <ProjectCard project={project} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `project` | `Project` | Yes | Project data object from `/data/projects.ts` |

## Project Data Structure

The component expects a `Project` object with the following structure:

```typescript
{
  slug: string;              // URL-friendly identifier
  title: string;             // Project title
  description: string;       // 1-2 sentence description
  outcome: string;           // Highlighted outcome/result
  screenshot: string;        // Path to project screenshot
  techStack: string[];       // Array of technology names
  links: {
    caseStudy: string;       // Link to detailed case study (required)
    live?: string;           // Link to live demo (optional)
    repo?: string;           // Link to code repository (optional)
  };
  featured: boolean;         // Whether to feature on home page
}
```

## Styling

The component uses CSS Modules following the THEME.md guidelines:

- **Fluid sizing** with `clamp()` for responsive typography and spacing
- **Content-driven layout** - no fixed heights
- **Logical properties** for RTL support
- **CSS custom properties** for theme integration
- **GPU-accelerated animations** (transform/opacity only)

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- Visible focus states for keyboard navigation
- Adequate touch targets (minimum 44×44px on mobile)
- Color contrast meets WCAG AA standards
- Alt text for images
- External links open with `rel="noopener noreferrer"` for security

## Performance

- Next.js Image optimization with responsive sizes
- Lazy loading for below-fold images
- Minimal CSS with scoped modules
- GPU-accelerated hover effects
- Respects `prefers-reduced-motion`

## Responsive Behavior

### Mobile (< 768px)
- Full width layout
- Stacked action buttons
- Optimized image sizes

### Tablet (768px - 1200px)
- 2-column grid recommended
- Horizontal button layout

### Desktop (> 1200px)
- 3-column grid recommended
- All features visible

## Dark Mode

The component automatically adapts to the user's color scheme preference:
- Gradient backgrounds adjust for dark mode
- Text colors maintain proper contrast
- Border colors update appropriately
- No manual theme switching required in component

## Future Enhancements

- [ ] Add loading skeleton state
- [ ] Support for video thumbnails
- [ ] Analytics tracking on button clicks
- [ ] Bookmark/favorite functionality
- [ ] Share functionality
