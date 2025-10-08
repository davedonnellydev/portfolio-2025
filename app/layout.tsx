import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';

import React from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Footer } from '@/components/layout/Footer/Footer';
import { Header } from '@/components/layout/Header/Header';
import { theme } from '../theme';

config.autoAddCss = false;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://davedonnelly.dev'),
  title: {
    default: 'Dave Donnelly - Web Developer',
    template: '%s | Dave Donnelly',
  },
  description:
    'Portfolio of Dave Donnelly, a junior web developer based in Sydney. Specializing in Next.js, React, TypeScript, and accessible web applications.',
  keywords: [
    'web developer',
    'frontend developer',
    'React developer',
    'Next.js developer',
    'TypeScript',
    'Sydney',
    'education technology',
    'accessible web design',
    'portfolio',
  ],
  authors: [{ name: 'Dave Donnelly' }],
  creator: 'Dave Donnelly',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Dave Donnelly - Web Developer',
    title: 'Dave Donnelly - Web Developer',
    description:
      'Portfolio of Dave Donnelly, a junior web developer based in Sydney. Specializing in Next.js, React, TypeScript, and accessible web applications.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dave Donnelly - Web Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dave Donnelly - Web Developer',
    description:
      'Portfolio of Dave Donnelly, a junior web developer based in Sydney. Specializing in Next.js, React, TypeScript, and accessible web applications.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500,600,700,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
        />
        <script defer src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <ModalsProvider>
            <Header />
            {children}
            <Footer />
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
