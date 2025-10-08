import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://davedonnelly.dev';
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
