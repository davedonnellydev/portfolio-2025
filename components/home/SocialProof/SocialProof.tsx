import Image from 'next/image';
import { Box, Container, Group, Paper, Stack, Text } from '@mantine/core';
import { SocialProofProps } from './types';

export function SocialProof({ logos, testimonial, githubActivity }: SocialProofProps) {
  return (
    <Box py="xl" style={{ backgroundColor: 'var(--mantine-color-gray-0)' }}>
      <Container size="lg">
        <Stack gap="xl">
          {/* Education Sector Logos */}
          <Box>
            <Text ta="center" c="dimmed" size="sm" mb="md">
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
            <Paper
              withBorder
              radius="lg"
              p="xl"
              style={{
                background:
                  'linear-gradient(135deg, var(--mantine-color-indigo-0) 0%, var(--mantine-color-grape-0) 100%)',
                borderColor: 'var(--mantine-color-indigo-2)',
              }}
            >
              <Stack gap="md" ta="center">
                <Text size="lg" fw={500} style={{ fontStyle: 'italic' }} c="dimmed">
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
          {githubActivity && (
            <Box>
              <Text ta="center" c="dimmed" size="sm" mb="md">
                Recent development activity
              </Text>
              <Group justify="center">
                <Paper
                  withBorder
                  radius="md"
                  p="md"
                  style={{ backgroundColor: 'var(--mantine-color-dark-8)' }}
                >
                  <Image
                    src={githubActivity.sparkline}
                    alt="GitHub activity sparkline"
                    width={githubActivity.width}
                    height={githubActivity.height}
                    style={{ objectFit: 'contain' }}
                  />
                </Paper>
              </Group>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
