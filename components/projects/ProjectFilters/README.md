# ProjectFilters Component

## Overview

The `ProjectFilters` component provides an interactive filtering interface for projects based on technology stack. Users can click technology badges to filter projects, with visual feedback and project counts.

## Features

- **Dynamic Tech Stack Generation**: Automatically extracts unique technologies from project data
- **Project Counts**: Shows number of projects using each technology
- **Multi-Select Filtering**: Click badges to toggle selection
- **Visual Feedback**: Selected badges have filled style with scale animation
- **Keyboard Accessible**: Full keyboard navigation with Enter and Space key support
- **Active Filter Display**: Shows currently selected technologies
- **Alphabetically Sorted**: Technologies displayed in alphabetical order

## Usage

```tsx
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { projects } from '@/data/projects';

function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  return (
    <ProjectFilters
      projects={projects}
      selectedTech={selectedTech}
      onTechToggle={handleTechToggle}
    />
  );
}
```

## Props

### `ProjectFiltersProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `projects` | `Project[]` | Yes | Array of all projects to extract technologies from |
| `selectedTech` | `string[]` | Yes | Array of currently selected technology filters |
| `onTechToggle` | `(tech: string) => void` | Yes | Callback when a technology badge is clicked |

## Behavior

### Technology Extraction

The component automatically:
1. Extracts all unique technologies from `project.techStack` arrays
2. Counts how many projects use each technology
3. Sorts technologies alphabetically
4. Displays badges with counts in format: "Technology (count)"

### Selection State

- **Unselected**: Light gray badge, scale(1)
- **Selected**: Filled indigo badge, scale(1.05)
- **Hover**: Smooth transition between states
- **Focus**: Keyboard focus visible on badges

### Active Filters Display

When technologies are selected, shows message:
```
Showing projects using: React, TypeScript, Next.js
```

## Styling

Component uses CSS Modules (`ProjectFilters.module.css`) with:

- `.filtersContainer` - Main container
- Inline styles for badge animations and transitions
- Uses Mantine color scheme (indigo for selected, gray for unselected)

## Accessibility

- **Semantic HTML**: Proper button roles for interactive badges
- **ARIA Attributes**:
  - `role="button"` - Indicates badge is clickable
  - `aria-pressed` - Indicates selection state (true/false)
  - `tabIndex={0}` - Makes badges keyboard focusable
- **Keyboard Support**:
  - `Enter` key - Toggle filter
  - `Space` key - Toggle filter
  - `Tab` - Navigate between badges
- **Screen Readers**: Selection state announced properly

## Analytics Integration

While not directly tracked, filter usage should be tracked by parent component when `onTechToggle` is called. Example:

```tsx
const handleTechToggle = (tech: string) => {
  analytics.trackProjectFilter(tech, !selectedTech.includes(tech));
  setSelectedTech((prev) =>
    prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
  );
};
```

## Examples

### Basic Usage

```tsx
<ProjectFilters
  projects={allProjects}
  selectedTech={selectedTech}
  onTechToggle={handleTechToggle}
/>
```

### With Analytics Tracking

```tsx
const handleTechToggle = (tech: string) => {
  const isSelecting = !selectedTech.includes(tech);

  // Track analytics
  analytics.trackProjectFilterUsed(tech, isSelecting);

  // Update state
  setSelectedTech((prev) =>
    isSelecting ? [...prev, tech] : prev.filter((t) => t !== tech)
  );
};

<ProjectFilters
  projects={projects}
  selectedTech={selectedTech}
  onTechToggle={handleTechToggle}
/>
```

### Complete Filtering Example

```tsx
function ProjectsList() {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  // Filter projects based on selected tech
  const filteredProjects = selectedTech.length === 0
    ? projects
    : projects.filter((project) =>
        selectedTech.every((tech) => project.techStack.includes(tech))
      );

  return (
    <>
      <ProjectFilters
        projects={projects}
        selectedTech={selectedTech}
        onTechToggle={(tech) => {
          setSelectedTech((prev) =>
            prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
          );
        }}
      />

      <div>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
```

## Performance

- **Efficient Filtering**: Uses `Array.from(new Set())` for O(n) unique extraction
- **Memoization Opportunity**: Consider memoizing tech extraction if project list is large
- **No Re-renders**: Only re-renders when props change

## Animation

Badges have smooth transitions:
- `transition: 'all 0.2s ease'` - Smooth state changes
- `transform: scale(1.05)` - Subtle scale on selection
- Hover states with visual feedback

## Dependencies

- `@mantine/core` - Badge, Group, Stack, Text components
- `@/data/projects` - Project type definition

## Related Components

- `ProjectSearch` - Search projects by text
- `ProjectsPageClient` - Main projects listing page that uses this component
- `ProjectCard` - Displays filtered projects

## Testing

See `ProjectFilters.test.tsx` for component tests including:
- Technology extraction and display
- Badge click handling
- Keyboard interaction
- Selection state display
- Accessibility attributes

## Edge Cases

- **No Projects**: Returns empty tech list
- **No Selected Filters**: Shows all technologies
- **All Filters Selected**: Shows "Showing projects using: [all tech]"
- **Projects with No Tech**: Excluded from tech list

## Future Enhancements

Potential improvements:
- Add "Clear All" button when filters are active
- Add search/filter for technology names
- Show available project count next to each badge
- Add technology icons/logos
- Persist filters in URL query parameters
- Add filter presets (e.g., "Frontend", "Full-stack", "AI-powered")
