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
  title: 'Dave Donnelly - Web Developer',
  description: 'Portfolio of Dave Donnelly, a junior web developer based in Sydney.',
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
