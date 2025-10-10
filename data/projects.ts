export interface Project {
  slug: string;
  title: string;
  description: string;
  outcome: string;
  metrics?: string[];
  screenshot: string;
  techStack: string[];
  links: {
    live?: string;
    repo?: string;
    caseStudy: string;
  };
  featured: boolean;
  content?: {
    tldr: string;
    role: string;
    timeframe: string;
    problem: string;
    approach: string;
    result: string;
    architecture?: string;
    aiUsage?: string;
    codeExcerpts?: Array<{
      title: string;
      code: string;
      language: string;
    }>;
    nextSteps?: string;
  };
}

// Placeholder project data - to be replaced with real projects
export const projects: Project[] = [
  {
    slug: 'portfolio-2025',

    title: 'Modern Developer Portfolio',

    description:
      'A high-performance, WCAG AA-compliant portfolio website built with Next.js 15, featuring glassmorphism design, animated backgrounds, and comprehensive analytics.',

    outcome:
      'Achieved 95+ Lighthouse scores on desktop and 88-91 on mobile with 100% test coverage and zero accessibility violations',

    metrics: [
      '95+ Lighthouse desktop score',
      '88-91 Lighthouse mobile score',
      '162 tests passing (100% pass rate)',
      '10ms Total Blocking Time',
      '0.003 CLS',
      'WCAG 2.1 AA compliant',
    ],

    screenshot: '/images/projects/portfolio-2025.png',

    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Mantine',
      'CSS Modules',
      'Jest',
      'Testing Library',
      'Storybook',
      'Lighthouse CI',
      'GitHub Actions',
    ],

    links: {
      live: 'https://davedonnelly.dev/', // Your deployed URL
      repo: 'https://github.com/davedonnellydev/portfolio-2025',
      caseStudy: '/projects/portfolio-2025',
    },

    featured: true,

    content: {
      tldr: 'Built a production-ready portfolio website with exceptional performance, accessibility, and developer experience. Achieved 95+ Lighthouse scores with comprehensive testing and CI/CD automation.',

      role: 'Full-stack Developer & Designer',

      timeframe: 'October 2025 (ongoing)',

      problem:
        'Needed a portfolio website that would not only showcase my projects but also quickly and clearly tell employers why I should be hired. It needed to demonstrate my expertise in modern web development, accessibility, performance optimisation, and testing best practices. The site needed to be fast, accessible to all users, and maintainable with proper documentation.',

      approach:
        'I started with a Mantine UI Next.js template and, using AI assistance within Cursor, I planned a comprehensive portfolio to achieve my needs. Once I built the content and structure,I then focused heavily on performance optimisation. Implemented WCAG 2.1 AA accessibility standards with keyboard navigation, screen reader support, and proper ARIA labels. Set up automated CI/CD pipeline with GitHub Actions, Lighthouse CI for performance budgets, and comprehensive quality gates.',

      result:
        'Delivered a production-ready portfolio with 95+ desktop Lighthouse scores and 88-91 mobile scores. Achieved 99.7% improvement in Total Blocking Time (3,760ms → 10ms) and 97% improvement in CLS (0.003 vs 0.1 target). Maintained 100% test pass rate with 162 tests across 7 suites, zero linting errors, and full TypeScript strict mode compliance. Documented everything comprehensively with 6 component READMEs and 39 Storybook stories.',

      architecture:
        'Built on Next.js 15 with App Router for optimal performance through static generation. Used Mantine UI library with custom CSS Modules for styling, implementing a glassmorphism design system with dark mode support. Employed feature-based file organization with components grouped by page/feature. Integrated Vercel Analytics for Web Vitals tracking and implemented comprehensive SEO with dynamic sitemap, robots.txt, and structured data (Schema.org JSON-LD).',

      aiUsage:
        'Leveraged AI during development for code generation, documentation writing, and problem-solving. Used AI to help optimise the AnimatedBackground component performance and generate comprehensive test suites. AI assistance helped maintain code quality and identify potential accessibility issues early in development.',

      codeExcerpts: [
        {
          title: 'Performance-Optimised Animated Background',
          language: 'typescript',
          code: `useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId: number;

    // Particle count based on screen size for performance
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    const animate = () => {
      // Clear and redraw particles using requestAnimationFrame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);`,
        },
        {
          title: 'Comprehensive Component Testing',
          language: 'typescript',
          code: `describe('ProjectCard', () => {
    it('renders with all required props', () => {
      render(<ProjectCard {...mockProject} />);

      expect(screen.getByText(mockProject.title)).toBeInTheDocument();
      expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    });

    it('tracks analytics on case study click', async () => {
      const user = userEvent.setup();
      render(<ProjectCard {...mockProject} />);

      const caseStudyLink = screen.getByRole('link', { name: /view case study/i });
      await user.click(caseStudyLink);

      expect(trackEvent).toHaveBeenCalledWith('case_study_click', {
        project: mockProject.slug,
        location: 'project_card',
      });
    });

    it('is keyboard accessible', async () => {
      render(<ProjectCard {...mockProject} />);

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });`,
        },
        {
          title: 'SEO Metadata Generation',
          language: 'typescript',
          code: `export function generateProjectMetadata(project: Project): Metadata {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    return {
      title: \`\${project.title} | Dave Donnelly\`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        url: \`\${siteUrl}/projects/\${project.slug}\`,
        type: 'article',
        images: [{
          url: \`\${siteUrl}\${project.screenshot}\`,
          width: 1200,
          height: 630,
          alt: project.title,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: project.title,
        description: project.description,
        images: [\`\${siteUrl}\${project.screenshot}\`],
      },
    };
  }`,
        },
      ],

      nextSteps:
        'Add a blog section for technical articles, potentially use headless CMS like Sanity to manage site content.',
    },
  },
  {
    slug: 'ai-august-2025-challenge',
    title: '#AIAugust 2025 App-a-Day Challenge',
    description:
      'A month-long sprint building 19 AI-powered applications in 21 weekdays, demonstrating rapid prototyping skills and AI integration expertise across diverse use cases.',
    outcome:
      'Successfully shipped 19 distinct AI applications with consistent architecture, comprehensive testing, and full documentation, establishing a repeatable workflow for rapid AI prototype development.',
    metrics: [
      '19 AI apps shipped in 21 weekdays',
      '100% projects with test coverage',
      'Standardized Next.js + TypeScript template',
      'Public repos and live demos for all projects',
      'Daily reflections and learnings documented',
    ],
    screenshot: '/images/projects/ai-august-2025.png',
    techStack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Mantine UI',
      'Python',
      'Flask',
      'Neon Postgres',
      'Drizzle ORM',
      'OpenAI API',
      'Jest',
      'Testing Library',
      'Pytest',
      'Netlify',
      'Render',
    ],
    links: {
      live: undefined,
      repo: 'https://github.com/davedonnellydev/ai-august-2025-challenge',
      caseStudy: '/projects/ai-august-2025-challenge',
    },
    featured: true,
    content: {
      tldr: 'Built and shipped 19 AI-powered applications in 21 weekdays, each with full-stack implementation, testing, and deployment. Created standardized templates and workflows for rapid AI prototype development.',

      role: 'Solo Full-stack Developer & AI Engineer',

      timeframe: 'August 2025 (21 weekdays)',

      problem:
        'Needed to rapidly advance AI development skills while building a portfolio of diverse, production-ready AI applications. Required a systematic approach to learning multiple AI APIs, frameworks, and deployment patterns while maintaining code quality and documentation standards.',

      approach:
        'Established standardized starter templates (Next.js + TypeScript + Mantine for web, Flask for Python APIs) to eliminate repetitive setup. Each day followed a consistent workflow: scope MVP features, implement core functionality with AI integration, write tests, deploy to production, and document learnings. Created a central hub repository to organize all projects with calendar-based navigation.',

      result:
        'Successfully delivered 19 distinct AI applications covering diverse use cases including natural language processing, image generation, data analysis, and chatbot interfaces. Maintained consistent quality standards with testing for all projects and comprehensive documentation. Developed reusable patterns for API integration, error handling, and deployment that accelerated development speed throughout the challenge.',

      architecture:
        'Central hub repository containing project calendar and overview, linking to individual day repositories. Each application uses Next.js 15 App Router with API routes for backend logic, or Flask for Python-specific AI tasks. Database integration via Neon Postgres with Drizzle ORM for data persistence. Third-party AI APIs integrated through secure server-side routes. Automated testing with Jest and React Testing Library for frontend, Pytest for Python services. Deployments automated through Netlify (frontend) and Render (Python APIs).',

      aiUsage:
        'Integrated OpenAI GPT models for conversational interfaces, text generation, and semantic analysis. Leveraged AI assistance in Cursor for rapid code generation, debugging, and test writing throughout the challenge.',

      nextSteps:
        'Create comprehensive recap post with consolidated metrics and key learnings. Add interactive demos with embedded screenshots and GIFs. Expand most promising applications with additional features and monetization strategies. Extract common patterns into open-source starter template for AI application development.',
    },
  },
  {
    slug: 'tyson-donnelly-vfx-portfolio',
    title: 'VFX Compositor Portfolio - Performance Optimization & CMS Integration',
    description:
      "Complete performance overhaul and modernization of a professional VFX compositor's portfolio website, achieving a 45% improvement in Lighthouse score while integrating a headless CMS for easy content management.",
    outcome:
      'Transformed a slow, hard-coded portfolio into a high-performance, CMS-powered website with a 69% reduction in bundle size and professional content management capabilities.',
    metrics: [
      '100% Lighthouse performance score improved from 55',
      'Bundle size reduced by 69% (360KB → 110KB)',
      'Removed 250KB of unnecessary dependencies',
      'ISR revalidation ensuring content updates within 60 seconds',
      '100% accessibility score with WCAG compliance',
    ],
    screenshot: '/images/projects/tyson-donnelly-portfolio.png',
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Sanity CMS', 'CSS Modules', 'Vercel'],
    links: {
      live: 'https://tysondonnelly.com',
      repo: undefined, // Private client project
      caseStudy: '/projects/tyson-donnelly-vfx-portfolio',
    },
    featured: true,
    content: {
      tldr: "Optimized a VFX compositor's portfolio from Lighthouse score 55 to 100, integrated Sanity CMS for client-managed content, and reduced bundle size by 69% through strategic dependency removal and image optimization.",

      role: 'Full-stack Developer & Performance Engineer',

      timeframe: 'October 2025 (1 week)',

      problem:
        "The client's portfolio suffered from severe performance issues with a Lighthouse score of 55, caused by 22 unoptimized images (5-10MB total), 250KB of MUI/Emotion libraries used for a single hook, and hard-coded content requiring developer updates. The site needed to showcase high-quality VFX work while loading quickly and enabling independent content management.",

      approach:
        'Started with comprehensive performance analysis identifying critical bottlenecks. Replaced all native img tags with Next.js Image component for automatic WebP/AVIF conversion, lazy loading, and responsive sizing integrated with Sanity CDN. Removed MUI and Emotion entirely, replacing the single useMediaQuery hook with a custom 1KB implementation that eliminated 250KB of dependencies. Integrated Sanity CMS with custom schemas for Films, About, and Contact, embedding the Studio at /studio route. Implemented ISR with 60-second revalidation for near-instant content updates. Migrated to Next.js 15 App Router with Server Components for static content and Client Components only where necessary.',

      result:
        'Achieved 82% improvement in Lighthouse score (55 to 100) and 69% reduction in bundle size (360KB to 110KB). Dramatically improved LCP through image optimization and reduced TTI by 30-40%. Client can now independently manage film gallery, bio, and contact information through intuitive CMS interface with changes appearing live within 60 seconds. Maintained full TypeScript strict mode compliance and WCAG accessibility standards throughout optimization process.',

      architecture:
        'Built on Next.js 15 App Router with React Server Components for static content and selective Client Components for interactive elements. Sanity serves as headless CMS with custom schemas, embedded Studio at /studio, and type-safe queries with ISR revalidation. Images delivered through Sanity CDN with automatic optimization via Next.js Image component (WebP/AVIF, lazy loading, priority hints). Custom lightweight hooks replace heavy third-party dependencies. Font loading optimized with display: swap and selective weight loading.',

      aiUsage:
        'Used Claude in Cursor extensively for architecture planning, generating comprehensive implementation roadmap with phased approach. AI assisted in creating Sanity schemas, TypeScript types, and type-safe query functions. Generated optimization strategies based on performance analysis and recommended targeted improvements. Created client-facing documentation (SANITY_SETUP.md, QUICK_START.md) and ensured accessibility compliance and modern Next.js patterns throughout development.',

      codeExcerpts: [
        {
          title: 'Custom Lightweight useMediaQuery Hook',
          code: `"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// Replaced 250KB MUI library with <1KB custom hook`,
          language: 'typescript',
        },
        {
          title: 'Type-Safe Sanity Queries with ISR',
          code: `import { client } from '../../../sanity/lib/client'
import type { Film } from '@/types/sanity'

export async function getFilms(): Promise<Film[]> {
  const query = \`*[_type == "film"] | order(order desc) {
    _id, _type, title, poster, alt, order
  }\`

  return await client.fetch(query, {}, {
    next: { revalidate: 60 } // ISR: 60s revalidation
  })
}`,
          language: 'typescript',
        },
        {
          title: 'Optimized Image Delivery with Sanity CDN',
          code: `const films = sanityFilms?.map(film => ({
  title: film.title,
  img_url: urlForImage(film.poster)
    .width(600)
    .height(600)
    .quality(85)
    .fit('crop')
    .url(),
  alt: film.alt,
}));

<Image
  src={film.img_url}
  width={300}
  height={300}
  sizes="(max-width: 650px) 180px, 300px"
  quality={85}
  priority={key < 6}
/>`,
          language: 'typescript',
        },
      ],

      nextSteps:
        'Add Google Analytics for client insights, implement video showreel support in Sanity schema, expand film entries with role/year/studio metadata, and add client-side search and filtering by genre/year. Consider dark mode implementation and automated Lighthouse CI in deployment pipeline.',
    },
  },
];
