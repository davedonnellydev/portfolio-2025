/**
 * SEO utilities for metadata generation and structured data
 */

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://davedonnelly.dev';
const SITE_NAME = 'Dave Donnelly - Web Developer';

/**
 * Generate metadata for a page
 */
export function generateMetadata({
  title,
  description,
  path,
  image = '/og-image.png',
  type = 'website',
}: MetadataProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}${image}`],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate Person schema for About page
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dave Donnelly',
    jobTitle: 'Web Developer',
    url: SITE_URL,
    sameAs: [
      // Add social media URLs here
      'https://github.com/davedonnellydev',
      'https://www.linkedin.com/in/dave-donnelly-dev/',
    ],
  };
}

/**
 * Generate CreativeWork schema for project pages
 */
export function generateProjectSchema(project: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: project.url,
    image: project.image,
    author: {
      '@type': 'Person',
      name: 'Dave Donnelly',
    },
    datePublished: project.datePublished,
  };
}

/**
 * Generate metadata for individual project pages
 */
export function generateProjectMetadata(project: {
  title: string;
  description: string;
  slug: string;
  screenshot: string;
  outcome: string;
}) {
  const path = `/projects/${project.slug}`;
  const description = `${project.outcome} - ${project.description}`;

  return generateMetadata({
    title: project.title,
    description,
    path,
    image: project.screenshot,
    type: 'article',
  });
}

/**
 * Generate CollectionPage schema for projects listing page
 */
export function generateProjectsPageSchema(
  projects: Array<{
    title: string;
    description: string;
    url: string;
    image: string;
  }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects - Dave Donnelly',
    description:
      'A collection of web development projects showcasing skills in education technology, accessibility, and modern web frameworks.',
    url: `${SITE_URL}/projects`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          url: project.url,
          image: project.image,
          author: {
            '@type': 'Person',
            name: 'Dave Donnelly',
          },
        },
      })),
    },
  };
}
