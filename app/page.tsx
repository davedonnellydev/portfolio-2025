import { Box, Text, Title } from '@mantine/core';
import { Hero } from '../components/home/Hero';
import { SignatureProjects } from '../components/home/SignatureProjects';
import { projects } from '../data/projects';

export default function HomePage() {
  return (
    <>
      <Hero />

      <SignatureProjects projects={projects} />

      {/* Temporary content to enable scrolling and test header/footer behavior */}
      {Array.from({ length: 10 }, (_, i) => (
        <Box
          key={i}
          p="xl"
          style={{ border: '1px solid #ddd', borderRadius: '8px', margin: '1rem' }}
        >
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
    </>
  );
}
