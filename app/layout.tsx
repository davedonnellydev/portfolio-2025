import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';

import React from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';

config.autoAddCss = false;

export const metadata = {
  title: 'Dave Donnelly - Web Developer',
  description: 'Portfolio of Dave Donnelly, a junior web developer based in Sydney.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
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
