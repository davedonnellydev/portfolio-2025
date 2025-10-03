import Script from 'next/script';
import { projects } from '@/data/projects';
import { generateProjectsPageSchema } from '@/lib/seo';

export function ProjectsStructuredData() {
  const structuredData = generateProjectsPageSchema(
    projects.map((project) => ({
      title: project.title,
      description: project.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://davedonnelly.dev'}/projects/${project.slug}`,
      image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://davedonnelly.dev'}${project.screenshot}`,
    }))
  );

  return (
    <Script
      id="projects-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
