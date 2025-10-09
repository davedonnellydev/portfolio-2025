# ProjectSearch Component

## Overview

The `ProjectSearch` component provides a text input search interface for filtering projects by title or description. It includes a clear button and displays the number of matching results.

## Features

- **Search Input**: Text input with search icon
- **Clear Button**: Quick clear functionality with X icon (appears when text is entered)
- **Result Count**: Optional display of matching project count
- **Responsive Design**: Adapts to container width with flex layout
- **Smooth Transitions**: Animated focus states and interactions
- **Accessible**: Full keyboard support and proper ARIA labels

## Usage

```tsx
import { ProjectSearch } from '@/components/projects/ProjectSearch';

function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProjects(filtered);
  };

  return (
    <ProjectSearch
      searchQuery={searchQuery}
      onSearchChange={handleSearch}
      resultCount={filteredProjects.length}
    />
  );
}
```

## Props

### `ProjectSearchProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `searchQuery` | `string` | Yes | Current search query value (controlled input) |
| `onSearchChange` | `(query: string) => void` | Yes | Callback when search query changes |
| `resultCount` | `number` | No | Number of filtered results to display |

## Behavior

### Search Input

- Controlled input component - parent manages state
- Updates on every keystroke via `onChange` event
- Placeholder text: "Search projects by title or description..."
- Flexible width - takes up available space in container

### Clear Button

- Appears only when `searchQuery` is not empty
- Clicking clears the search (calls `onSearchChange('')`)
- Icon button with subtle gray styling
- Accessible label: "Clear search"

### Result Count

- Displays format: "X project(s) found"
- Uses singular "project" when count is 1
- Only shown when `resultCount` prop is provided
- No wrap on text - stays on single line

## Styling

Component uses CSS Modules (`ProjectSearch.module.css`) with:

- `.searchContainer` - Main container
- Inline styles for input focus states and transitions
- Mantine's indigo color for focus (matches site theme)
- Box shadow on focus for visual feedback

### Focus States

```css
input:focus {
  borderColor: 'var(--mantine-color-indigo-5)',
  boxShadow: '0 0 0 1px var(--mantine-color-indigo-5)',
}
```

All transitions: `0.2s ease`

## Accessibility

- **Semantic HTML**: Uses native `input` element
- **Icon Labels**:
  - Search icon in left section (decorative)
  - Clear button has `aria-label="Clear search"`
- **Keyboard Support**:
  - Standard text input keyboard behavior
  - Clear button accessible via Tab key
  - Enter key can trigger search if parent implements
- **Screen Reader**: Result count announced when updated

## Icons

Uses `@tabler/icons-react`:
- `IconSearch` (size: 16) - Left section of input
- `IconX` (size: 14) - Clear button

## Examples

### Basic Usage Without Result Count

```tsx
<ProjectSearch
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
/>
```

### With Result Count

```tsx
<ProjectSearch
  searchQuery={searchQuery}
  onSearchChange={handleSearchChange}
  resultCount={filteredProjects.length}
/>
```

### With Analytics Tracking

```tsx
const handleSearchChange = (query: string) => {
  setSearchQuery(query);

  // Track search usage
  if (query.length > 2) {
    analytics.trackProjectSearchUsed(query, filteredResults.length);
  }
};

<ProjectSearch
  searchQuery={searchQuery}
  onSearchChange={handleSearchChange}
  resultCount={filteredProjects.length}
/>
```

### Complete Search Implementation

```tsx
function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;

    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      <ProjectSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredProjects.length}
      />

      {filteredProjects.length === 0 ? (
        <Text>No projects found matching "{searchQuery}"</Text>
      ) : (
        <Grid>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Grid>
      )}
    </>
  );
}
```

## Performance

- **Controlled Input**: Efficient re-renders with proper state management
- **Debouncing**: Consider debouncing for expensive operations:

```tsx
const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery);
  }, 300);

  return () => clearTimeout(timer);
}, [searchQuery]);

// Use debouncedQuery for filtering
const filteredProjects = projects.filter(/* use debouncedQuery */);
```

## Search Algorithm Recommendations

### Simple Search (Current)

```typescript
const filtered = projects.filter(
  (project) =>
    project.title.toLowerCase().includes(query.toLowerCase()) ||
    project.description.toLowerCase().includes(query.toLowerCase())
);
```

### Enhanced Search (Recommended)

```typescript
function searchProjects(projects: Project[], query: string): Project[] {
  if (!query.trim()) return projects;

  const terms = query.toLowerCase().split(/\s+/);

  return projects.filter((project) => {
    const searchableText = [
      project.title,
      project.description,
      project.outcome,
      ...project.techStack,
    ].join(' ').toLowerCase();

    // Match if all terms are found
    return terms.every((term) => searchableText.includes(term));
  });
}
```

### Fuzzy Search (Advanced)

For larger project lists, consider libraries like:
- `fuse.js` - Lightweight fuzzy search
- `flexsearch` - Fast full-text search

## Dependencies

- `@tabler/icons-react` - IconSearch, IconX
- `@mantine/core` - ActionIcon, Group, Text, TextInput

## Related Components

- `ProjectFilters` - Filter projects by technology
- `ProjectsPageClient` - Main projects listing page
- `ProjectCard` - Displays search results

## Testing

See `ProjectSearch.test.tsx` for component tests including:
- Input value updates
- Clear button functionality
- Result count display
- Accessibility attributes
- Keyboard interactions

## Common Patterns

### Combine with Filters

```tsx
function ProjectsWithSearchAndFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const filteredProjects = projects.filter((project) => {
    // Apply text search
    const matchesSearch = !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply tech filters
    const matchesTech = selectedTech.length === 0 ||
      selectedTech.every((tech) => project.techStack.includes(tech));

    return matchesSearch && matchesTech;
  });

  return (
    <>
      <ProjectSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredProjects.length}
      />
      <ProjectFilters
        projects={projects}
        selectedTech={selectedTech}
        onTechToggle={handleTechToggle}
      />
    </>
  );
}
```

### URL Parameter Sync

```tsx
function ProjectsWithURLSync() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }

    router.push(`/projects?${params.toString()}`);
  };

  return (
    <ProjectSearch
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      resultCount={filteredProjects.length}
    />
  );
}
```

## Future Enhancements

Potential improvements:
- Search suggestions/autocomplete
- Search history
- Highlight matching text in results
- Search by tech stack directly in search input
- Recent searches dropdown
- Voice search support
- Search shortcuts (e.g., "tech:React" to filter by tech)
