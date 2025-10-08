'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Anchor, Box, Container, Group, Loader, Paper, Stack, Text } from '@mantine/core';
import { SocialProofProps } from './types';
import classes from './SocialProof.module.css';

declare global {
  interface Window {
    GitHubCalendar: (selector: string, username: string, options?: any) => void;
  }
}

export function SocialProof({ logos, testimonial }: SocialProofProps) {
  useEffect(() => {
    // Initialize GitHub Calendar when component mounts
    if (typeof window !== 'undefined' && window.GitHubCalendar) {
      window.GitHubCalendar('.calendar', 'davedonnellydev', {
        responsive: true,
        tooltips: true,
        global_stats: false,
        cache: 24 * 60 * 60 * 1000, // Cache for 24 hours
      });
    }
  }, []);

  return (
    <Box py="xl" className={classes.section}>
      <Container size="lg">
        <Stack gap="xl">
          {/* Education Sector Logos */}
          <Box className={classes.logosContainer}>
            <Text ta="center" c="dimmed" size="sm" mb="md" className={classes.dimmedText}>
              Trusted by education sector organizations
            </Text>
            <Group justify="center" gap="xl">
              {logos.map((logo, index) => (
                <Box
                  key={index}
                  style={{
                    opacity: 0.7,
                    transition: 'opacity 0.2s ease',
                    filter: 'grayscale(100%)',
                  }}
                  className="hover:opacity-100 hover:filter-none"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
              ))}
            </Group>
          </Box>

          {/* Testimonial */}
          {testimonial && (
            <Paper withBorder radius="lg" p="xl" className={classes.testimonial}>
              <Stack gap="md" ta="center">
                <Text
                  size="lg"
                  fw={500}
                  style={{ fontStyle: 'italic' }}
                  c="dimmed"
                  className={classes.dimmedText}
                >
                  "{testimonial.quote}"
                </Text>
                <Group justify="center" gap="sm">
                  <Text size="sm" fw={600}>
                    {testimonial.author}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {testimonial.role}
                  </Text>
                </Group>
              </Stack>
            </Paper>
          )}

          {/* GitHub Activity */}
          <Box className={classes.githubContainer}>
            <Text ta="center" c="dimmed" size="sm" mb="md" className={classes.dimmedText}>
              Recent development activity
            </Text>
            <Group justify="center">
              <Anchor
                href="https://github.com/davedonnellydev"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Paper
                  withBorder
                  radius="md"
                  p="md"
                  style={{
                    backgroundColor: 'var(--neutral-50)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  className="hover:transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="calendar">
                    <Stack
                      align="center"
                      gap="sm"
                      style={{ minHeight: '120px', justifyContent: 'center' }}
                    >
                      <Loader size="sm" color="indigo" />
                      <Text size="sm" c="dimmed">
                        Loading GitHub activity...
                      </Text>
                    </Stack>
                  </div>
                </Paper>
              </Anchor>
            </Group>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
