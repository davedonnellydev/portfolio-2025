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
  primaryColor: 'blue',

  /** Custom color palette - professional blue accent */
  colors: {
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
  },

  /** Typography scale for hierarchy and readability */
  fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'var(--font-geist-mono), ui-monospace, monospace',

  headings: {
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
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
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
  },

  /** Border radius for modern, friendly feel */
  radius: {
    xs: '0.25rem',  // 4px
    sm: '0.375rem', // 6px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
  },

  /** Focus ring styles for accessibility */
  focusRing: 'auto',
  focusClassName: 'mantine-focus-ring',

  /** Default radius for components */
  defaultRadius: 'md',

  /** Container sizes for responsive layout */
  breakpoints: {
    xs: '36em',   // 576px
    sm: '48em',   // 768px
    md: '62em',   // 992px
    lg: '75em',   // 1200px
    xl: '88em',   // 1408px
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
