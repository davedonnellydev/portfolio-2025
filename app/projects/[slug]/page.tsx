import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  faCircleExclamation,
  faCode,
  faLocationDot,
  faMap,
  faSitemap,
  faUserRobot,
} from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { Container, Image } from '@mantine/core';
import { ProjectPageTracker } from '@/components/projects/ProjectPageTracker';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { projects } from '@/data/projects';
import { generateProjectMetadata, generateProjectSchema } from '@/lib/seo';
import { ProjectContent } from './ProjectContent';
import { ProjectHero } from './ProjectHero';
import { ProjectNavBar } from './ProjectNavBar';
import { ProjectOverview } from './ProjectOverview';
import { TOCSection } from './TableOfContents';
import styles from './ProjectHero.module.css';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project using dynamic OG images
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return generateProjectMetadata({
    title: project.title,
    description: project.description,
    slug: project.slug,
    screenshot: project.screenshot,
    outcome: project.outcome,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Generate CreativeWork schema for the project
  const projectSchema = generateProjectSchema({
    title: project.title,
    description: project.description,
    url: `/projects/${project.slug}`,
    image: project.screenshot,
  });

  // Build table of contents sections dynamically based on available content
  const tocSections: TOCSection[] = [{ id: 'overview', label: 'Overview' }];

  if (project.content?.problem) {
    tocSections.push({ id: 'deep-dive', label: 'Deep Dive', icon: faCircleExclamation });
  }
  if (project.content?.problem) {
    tocSections.push({ id: 'problem', label: 'The Problem', icon: faCircleExclamation });
  }
  if (project.content?.approach) {
    tocSections.push({ id: 'approach', label: 'My Approach', icon: faMap });
  }
  if (project.content?.result) {
    tocSections.push({ id: 'result', label: 'The Result', icon: faLocationDot });
  }
  if (project.content?.architecture) {
    tocSections.push({ id: 'architecture', label: 'Architecture', icon: faSitemap });
  }
  if (project.content?.aiUsage) {
    tocSections.push({ id: 'ai-usage', label: 'AI Integration', icon: faUserRobot });
  }
  if (project.content?.codeExcerpts && project.content.codeExcerpts.length > 0) {
    tocSections.push({ id: 'code-excerpts', label: 'Code Excerpts', icon: faCode });
  }
  if (project.content?.nextSteps) {
    tocSections.push({ id: 'next-steps', label: "What's Next?" });
  }

  return (
    <>
      <AnimatedBackground />
      {/* Analytics tracking for page view */}
      <ProjectPageTracker projectSlug={project.slug} projectTitle={project.title} />
      {/* CreativeWork Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <Suspense fallback={null}>
        <ProjectNavBar sections={tocSections} links={project.links} />
      </Suspense>
      {/* Hero Image - Full Width */}
      <Container fluid px={{ base: 'md', sm: 'lg', md: 'xl' }} py="md">
        <div className={styles.heroImageBorder}>
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            height={400}
            fit="cover"
            radius={0}
          />
        </div>
      </Container>

      {/* Main Content */}
      <Container size="lg" py="xl">
        {/* Project Hero Section */}
        <ProjectHero
          title={project.title}
          description={project.description}
          outcome={project.outcome}
          metrics={project.metrics}
        />
        <ProjectOverview
          role={project.content?.role}
          timeframe={project.content?.timeframe}
          techstack={project.techStack}
          tldr={project.content?.tldr}
        />

        <ProjectContent
          problem={project.content?.problem}
          approach={project.content?.approach}
          result={project.content?.result}
          architecture={project.content?.architecture}
          aiUsage={project.content?.aiUsage}
          codeExcerpts={project.content?.codeExcerpts}
          nextSteps={project.content?.nextSteps}
        />
      </Container>
    </>
  );
}
