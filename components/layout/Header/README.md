# Header & Navbar Components

## Overview

The `Header` component provides a sticky header with navigation. It features auto-hide/show behavior on scroll and contains the `Navbar` component which handles all navigation logic, including responsive mobile menu, dropdowns, and theme toggling.

## Components

### Header Component

Main container with:
- Logo (links to homepage)
- Navbar component
- Auto-hide on scroll down behavior
- Auto-show on scroll up behavior
- Sticky positioning

### Navbar Component

Navigation system with:
- Desktop navigation with dropdown menus
- Mobile navigation with hamburger menu
- Dark/light mode toggle
- Active page highlighting
- Keyboard accessible dropdowns
- Smooth scroll to anchor links

## Features

### Header Features

- **Auto-Hide on Scroll Down**: Hides when user scrolls down
- **Auto-Show on Scroll Up**: Shows when user scrolls up
- **Persist on Hover**: Stays visible when mouse is over header
- **Sticky Positioning**: Always accessible via scroll up
- **Smooth Animations**: CSS transitions for show/hide

### Navbar Features

- **Responsive Design**: Desktop navigation + mobile drawer
- **Dropdown Menus**: Page-specific quick navigation
- **Active State**: Highlights current page
- **Theme Toggle**: Dark/light mode switch
- **External Links**: Proper indicators and new tab behavior
- **Keyboard Navigation**: Full keyboard support
- **Smooth Scrolling**: Anchor link smooth scroll behavior

## Usage

### Basic Usage

```tsx
import { Header } from '@/components/layout/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

## Navigation Structure

```typescript
const navLinks: NavLink[] = [
  {
    href: '/',
    label: 'Home',
    dropdown: [
      { label: 'Featured Projects', href: '/#featured-projects' },
      { label: 'Why Hire Me', href: '/#why-hire-me' },
      { label: 'About Me', href: '/#micro-bio' },
    ],
  },
  { href: '/projects', label: 'Projects' },
  {
    href: '/about',
    label: 'About',
    dropdown: [
      { label: 'Mission', href: '/about#mission' },
      { label: 'Background', href: '/about#background' },
      { label: 'Certificates', href: '/about#certificates' },
    ],
  },
  { href: 'https://blog.davedonnelly.dev', label: 'Blog', external: true },
];
```

### NavLink Interface

```typescript
interface NavLink {
  href: string;          // Link destination
  label: string;         // Display text
  external?: boolean;    // Opens in new tab
  dropdown?: DropdownItem[]; // Optional dropdown menu
}

interface DropdownItem {
  label: string;         // Display text
  href: string;          // Anchor or page link
}
```

## Header Component Details

### Props

No props required - uses `useHeaderVisibility` hook internally.

### Hook: useHeaderVisibility

```typescript
const { isVisible, handleMouseEnter, handleMouseLeave } = useHeaderVisibility();
```

**Behavior:**
- Tracks scroll direction
- Hides header on scroll down (past threshold)
- Shows header on scroll up
- Persists when mouse is over header
- Auto-hides after 3s of no scroll

### Styling

- `.header` - Main header container
- `.visible` - Visible state (translateY(0))
- `.hidden` - Hidden state (translateY(-100%))

## Navbar Component Details

### Desktop Navigation

- Horizontal menu with links
- Dropdown menus on hover
- Chevron indicator for dropdowns
- Active page highlighting
- Theme toggle button

**Dropdown Behavior:**
- Opens on mouse hover
- 150ms delay before closing
- Closes on Escape key
- Closes on click outside
- Keyboard accessible (Tab, Enter, Space)

### Mobile Navigation

- Hamburger menu button
- Full-screen drawer
- Expandable sections for dropdowns
- Theme toggle button
- Close on route change

**Mobile Menu:**
- Opens from right side
- Full viewport width
- Traps focus (accessibility)
- Locks scroll when open
- Close button (burger transforms to X)

### Theme Toggle

- Sun icon (light mode) / Moon icon (dark mode)
- Tooltip with current action
- Accessible label
- Hydration-safe (prevents flicker)

### Active State Logic

```typescript
const isActive = link.href === '/'
  ? pathname === '/'             // Exact match for home
  : pathname.startsWith(link.href); // Prefix match for other pages
```

## Keyboard Support

### Desktop Dropdown Navigation

- `Tab` - Navigate between nav links
- `Enter` - Activate link or dropdown item
- `Space` - Activate dropdown item
- `Escape` - Close open dropdown
- `Arrow Keys` - Navigate dropdown items (browser default)

### Mobile Menu

- `Tab` - Navigate menu items
- `Enter` - Activate link or toggle dropdown
- `Escape` - Close drawer (Mantine built-in)

## Accessibility

### ARIA Attributes

**Desktop Nav:**
- `aria-label="Main navigation"` - Identifies navigation landmark
- `role="menu"` - Dropdown menu semantic role
- `role="menuitem"` - Dropdown item semantic role
- `tabIndex={0}` - Keyboard focusable dropdown items

**Mobile Nav:**
- `aria-label="Mobile navigation"` - Identifies mobile nav
- `aria-label` on burger button - "Open menu" / "Close menu"
- `aria-expanded` - Indicates dropdown state
- `aria-label` on theme toggle - Describes current action

### Screen Reader Support

- External link indication: "(opens in new window)"
- Clear navigation structure
- Proper heading hierarchy (Logo is not a heading, just a link)
- Semantic HTML (`<nav>`, `<a>`)

### Focus Management

- Visible focus states on all interactive elements
- Focus trap in mobile drawer
- Focus returns to trigger after dropdown closes
- No focus loss when theme changes

## Smooth Scrolling

The navbar handles anchor links with smooth scrolling:

### Same-Page Anchors (e.g., `/#featured-projects`)

```typescript
if (pathname === '/') {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth' });
} else {
  window.location.href = href; // Navigate to page first
}
```

### Cross-Page Anchors (e.g., `/about#mission`)

```typescript
window.location.href = href; // Browser handles scroll to anchor
```

## Styling

### Header Styles (`Header.module.css`)

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  transition: transform 0.3s ease;
}

.visible {
  transform: translateY(0);
}

.hidden {
  transform: translateY(-100%);
}
```

### Navbar Styles (`Navbar.module.css`)

Key classes:
- `.desktopNav` - Desktop navigation (≥ 768px)
- `.mobileNav` - Mobile navigation (< 768px)
- `.link` - Navigation link
- `.pill` - Link background with hover effect
- `.active` - Active page styling
- `.dropdown` - Dropdown menu container
- `.dropdownItem` - Individual dropdown item
- `.chevron` - Dropdown indicator
- `.chevronOpen` - Rotated chevron (dropdown open)
- `.burger` - Mobile menu button
- `.drawer` - Mobile menu drawer
- `.mobileMenuItem` - Mobile menu link
- `.mobileMenuItemActive` - Active mobile menu item

## Responsive Breakpoints

- **Desktop**: ≥ 768px - Full navigation with dropdowns
- **Mobile**: < 768px - Hamburger menu with drawer

## Hydration Safety

The theme toggle is hydration-safe:

```typescript
const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  setIsHydrated(true);
}, []);

// Render generic icon until hydrated
{isHydrated ? (
  <FontAwesomeIcon icon={isDark ? faSunBright : faMoon} />
) : (
  <FontAwesomeIcon icon={faMoon} />
)}
```

This prevents hydration mismatches between server and client.

## Examples

### Adding a New Nav Link

```typescript
const navLinks: NavLink[] = [
  // ... existing links
  {
    href: '/contact',
    label: 'Contact'
  },
];
```

### Adding a Dropdown

```typescript
{
  href: '/services',
  label: 'Services',
  dropdown: [
    { label: 'Web Development', href: '/services#web' },
    { label: 'Consulting', href: '/services#consulting' },
  ],
}
```

### External Link

```typescript
{
  href: 'https://github.com/yourusername',
  label: 'GitHub',
  external: true  // Opens in new tab with icon
}
```

## Common Issues & Solutions

### Issue: Header covers content

**Solution:** Add padding-top to main content:
```css
main {
  padding-top: 80px; /* Height of header */
}
```

### Issue: Dropdown closes too quickly

**Solution:** Adjust timeout in `handleMouseLeave`:
```typescript
dropdownTimeoutRef.current = setTimeout(() => {
  setOpenDropdown(null);
}, 300); // Increase delay
```

### Issue: Smooth scroll not working

**Solutions:**
1. Verify element IDs match href anchors
2. Check `scroll-behavior` CSS property
3. Ensure elements are not inside `overflow: hidden` containers

### Issue: Mobile menu not closing on route change

**Solution:** Already handled via `useEffect` watching `pathname`

### Issue: Theme flicker on page load

**Solution:** Already handled with hydration-safe rendering

## Performance

- **Lightweight**: Minimal JavaScript
- **CSS Animations**: GPU-accelerated transforms
- **Event Cleanup**: All listeners removed on unmount
- **Optimized Re-renders**: State managed efficiently

## Testing

See `Header.test.tsx` and `Navbar.test.tsx` for comprehensive tests including:
- Rendering all navigation links
- Active state highlighting
- Dropdown behavior
- Mobile menu functionality
- Theme toggle
- Keyboard navigation
- Accessibility attributes
- Smooth scrolling

## Dependencies

### Header
- `@mantine/core` - Container, Group
- `@/components/shared/Logo` - Logo component
- `@/lib/hooks` - useHeaderVisibility
- `./Navbar` - Navbar component

### Navbar
- `next/link` - Client-side navigation
- `next/navigation` - usePathname
- `@fortawesome/react-fontawesome` - Icons
- `@mantine/core` - ActionIcon, Burger, Drawer, Group, Stack, Text, Tooltip
- `@mantine/hooks` - useDisclosure, useMantineColorScheme

## Related Components

- `Logo` - Header logo component
- `Footer` - Complementary footer with similar auto-hide
- `useHeaderVisibility` - Custom visibility hook
- `useScrollDirection` - Scroll direction detection hook

## Icons Used

**From `classic/light`:**
- `faArrowUpRightFromSquare` - External link indicator
- `faChevronDown` - Dropdown indicator
- `faMoon` - Dark mode icon
- `faSunBright` - Light mode icon

## Future Enhancements

Potential improvements:
- [ ] Add search bar in header
- [ ] Add breadcrumb navigation
- [ ] Add progress indicator for long pages
- [ ] Add notification badge
- [ ] Add user avatar/menu (if adding auth)
- [ ] Add keyboard shortcuts modal
- [ ] Add language selector
- [ ] Animate dropdown items (stagger effect)
- [ ] Add mega menu for complex navigation
