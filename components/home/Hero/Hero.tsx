'use client';

import Image from 'next/image';
import { IconCheck, IconChevronDown, IconFileDownload } from '@tabler/icons-react';
import { Box, Button, Container, Group, List, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { analytics } from '@/lib/analytics';
import classes from './Hero.module.css';

export function Hero() {
  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('featured-projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCVDownload = () => {
    analytics.trackCVDownload('hero');
  };

  return (
    <section className={classes.hero} id="hero">
      <Container size="xl">
        <div className={classes.grid}>
          {/* Left column: Content */}
          <div className={classes.content}>
            <Stack gap="xl">
              {/* Headline */}
              <div>
                <Title className={classes.headline} order={1}>
                  I build <span className={classes.gradientText}>fast, accessible</span> web
                  experiences that users love
                </Title>
                <Text size="lg" c="dimmed" mt="md" className={classes.subheadline}>
                  Junior full-stack developer specializing in React, Next.js, and modern web
                  technologies. Shipping production-ready code with a focus on performance and user
                  experience.
                </Text>
              </div>

              {/* Credibility Points */}
              <List
                spacing="sm"
                size="md"
                className={classes.credibilityList}
                icon={
                  <ThemeIcon color="primary" size={24} radius="xl" variant="light">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <strong>Education sector experience</strong> — Built apps used by thousands of
                  students and teachers
                </List.Item>
                <List.Item>
                  <strong>AI-powered development</strong> — Leveraging modern tools to ship faster
                  without compromising quality
                </List.Item>
                <List.Item>
                  <strong>Test-driven mindset</strong> — Writing accessible, maintainable code with
                  comprehensive test coverage
                </List.Item>
              </List>

              {/* CTAs */}
              <Group gap="md" className={classes.ctaGroup}>
                <Button
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'primary', to: 'grape', deg: 135 }}
                  onClick={handleScrollToProjects}
                  leftSection={<IconChevronDown size={20} />}
                  className={classes.primaryCta}
                >
                  View top projects
                </Button>

                <Button
                  component="a"
                  href="/CV - D_DONNELLY.pdf" // Replace with actual CV path
                  download
                  size="lg"
                  variant="light"
                  color="primary"
                  leftSection={<IconFileDownload size={20} />}
                  onClick={handleCVDownload}
                >
                  Download CV
                </Button>
              </Group>
            </Stack>
          </div>

          {/* Right column: Photo */}
          <div className={classes.imageWrapper}>
            <Box className={classes.imageContainer}>
              <div className={classes.imageBorder}>
                <Image
                  src="/images/profile.png" // Replace with your actual photo (profile-photo.jpg)
                  alt="David Donnelly - Full-stack Developer"
                  width={400}
                  height={400}
                  className={classes.image}
                  priority
                />
              </div>
              {/* Decorative gradient accent */}
              <div className={classes.gradientAccent} aria-hidden="true" />
            </Box>
          </div>
        </div>
      </Container>
    </section>
  );
}
