'use client';

import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core';

/**
 * Portfolio Theme Configuration
 *
 * Design principles:
 * - Generous whitespace for clean, modern look
 * - Single accent color (blue) used sparingly
 * - Professional typography with good readability
 * - Accessible focus states and color contrast
 */

const themeOverride = createTheme({
  /** Primary accent color - used sparingly for CTAs and highlights */
  primaryColor: 'primary',

  /** Custom color palette - brand primary (indigo) + accent colors */
  colors: {
    primary: [
      '#E8E9FB', // 0 - lightest (derived from #6366F1)
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
    blue: [
      '#e6f2ff', // 0 - lightest
      '#bfdbfe', // 1
      '#93c5fd', // 2
      '#60a5fa', // 3
      '#3b82f6', // 4
      '#2563eb', // 5 - main accent
      '#1d4ed8', // 6
      '#1e40af', // 7
      '#1e3a8a', // 8
      '#172554', // 9 - darkest
    ],
    cyan: [
      '#ECFEFF', // 0
      '#CFFAFE', // 1
      '#A5F3FC', // 2
      '#67E8F9', // 3
      '#22D3EE', // 4
      '#06B6D4', // 5 - accent-cyan
      '#0891B2', // 6
      '#0E7490', // 7
      '#155E75', // 8
      '#164E63', // 9
    ],
    grape: [
      '#F3E8FF', // 0
      '#E9D5FF', // 1
      '#D8B4FE', // 2
      '#C084FC', // 3
      '#A855F7', // 4 - accent-purple
      '#9333EA', // 5
      '#7E22CE', // 6
      '#6B21A8', // 7
      '#581C87', // 8
      '#3B0764', // 9
    ],
    teal: [
      '#F0FDFA', // 0
      '#CCFBF1', // 1
      '#99F6E4', // 2
      '#5EEAD4', // 3
      '#2DD4BF', // 4
      '#10B981', // 5 - accent-emerald
      '#0D9488', // 6
      '#0F766E', // 7
      '#115E59', // 8
      '#134E4A', // 9
    ],
    yellow: [
      '#FEFCE8', // 0
      '#FEF9C3', // 1
      '#FEF08A', // 2
      '#FDE047', // 3
      '#FACC15', // 4
      '#F59E0B', // 5 - accent-amber
      '#D97706', // 6
      '#B45309', // 7
      '#92400E', // 8
      '#78350F', // 9
    ],
    pink: [
      '#FDF2F8', // 0 - lightest
      '#FCE7F3', // 1
      '#FBCFE8', // 2
      '#F9A8D4', // 3
      '#F472B6', // 4
      '#EC4899', // 5 - accent-pink
      '#DB2777', // 6
      '#BE185D', // 7
      '#9D174D', // 8
      '#831843', // 9 - darkest
    ],
    neutral: [
      '#FAFAFA' /* --neutral-50 */,
      '#F4F4F5' /* --neutral-100 */,
      '#E4E4E7' /* --neutral-200: borders */,
      '#D4D4D8' /* --neutral-300: disabled */,
      '#A1A1AA' /* --neutral-400: placeholder */,
      '#71717A' /* --neutral-500: secondary text */,
      '#52525B' /* --neutral-600: body text */,
      '#3F3F46' /* --neutral-700: headings */,
      '#27272A' /* --neutral-800: dark surfaces */,
      '#18181B' /* --neutral-900 */,
    ],
  },

  /** Typography scale for hierarchy and readability */
  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'var(--font-jetbrains), ui-monospace, monospace',

  headings: {
    fontFamily:
      "'Satoshi', var(--font-inter), -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2', fontWeight: '700' },
      h2: { fontSize: '2rem', lineHeight: '1.3', fontWeight: '600' },
      h3: { fontSize: '1.5rem', lineHeight: '1.4', fontWeight: '600' },
      h4: { fontSize: '1.25rem', lineHeight: '1.5', fontWeight: '600' },
      h5: { fontSize: '1.125rem', lineHeight: '1.5', fontWeight: '600' },
      h6: { fontSize: '1rem', lineHeight: '1.5', fontWeight: '600' },
    },
  },

  /** Generous spacing scale */
  spacing: {
    xs: '0.5rem', // 8px
    sm: '0.75rem', // 12px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
  },

  /** Border radius for modern, friendly feel */
  radius: {
    xs: '0.25rem', // 4px
    sm: '0.375rem', // 6px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
  },

  /** Focus ring styles for accessibility */
  focusRing: 'auto',
  focusClassName: 'mantine-focus-ring',

  /** Default radius for components */
  defaultRadius: 'md',

  /** Container sizes for responsive layout */
  breakpoints: {
    xs: '36em', // 576px
    sm: '48em', // 768px
    md: '62em', // 992px
    lg: '75em', // 1200px
    xl: '88em', // 1408px
  },

  /** Component-specific overrides */
  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },

    Button: {
      defaultProps: {
        radius: 'md',
      },
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
        withBorder: true,
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
      defaultProps: {
        radius: 'sm',
      },
    },

    ActionIcon: {
      defaultProps: {
        radius: 'md',
      },
    },

    Input: {
      defaultProps: {
        radius: 'md',
      },
    },

    Paper: {
      defaultProps: {
        radius: 'md',
      },
    },
  },

  /** Other theme settings */
  respectReducedMotion: true,
  cursorType: 'pointer',
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
