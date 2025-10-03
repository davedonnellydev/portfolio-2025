import { Anchor, Box, Container, Group, Stack, Text, Title } from '@mantine/core';
import { MicroBioProps } from './types';

export function MicroBio({ content, aboutLink }: MicroBioProps) {
  return (
    <Box py="xl">
      <Container size="md">
        <Stack gap="lg" ta="center">
          <Title order={2} size="h3">
            About Me
          </Title>

          <Text size="lg" c="dimmed" maw="65ch" mx="auto">
            {content}
          </Text>

          <Group justify="center">
            <Anchor
              href={aboutLink.href}
              size="md"
              fw={600}
              style={{
                color: 'var(--mantine-color-indigo-6)',
                textDecoration: 'none',
                borderBottom: '2px solid transparent',
                transition: 'border-color 0.2s ease',
              }}
              className="hover:border-indigo-6"
            >
              {aboutLink.text}
            </Anchor>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
