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

    description: 'A high-performance, WCAG AAA-compliant portfolio website built with Next.js 15, featuring glassmorphism design, animated backgrounds, and comprehensive analytics.',

    outcome: 'Achieved 95+ Lighthouse scores on desktop and 88-91 on mobile with 100% test coverage and zero accessibility violations',

    metrics: [
      '95+ Lighthouse desktop score',
      '88-91 Lighthouse mobile score',
      '162 tests passing (100% pass rate)',
      '10ms Total Blocking Time (99.7% better than target)',
      '0.003 CLS (97% better than target)',
      'WCAG 2.1 AA compliant'
    ],

    screenshot: '/images/projects/portfolio-2025.png',

    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Mantine',
      'CSS Modules',
      'Jest',
      'Testing Library',
      'Storybook',
      'Lighthouse CI',
      'GitHub Actions'
    ],

    links: {
      live: 'https://portfolio-2025-dd.vercel.app/', // Your deployed URL
      repo: 'https://github.com/davedonnellydev/portfolio-2025',
      caseStudy: '/projects/portfolio-2025',
    },

    featured: true,

    content: {
      tldr: 'Built a production-ready portfolio website with exceptional performance, accessibility, and developer experience. Achieved 95+ Lighthouse scores with comprehensive testing and CI/CD automation.',

      role: 'Full-stack Developer & Designer',

      timeframe: 'October 2025 (ongoing)',

      problem: 'Needed a portfolio website that would not only showcase my projects but also demonstrate my expertise in modern web development, accessibility, performance optimisation, and testing best practices. The site needed to be fast, accessible to all users, and maintainable with proper documentation.',

      approach: 'Built a comprehensive portfolio using Next.js 15 with the App Router, implementing a component-driven architecture with full test coverage. Focused heavily on performance optimisation, achieving sub-10ms Total Blocking Time through AnimatedBackground optimisation and self-hosted font strategy. Implemented WCAG 2.1 AA accessibility standards with keyboard navigation, screen reader support, and proper ARIA labels. Set up automated CI/CD pipeline with GitHub Actions, Lighthouse CI for performance budgets, and comprehensive quality gates.',

      result: 'Delivered a production-ready portfolio with 95+ desktop Lighthouse scores and 88-91 mobile scores. Achieved 99.7% improvement in Total Blocking Time (3,760ms → 10ms) and 97% improvement in CLS (0.003 vs 0.1 target). Maintained 100% test pass rate with 162 tests across 7 suites, zero linting errors, and full TypeScript strict mode compliance. Documented everything comprehensively with 6 component READMEs and 39 Storybook stories.',

      architecture: 'Built on Next.js 15 with App Router for optimal performance through static generation. Used Mantine UI library with custom CSS Modules for styling, implementing a glassmorphism design system with dark mode support. Employed feature-based file organization with components grouped by page/feature. Integrated Vercel Analytics for Web Vitals tracking and implemented comprehensive SEO with dynamic sitemap, robots.txt, and structured data (Schema.org JSON-LD).',

      aiUsage: 'Leveraged AI during development for code generation, documentation writing, and problem-solving. Used AI to help optimise the AnimatedBackground component performance and generate comprehensive test suites. AI assistance helped maintain code quality and identify potential accessibility issues early in development.',

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

      nextSteps: 'Add a blog section for technical articles, potentially add a backend to manage site content.',
    },
  },
  {
    slug: "ai-august-2025-challenge",
    title: "#AIAugust 2025 App-a-Day Challenge (Hub)",
    description:
      "Central hub coordinating a month-long sprint: building a new AI-powered project every weekday in August 2025, with links to repos, live demos, and notes.",
    outcome:
      "Completed a structured series of daily AI builds, shipping multiple public demos and codifying a repeatable template/workflow for rapid prototyping.",
    metrics: [
      "21 projects planned across Aug 2025",
      "Public repos and demos linked from hub",
      "Consistent Next.js starter + testing setup"
    ],
    screenshot: "/images/projects/ai-august-2025.png", // TODO: update with actual image
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Mantine UI",
      "Node.js (API routes)",
      "Python (Flask)",
      "Neon Postgres",
      "Drizzle ORM",
      "OpenAI API",
      "Jest",
      "React Testing Library",
      "Pytest",
      "Netlify",
      "Render",
      "Cursor"
    ],
    links: {
      live: undefined, //
      repo: "https://github.com/davedonnellydev/ai-august-2025-challenge",
      caseStudy:
        "/projects/ai-august-2025-challenge'"
    },
    featured: true,
    content: {
      tldr:
        "A curated hub for a daily AI build challenge: plan, build, ship, and reflect—21 AI apps in 21 weekdays.",
      role:
        "Solo developer: scoping, architecture, implementation, testing, and deployment for each day's app; documentation and reflections.",
      timeframe: "Aug 1-29, 2025",
      problem:
        "Level up AI + full-stack skills quickly while producing tangible, demo-ready projects and a consistent public track record.",
      approach:
        "Created a reusable Next.js + TypeScript + Mantine starter (plus one Flask template) to standardize setup; defined daily MVP, user flows, and APIs; shipped iterative demos with tests and notes; aggregated everything in a single hub README with calendar links.",
      result:
        "Shipped a cohesive body of work with consistent structure and deployment, demonstrating breadth (UX, APIs, LLM prompts, data) and speed.",
      architecture:
        "Hub repo contains the project calendar linking to per-day repos/demos. Each day's app is typically a Next.js app using API routes (or a Flask service) plus third-party AI APIs. Testing via Jest/RTL (web) and Pytest (Python). Deployments to Netlify (web) and Render (Python).",
      aiUsage:
        "Primarily OpenAI for LLM tasks; some projects explore Hugging Face/Replicate models depending on use case (classification, generation, or analysis).",
      codeExcerpts: [],
      nextSteps:
        "Add a final recap post with consolidated metrics (apps shipped, tests, traffic), embed screenshots/GIFs for each day, and cross-link to portfolio case studies."
    }
  }
];
