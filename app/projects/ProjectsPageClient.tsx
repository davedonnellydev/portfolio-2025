'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Container, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectSearch } from '@/components/projects/ProjectSearch';
import { ProjectsStructuredData } from '@/components/projects/ProjectsStructuredData';
import { projects } from '@/data/projects';
import { analytics } from '@/lib/analytics';
import styles from './ProjectsPageClient.module.css';

export function ProjectsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const [selectedTech, setSelectedTech] = useState<string[]>(() => {
    const techParam = searchParams.get('tech');
    return techParam ? techParam.split(',') : [];
  });

  // Update URL when filters change
  const updateURL = (search: string, tech: string[]) => {
    const params = new URLSearchParams();
    if (search.trim()) {
      params.set('search', search.trim());
    }
    if (tech.length > 0) {
      params.set('tech', tech.join(','));
    }

    const newURL = params.toString() ? `?${params.toString()}` : '/projects';
    router.replace(newURL, { scroll: false });
  };

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.outcome.toLowerCase().includes(query)
      );
    }

    // Apply tech stack filter
    if (selectedTech.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTech.every((tech) => project.techStack.includes(tech))
      );
    }

    return filtered;
  }, [searchQuery, selectedTech]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateURL(query, selectedTech);

    // Track search usage (only if query has meaningful content)
    if (query.trim().length >= 2) {
      // Calculate result count for the search
      const results = projects.filter(
        (project) =>
          project.title.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()) ||
          project.outcome.toLowerCase().includes(query.toLowerCase())
      );
      analytics.trackProjectSearchUsed(query, results.length);
    }
  };

  const handleTechToggle = (tech: string) => {
    const newSelectedTech = selectedTech.includes(tech)
      ? selectedTech.filter((t) => t !== tech)
      : [...selectedTech, tech];

    setSelectedTech(newSelectedTech);
    updateURL(searchQuery, newSelectedTech);

    // Track filter usage
    analytics.trackProjectFilterUsed('tech-stack', tech);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTech([]);
    router.replace('/projects', { scroll: false });
  };

  const hasActiveFilters = searchQuery.trim() || selectedTech.length > 0;

  return (
    <>
      <ProjectsStructuredData />
      <main id="main-content">
        <Container size="xl" py="xl">
          <Stack gap="xl">
            {/* Page Header */}
            <div className={styles.headerContainer}>
              <Stack gap="md" align="center" ta="center">
                <Title order={1} size="h1" fw={700}>
                  My Projects
                </Title>
                <Text size="lg" c="neutral.6" maw={600}>
                  A collection of projects showcasing my skills in web development, with a focus on
                  education technology and accessibility.
                </Text>
              </Stack>
            </div>

            {/* Filters and Search */}
            <Stack gap="lg">
              <ProjectSearch
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                resultCount={filteredProjects.length}
              />

              <ProjectFilters
                projects={projects}
                selectedTech={selectedTech}
                onTechToggle={handleTechToggle}
              />

              {hasActiveFilters && (
                <Group justify="space-between" align="center">
                  <Text size="sm" c="neutral.6">
                    {filteredProjects.length} of {projects.length} projects
                    {selectedTech.length > 0 && ` using ${selectedTech.join(', ')}`}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </Text>
                  <Button variant="light" color="gray" size="sm" onClick={clearAllFilters}>
                    Clear all filters
                  </Button>
                </Group>
              )}
            </Stack>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <Grid gutter="lg">
                {filteredProjects.map((project) => (
                  <Grid.Col key={project.slug} span={{ base: 12, sm: 6, lg: 4 }}>
                    <ProjectCard project={project} currentSearchParams={searchParams.toString()} />
                  </Grid.Col>
                ))}
              </Grid>
            ) : (
              <Stack gap="md" align="center" ta="center" py="xl">
                <Title order={2} c="neutral.6">
                  No projects found
                </Title>
                <Text c="neutral.6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </Text>
                {hasActiveFilters && (
                  <Button variant="light" color="indigo" onClick={clearAllFilters}>
                    Clear all filters
                  </Button>
                )}
              </Stack>
            )}
          </Stack>
        </Container>
      </main>
    </>
  );
}
