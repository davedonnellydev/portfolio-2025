import { Container, Stack, Text, Title } from '@mantine/core';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import styles from './About.module.css';

export default function AboutPage() {
  return (
    <>
      <AnimatedBackground />
      <Container size="lg" py="xl">
        <div className={styles.contentContainer}>
          <Stack gap="xl">
            <Stack gap="md" align="center" ta="center">
              <Title order={1} size="h1" fw={700}>
                About Me
              </Title>
              <Text size="lg" c="dimmed" maw={800}>
                Learn more about my background, experience, and passion for web development.
              </Text>
            </Stack>

            <Stack gap="lg">
              <div className={styles.sectionContainer}>
                <Title order={2} mb="md">
                  My Story
                </Title>
                <Text size="md" c="dimmed">
                  Content coming soon...
                </Text>
              </div>

              <div className={styles.sectionContainer}>
                <Title order={2} mb="md">
                  Skills & Expertise
                </Title>
                <Text size="md" c="dimmed">
                  Content coming soon...
                </Text>
              </div>

              <div className={styles.sectionContainer}>
                <Title order={2} mb="md">
                  Experience
                </Title>
                <Text size="md" c="dimmed">
                  Content coming soon...
                </Text>
              </div>
            </Stack>
          </Stack>
        </div>
      </Container>
    </>
  );
}
