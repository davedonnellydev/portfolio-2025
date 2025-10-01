import { Box, Container, Stack, Text, Title } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Box>
          <Title order={1}>Welcome to My Portfolio</Title>
          <Text size="lg" c="dimmed" mt="md">
            This is a temporary homepage. Try scrolling down to test the header behavior.
          </Text>
        </Box>

        <ColorSchemeToggle />

        {/* Temporary content to enable scrolling */}
        {Array.from({ length: 20 }, (_, i) => (
          <Box key={i} p="xl" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
            <Title order={3}>Section {i + 1}</Title>
            <Text mt="sm">
              <strong>Header:</strong> Disappears when scrolling down, reappears when scrolling up.
              <br />
              <strong>Footer:</strong> Appears when scrolling down, disappears when scrolling up.
              <br />
              Both stay visible when you hover over them and persist until 3 seconds after you stop
              scrolling (unless your mouse is inside).
            </Text>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
