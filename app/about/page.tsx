import { faArrowUpRightFromSquare } from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { generateMetadata as generateSEOMetadata, generatePersonSchema } from '@/lib/seo';
import { aboutContent } from '@/data/about';
import styles from './About.module.css';

export const metadata = generateSEOMetadata({
  title: 'About',
  description:
    'Learn about Dave Donnelly\'s journey from education to web development, mission to build impactful applications, and professional certifications in React, TypeScript, and modern web development.',
  path: '/about',
});

export default function AboutPage() {
  const personSchema = generatePersonSchema();

  return (
    <>
      <AnimatedBackground />
      {/* Person Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Container size="lg" py="xl">
        <div className={styles.contentContainer}>
          <Stack gap="xl">
            {/* Page Header */}
            <Stack gap="md" align="center" ta="center">
              <Title order={1} size="h1" fw={700}>
                About Me
              </Title>
              <Text size="lg" c="dimmed" maw={800} className={styles.dimmedText}>
                My journey, mission, and commitment to building impactful web applications.
              </Text>
            </Stack>

            {/* Mission Section */}
            <section className={styles.sectionContainer}>
              <Title order={2} mb="md" className={styles.sectionTitle}>
                Mission
              </Title>
              <Text size="lg" className={styles.missionText}>
                {aboutContent.mission}
              </Text>
            </section>

            {/* Background Section */}
            <section className={styles.sectionContainer}>
              <Title order={2} mb="md" className={styles.sectionTitle}>
                Background
              </Title>
              <Stack gap="md">
                {aboutContent.background.map((paragraph, index) => (
                  <Text key={index} size="md" c="dimmed" className={styles.dimmedText}>
                    {paragraph}
                  </Text>
                ))}
              </Stack>
            </section>

            {/* Certificates Section */}
            <section className={styles.sectionContainer}>
              <Title order={2} mb="lg" className={styles.sectionTitle}>
                Certificates & Credentials
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                {aboutContent.certificates.map((cert, index) => (
                  <Paper
                    key={index}
                    className={styles.certificateCard}
                    component="a"
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Stack gap="xs">
                      <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <Title order={3} size="h4" fw={600} className={styles.certificateName}>
                          {cert.name}
                        </Title>
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className={styles.certificateIcon}
                        />
                      </Group>
                      <Text size="sm" fw={500} c="dimmed" className={styles.dimmedText}>
                        {cert.issuer}
                      </Text>
                      <Text size="xs" c="dimmed" className={styles.dimmedText}>
                        {cert.date}
                      </Text>
                    </Stack>
                  </Paper>
                ))}
              </SimpleGrid>
            </section>
          </Stack>
        </div>
      </Container>
    </>
  );
}
