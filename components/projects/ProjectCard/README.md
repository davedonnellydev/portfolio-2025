# ProjectCard Component

## Overview

The `ProjectCard` component displays a project in a card format with screenshot, description, tech stack, and action buttons. It's used on both the homepage (featured projects) and the projects listing page.

## Features

- **Project Screenshot**: Optimized Next.js Image with lazy loading
- **Project Details**: Title, description, and outcome metric
- **Tech Stack Badges**: Color-coded chips showing technologies used
- **Action Buttons**: Links to case study, live demo, and repository
- **Analytics Tracking**: Tracks user interactions for all CTAs
- **Search Parameter Preservation**: Maintains URL params when navigating to case study

## Usage

```tsx
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';

// Basic usage
<ProjectCard project={projects[0]} />

// With search params (on projects page)
<ProjectCard
  project={project}
  currentSearchParams="tech=React&search=learning"
  location="projects"
/>

// On homepage
<ProjectCard
  project={project}
  location="home"
/>
```

## Props

### `ProjectCardProps`

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `project` | `Project` | Yes | - | Project data object containing all project information |
| `currentSearchParams` | `string` | No | - | URL search parameters to preserve when navigating to case study |
| `location` | `'home' \| 'projects'` | No | `'projects'` | Where the card is displayed, affects analytics tracking |

### `Project` Interface

```typescript
interface Project {
  slug: string;           // URL slug for the project
  title: string;          // Project title
  description: string;    // Short description
  outcome: string;        // Key outcome/achievement
  screenshot: string;     // Path to screenshot image
  techStack: string[];    // Array of technology names
  links: {
    live?: string;        // Live demo URL (optional)
    repo?: string;        // GitHub repository URL (optional)
    caseStudy: string;    // Case study page path
  };
  featured: boolean;      // Whether featured on homepage
}
```

## Styling

Component uses CSS Modules (`ProjectCard.module.css`) with the following classes:

- `.card` - Card container with hover effects
- `.imageSection` - Screenshot section
- `.imageWrapper` - Image container maintaining aspect ratio
- `.image` - Next.js Image with object-fit cover
- `.content` - Card content container
- `.title` - Project title styling
- `.outcomeWrapper` - Outcome metric container
- `.outcomeLabel` - "Outcome:" label
- `.outcome` - Outcome text with accent color
- `.techStack` - Tech badge container
- `.actions` - Button group container
- `.actionButton` - Primary action button

## Analytics Events

The component tracks the following analytics events:

- `case_study_click` - When user clicks "Read case study" button
- `live_demo_click` - When user clicks "Live" button
- `repo_click` - When user clicks "Code" button

All events include:
- `project_slug` - The project slug
- `project_title` - The project title
- `location` - Where the card is displayed ('home' or 'projects')

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- Alt text for all images (describes project screenshot)
- Keyboard accessible buttons and links
- External links open in new tab with `rel="noopener noreferrer"`
- Focus states on all interactive elements

## Performance

- **Lazy Loading**: Images lazy load by default, except for featured projects on homepage
- **Responsive Images**: Uses `sizes` prop for optimal image loading
- **Code Splitting**: Client component with analytics loaded only when needed

## Examples

### Featured Project on Homepage

```tsx
<ProjectCard
  project={featuredProject}
  location="home"
/>
```

### Filtered Projects Page

```tsx
const filteredProjects = projects.filter(/* ... */);
const searchParams = new URLSearchParams({ tech: 'React', search: 'learning' });

{filteredProjects.map((project) => (
  <ProjectCard
    key={project.slug}
    project={project}
    currentSearchParams={searchParams.toString()}
    location="projects"
  />
))}
```

## Dependencies

- `next/image` - Optimized image component
- `next/link` - Client-side routing
- `@mantine/core` - UI components (Badge, Button, Card, Group, Stack, Text, Title)
- `@/lib/analytics` - Analytics tracking utilities

## Related Components

- `FeaturedProjects` - Displays featured projects on homepage
- `ProjectsPageClient` - Main projects listing page
- `ProjectFilters` - Filter projects by tech stack
- `ProjectSearch` - Search projects

## Testing

See `ProjectCard.test.tsx` for component tests including:
- Rendering with project data
- Button interactions
- Analytics tracking
- Link navigation
- Conditional rendering (live demo, repo links)

## Notes

- Image loading strategy changes based on location:
  - Homepage featured projects: `loading="eager"` (above fold)
  - Projects page: `loading="lazy"` (below fold)
- Tech stack badges use Mantine's indigo color to match site theme
- Outcome metric is visually highlighted as the key success metric
