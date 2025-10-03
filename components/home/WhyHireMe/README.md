# WhyHireMe Component

## Overview

The `WhyHireMe` component is a key section of the home page that presents the three core value propositions to potential employers. It serves as a "hiring manager's cheat sheet" that clearly communicates the candidate's strengths and how they map to role requirements.

## Design

### Layout
- **Container**: Uses Mantine's `Container` with `size="xl"` for proper content width
- **Grid**: 3-column responsive grid (1 column on mobile, 3 on desktop)
- **Cards**: Each pillar is presented in a card with consistent styling

### Content Structure
Each pillar card contains:
- **Icon**: Tabler icon with themed color
- **Title**: Clear, action-oriented heading
- **Description**: Brief explanation of the value proposition
- **Benefits**: Bulleted list of specific benefits/outcomes

### Visual Design
- **Colors**: Uses theme colors (primary, cyan, grape) for visual hierarchy
- **Typography**: Clear heading hierarchy with proper contrast
- **Spacing**: Generous whitespace following the design system
- **Hover Effects**: Subtle card elevation on hover (inherited from theme)

## Three Pillars

### 1. Ship Quickly
- **Icon**: Rocket (IconRocket)
- **Color**: Primary (indigo)
- **Focus**: Rapid delivery without compromising quality
- **Benefits**: Prototyping, debugging, architecture, CI/CD

### 2. Communicate Clearly
- **Icon**: Message Circle (IconMessageCircle)
- **Color**: Cyan
- **Focus**: Bridging technical and business communication
- **Benefits**: Documentation, updates, reviews, UX

### 3. Leverage AI Responsibly
- **Icon**: Brain (IconBrain)
- **Color**: Grape (purple)
- **Focus**: AI-enhanced productivity with quality control
- **Benefits**: Development assistance, testing, optimization, learning

## Usage

```tsx
import { WhyHireMe } from '../components/home/WhyHireMe';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureProjects projects={projects} />
      <WhyHireMe />
      {/* Other sections... */}
    </>
  );
}
```

## Accessibility

- **Semantic HTML**: Proper heading hierarchy (h2 → h3)
- **Color Contrast**: Uses theme colors that meet WCAG AA standards
- **Focus States**: Inherits accessible focus styles from Mantine theme
- **Screen Readers**: Descriptive text and proper ARIA labeling through Mantine components

## Responsive Behavior

- **Mobile**: Single column layout with full-width cards
- **Tablet**: Maintains single column for better readability
- **Desktop**: 3-column grid layout for efficient space usage

## Theme Integration

The component fully integrates with the portfolio's design system:
- Uses theme colors for consistency
- Inherits hover effects from Card component theme
- Follows spacing and typography scales
- Respects dark/light mode preferences
